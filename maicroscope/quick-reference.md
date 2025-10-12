# The Hitchhiker's Guide to Understanding Your AI

_Note: this is a rough draft of an introductory, fun guide to mechanistic interpretability. More chapters will come along soon!_

---

# Quick Reference

_Your AI is running rampant and you have 15 minutes to disarm it... well, you should probably start reading!_

---

## Who Knew That Peering Into A Mind Is Not Easy?

The obvious starting point for understanding a neural network is to look at what the individual neurons do. Each neuron takes in signals (inputs) from other neurons, does some math, and produces an output. So go ahead and pull out that lens, take a look at your neurons, see what makes different neurons activate, and then we'll understand exactly what the model is thinking and why!

...I really hope that you didn't stop reading there. Remember, you're on a timer, you can't stop

Wrong. When researchers started systematically studying what makes individual neurons fire, they found chaos. One neuron might respond to:

- The word "the"
- URLs containing "https"
- Pictures of cats
- The number 7
- Arabic script

What is this neuron even doing? This is called **polysemanticity**—one neuron responding to multiple, often completely unrelated concepts.

Why does this happen? The model needs to represent way more concepts than it has neurons. A model with 100,000 neurons might need to represent millions of concepts—"Golden Gate Bridge," "past tense," "sarcasm," "the color red," and approximately one million other things.

The model solves this through **superposition**: it packs multiple features into the same neurons by exploiting sparsity. If concept A appears in 1% of inputs and concept B appears in a different 1% of inputs, the model can use overlapping neurons to represent both. There's occasional interference when both appear at once, but most of the time it works fine. It's efficient, but terrible for our understanding. We can't just read off what neurons mean because they don't have clean, single meanings.

We need better tools.

---

> **SIDEBAR: The Measurement Problem**
>
> How do we even know what a neuron "means"? The standard approach: show it a bunch of inputs, see when it activates, and guess. But maybe neurons don't "mean" anything in the human sense. Maybe meaning is something we're projecting onto patterns of activation because we're pattern-seeking creatures who need things to make narrative sense. This isn't just philosophical—if neurons don't have stable meanings, our whole interpretive framework might be built on sand.

---

## What We're Actually Looking For

Since individual neurons are messy, we need to think about representations differently. Two key concepts:

**Features** are the fundamental units of representation—the actual concepts the model uses. A feature might be "Arabic text," "Golden Gate Bridge," or "syntactic subject of sentence." Features aren't the same as individual neurons. A feature is a pattern of activation across multiple neurons, or multiple features might be packed into the same neurons through superposition. Features are what we're trying to find.

**Circuits** are algorithmic pathways that connect features together to produce behaviors. If features are vocabulary, circuits are grammar—they're the computational structures that take input features and transform them into output features. A circuit might implement "copy the last word" or "negate the sentiment" or "translate from English to French."

The relationship between these is important. You can't understand circuits without knowing what features they're operating on, and you can't understand features without seeing how they're used in circuits. It's a bit circular, which makes this whole endeavor tricky but tractable.

---

> **SIDEBAR: The Atomicity Question**
>
> Is there such a thing as an atomic, indivisible concept? Or can you always subdivide further? Your SAE might find a "Golden Gate Bridge" feature. But is that atomic, or is it composed of "bridge" + "red" + "San Francisco" + "suspension architecture"? And are those atomic, or do they subdivide further?
>
> This isn't just abstract philosophy. If we want to surgically remove dangerous capabilities from models for safety, we need to know what level to operate at. If you remove a high-level "bioweapon knowledge" feature but the model can reconstruct it from lower-level "biology" + "chemistry" + "weapons" features, you've accomplished nothing. The atomicity question matters.

---

## How We Find Features: Sparse Autoencoders

We've established that neurons are messy multitaskers. We need a better way to find the actual concepts the model is using.

Enter **sparse autoencoders (SAEs)**, which are essentially decompression tools for neural activations. The core idea: the model squishes many features into fewer neurons through superposition. An SAE takes those squished activations and expands them back out into a much larger space where individual features become visible and separable.

Think of it like this: you've got a suitcase (the model's neurons) with clothes crammed in every which way (features in superposition). An SAE unpacks that suitcase onto a large table, spreading everything out so you can see what individual items you actually have. The "sparse" part means we enforce a rule: only a few items can be on the table at once, which prevents everything from becoming a jumbled mess again.

The technical bit: SAEs force only a handful of features to be active for any given input—usually 10-100, even though the dictionary of possible features might contain millions. This sparsity constraint is what makes the features interpretable. Each one needs to earn its place by representing something meaningful.

### A Concrete Example: The Arabic Text Feature

Let's make this real. One of the clearest features discovered is an "Arabic text" feature found in Claude Sonnet by Anthropic's team.

This feature lights up strongly when the model processes Arabic text. But the real test is: is it actually _doing_ something, or is it just correlated with Arabic for some weird reason?

**The ablation test**: Remove this feature from the model's activations. What happens? The model's ability to work with Arabic degrades significantly. It can still kinda do it—other features compensate a bit—but performance drops noticeably.

**The steering test**: Artificially boost the feature's activation. What happens? The model starts outputting Arabic text even when you give it English prompts. Someone turned up the "Arabic-ness" dial and the model obliged.

This is pretty compelling evidence that we found something real. But notice the caveats:

Is this really one unified "Arabic" feature? Or is it actually several related features—Arabic script, Arabic language structure, right-to-left text direction—that the SAE couldn't fully separate? If you zoom in close enough, maybe "Arabic-ness" fractures into constituent parts.

This feature exists at one specific layer in the model. But "Arabic-ness" flows through the entire network. Does the concept exist as a distinct feature throughout, or does it transform into something unrecognizable in other layers? We found one manifestation, not necessarily the canonical one.

Still, this is progress. We found something specific, tested it causally, and it behaves as we'd expect a meaningful feature to behave. That's more than we could do by staring at individual neurons.

---

> **SIDEBAR: Are Features Real or Convenient Fictions?**
>
> Here's the uncomfortable question: Do SAEs discover features the model actually uses as computational units? Or do we create convenient human-interpretable projections that help reconstruction but aren't how the model "thinks"?
>
> Maybe features are real discrete things the model manipulates, like variables in a program. Or maybe the model operates on continuous, high-dimensional manifolds, and we're imposing discrete categories that feel natural to us but don't carve reality at its joints.
>
> This isn't just philosophical—it's deeply practical. If features aren't "real," then all our interventions (removing dangerous features, steering behavior) might be operating on the wrong ontology. We'd be adjusting dials that don't correspond to anything the model actually uses.

---

> **SIDEBAR: The Feature Splitting Problem**
>
> Your SAE has a "Golden Gate Bridge" feature. Great! But wait—you also find "Golden Gate Bridge at sunset" and "Golden Gate Bridge from Marin side" and "Golden Gate Bridge in fog." Are these separate features or subdivisions of one feature?
>
> Where do you stop? Can you infinitely subdivide, finding more and more specific versions? Is there a natural level of granularity, or is it arbitrary based on your SAE's dictionary size?
>
> This matters for safety work. If you want to remove a dangerous capability, do you need to find the "atomic" version? Or can you remove it at any level? If the model can reconstruct "how to make a bioweapon" from sub-features like "biology knowledge" + "chemistry knowledge" + "harmful intent," then removing the composite feature accomplishes nothing.

---

### The Current State of SAEs

SAEs have become one of the field's primary tools, but they come with limitations:

**Dictionary size is arbitrary.** Pick a dictionary with 1 million features and you'll find certain features. Pick 10 million and some of those features split into more specific variants. There's no principled way to choose "the right size"—it's a hyperparameter you tune, which should make us nervous about claiming we found "the" features.

**Reconstruction doesn't equal understanding.** You can build an SAE with excellent reconstruction loss where the features make no sense to humans. Low loss is necessary but not sufficient for interpretability. The SAE could be finding mathematically efficient but semantically meaningless directions.

**Single-layer analysis misses the story.** Most SAE work focuses on individual layers, but features transform as they flow through the network. "Arabic-ness" at layer 5 might look completely different from "Arabic-ness" at layer 20. We're taking snapshots of a movie and claiming we understand the plot.

Despite these limitations, SAEs have revealed genuine structure: hierarchies of features, the distinction between representation and action neurons, and specific testable features like Arabic text. It's not complete understanding, but it's more than we had before.

---

## How We Find Circuits: Tracing Information Flow

So we can find features. But features alone don't explain behavior. How does the model actually _use_ these features to do things? That's where circuit analysis comes in.

**Circuit analysis** is the art of tracing how information flows through the model to produce specific behaviors. You identify a behavior you want to understand, then work backward to figure out which components—attention heads, neurons, layers—are causally responsible and how they work together.

The key technique is **ablation**: remove a component and see if the behavior breaks. If it does, that component was probably important. But you need to be careful—correlation isn't causation. Just because a component activates during a behavior doesn't mean it's causing that behavior. You need to actually intervene and see what happens.

### A Concrete Example: Induction Heads

The clearest circuit we've found so far is **induction heads**, which do copy-paste operations. Here's what they do:

Input: "The cat sat on the mat. The cat \_\_\_"  
Model output: "sat"

The model is copying from earlier in the context. It noticed the pattern [A] [B]...[A] and predicted [B]. This is the foundation of in-context learning—the model's ability to pick up patterns from context and apply them.

How does it work? Induction heads are a composition of two attention heads:

1. The first head notices that we've seen "The cat" before and attends back to the previous occurrence
2. The second head looks at what came _after_ that previous occurrence (the word "sat") and copies it

This is a real algorithm, implemented in the weights of the model. Researchers found it through ablation—remove these heads and in-context learning performance tanks—and by examining attention patterns. You can literally see the heads looking at previous occurrences and copying.

What makes this particularly interesting: induction heads don't develop gradually during training. They appear suddenly, in a phase transition. The model trains for a while without them, then boom—they emerge all at once, and the model's in-context learning ability jumps dramatically. Some capabilities aren't smooth functions of scale or training time; they're discontinuous emergences.

---

> **SIDEBAR: Completeness vs Minimality**
>
> When you've found a circuit explanation for some behavior, how do you know it's complete? Maybe there are other pathways you missed. Maybe the circuit you found is part of a larger ensemble. Or maybe you've included components that aren't actually necessary and a simpler explanation exists.
>
> This is the completeness vs minimality tradeoff. A "complete" explanation might be incredibly complex with hundreds of components and backup pathways. A "minimal" explanation might miss important redundancies that matter when the model is stressed or adversarially attacked.
>
> Which matters more? Depends on your goal. If you're trying to understand how the model works, you probably want completeness. If you're trying to intervene to remove a dangerous capability, you might prefer minimality because simpler interventions are less likely to have unexpected side effects.

---

## Other Tools We Use

Beyond SAEs and circuit analysis, researchers have developed a whole toolkit:

**Toy Models**: Just like biologists study simple organisms before tackling humans, we build deliberately tiny neural networks—sometimes just a few layers, hundreds of neurons—where we can trace every computation. These reveal fundamental principles, like how features organize geometrically in activation space to minimize interference. The big caveat: phase transitions mean big models can behave qualitatively differently, so we're never quite sure what transfers and what doesn't.

**Probing**: Train a simple classifier to predict "is concept X present?" based on the model's activations at some layer. If the classifier can reliably detect the concept, that suggests the information is represented at that layer. Useful for tracking information flow, but has limitations—sometimes the classifier is just learning the task itself rather than reading off information the model is actually using.

**Activation Steering**: If features are directions in activation space, can we directly manipulate them? Turns out yes. You can add "steering vectors" to change model behavior—make it more truthful, more creative, more cautious, whatever. The technique: find examples where the model exhibits the behavior you want, find examples where it doesn't, compute the difference in activations, and use that as your steering direction. This is both a research tool and a practical intervention technique.

**Logit Lens**: Apply the model's final prediction layer at intermediate points in the network to see what the model "thinks" at each stage. Early layers might have a vague idea, middle layers refine it, final layers make a confident prediction. This only works if the model maintains a consistent representational structure throughout, which is itself an unproven hypothesis—but empirically it reveals interesting patterns of how predictions evolve.

---

> **SIDEBAR: The Toy Model Problem**
>
> Almost all our validated findings come from models with less than 1 billion parameters. Production models have 100-1000x more parameters. We're literally studying GPT-2 Small and hoping the lessons transfer to GPT-4.
>
> Sometimes they do. Induction heads appear in both small and large models. Feature hierarchies seem consistent. But phase transitions mean larger models can develop qualitatively new capabilities that simply don't exist in smaller models. There's no smooth ramp-up that would let us see them coming.
>
> This is interpretability's biggest bet: that we're learning something relevant about the systems we actually care about. We won't know if the bet pays off until we can scale our techniques to production systems.

---

## What We've Discovered

Armed with these tools, what have we actually learned? Remember: most findings come from small models, so take everything with appropriate humility.

**Induction heads are fundamental.** These copy-paste circuits appear consistently across different model architectures. They're responsible for in-context learning, and they emerge suddenly rather than gradually. Large models gain most of their in-context learning power from the first ~10 tokens of context. After that, improvements are incremental refinement.

**Feature hierarchies exist.** Models seem to learn simple features early—edges, colors, basic tokens—combine them into complex features in middle layers, and then use those complex features for task-specific decisions in final layers. This hierarchical organization appears across both vision and language models, suggesting it might be a fundamental principle of deep learning.

**Phase transitions are real and concerning.** Certain capabilities don't develop gradually—they appear suddenly past critical thresholds. Induction heads are one example. This is concerning for alignment because we might not see dangerous capabilities coming. A model could be "safe" at one scale and develop concerning capabilities at a slightly larger scale with no warning signs in between.

**Superposition is everywhere.** Models consistently pack more features into fewer dimensions through superposition. Features organize geometrically to minimize interference—sometimes forming polytopes that look like solutions to the Thomson problem. This is elegant and mathematically interesting, but it makes our lives harder.

---

> **SIDEBAR: Why Emergence Matters for Alignment**
>
> If capabilities appear discontinuously, we can't see them coming. The model might be safe at 100B parameters, then suddenly develop deceptive capabilities at 110B with no warning.
>
> Some researchers argue that emergence might be partially a measurement artifact—we're not measuring capabilities precisely enough to see the smooth ramp-up. But even if that's true for some capabilities, phase transitions in training (like when induction heads appear) are definitely real. The alignment implications are uncomfortable either way.

---

## The Current State: Honest Assessment

Let's be real about where the field is.

**What we can do**: Identify some features and circuits in small models. Trace some information pathways. Intervene on some representations. Predict some behaviors from internal states.

**What we can't do yet**: Fully explain most behaviors, even in small models. Scale our techniques to production systems. Confidently predict what features and circuits exist in GPT-4 or Claude. Surgically remove dangerous capabilities without breaking other things. Validate that our interpretations are "correct" rather than just plausible stories.

**The scale gap is enormous.** We're studying models 100-1000x smaller than the systems people actually use. Phase transitions mean this extrapolation might not work.

**We don't have complete theories.** Features and circuits are useful frameworks, but they're not proven to be the "right" ontology. Maybe the model doesn't actually think in terms of discrete features. Maybe circuits are convenient fictions we've imposed rather than real computational units the model uses.

**How much can we explain?** For specific, narrow behaviors on small models, maybe 30-60%. For complex reasoning in large models, maybe 5-10%. We can explain some of what GPT-2 Small does. We can barely scratch the surface of what GPT-4 does.

That said—this is a young field. Most major papers are from 2020 onward. We have tools that didn't exist five years ago. We're making progress. It's not complete understanding, but it's genuine scientific advancement. We're past "this is impossible" and into "this is really hard but tractable."

The question is whether we'll crack the problem before we build systems we really need to understand for safety reasons.

---

> **SIDEBAR: How Much Understanding Do We Need?**
>
> To make AI safe, do we need to fully understand every circuit? Or just the ones related to deception, dangerous capabilities, and alignment-relevant behaviors?
>
> Full understanding would be amazing but might not be necessary. Maybe we can develop targeted interpretability tools that focus specifically on safety-relevant features and circuits. This changes what research we prioritize—less "catalog every feature in the model" and more "develop tools to detect and intervene on specific concerning patterns."
>
> Of course, this assumes we can identify which features are safety-relevant before problems emerge. Given phase transitions and our limited understanding of large models, that's optimistic. The field is still figuring out the right approach.

---

## Where to Go From Here

If you want to dive deeper into mechanistic interpretability:

**Interactive tools**: Anthropic has released some of their SAE features for public exploration. You can see what different features activate on and test your intuitions.

**Key papers to read**:

- "Towards Monosemanticity" (Anthropic) - the Arabic feature and broader SAE work
- "In-context Learning and Induction Heads" (Olsson et al) - how induction heads work and emerge
- "Toy Models of Superposition" (Elhage et al) - fundamental work on how features pack into neurons
- "A Mathematical Framework for Transformer Circuits" (Anthropic) - deeper dive into circuit analysis

**Where the field is heading**: Scaling interpretability techniques to larger models. Developing automated tools that can find features and circuits without human labeling. Building practical applications—steering, capability removal, monitoring for dangerous behaviors. Figuring out which interpretability approaches actually help with alignment.

The goal isn't just to understand AI for its own sake, though that's intellectually fascinating. It's to understand AI well enough to make it safe and reliable. We're not there yet, but we're building the tools to get there.

---

_Thanks to Douglas Adams, who showed us that the best field guides have personality._

_Don't forget your towel._
