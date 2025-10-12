# The Hitchhiker's Guide to Understanding Your AI

_Note: this is a rough draft of an introductory, fun guide to mechanistic interpretability. More chapters will come along soon!_

---

# Chapter 0: Introduction

_The weird world of not understanding what's going on your AI's head... guess this must be what it's like to have children._

---

## Don't Panic

AI models do surprising, powerful, sometimes concerning things, and we don't really understand how. They write code, answer questions, translate languages, and occasionally hallucinate facts with impressive confidence. But if you ask "how does it actually work inside?" ... well, that's where things get fuzzy.

And we do NOT want fuzzy. Fuzzy is what makes AI models give us a forecast of a sunny future with a chance of catastrophe.

So, if we want AI systems to be safe and trustworthy, we should probably take some time to understand their internals rather than treating them as magical black boxes. If we want to improve them, we need to know what's happening under the hood. And if you want to make sure you end up reaping the benefits of your long-term investments (hah, good luck with that), we should probably make sure they have the same values and goals as us.

**Mechanistic interpretability** _(noun)_ is the field dedicated to figuring out the details of how models work. Not hand-waving and saying "it predicts the next word", but "here's the actual circuit of computations that makes it able to do X." This entire book is a guide to that endeavor — what we're looking for, how we look for it, and what we've found so far.

Fair warning: a lot of what we've learned comes from studying tinier models than what you're probably using (I'm talking 100-1000x smaller)... so good luck! We're basically trying to understand humans by studying mice. Thankfully our toolbox contains tools that are also usable on larger models.

---

## What's Next

This guide is organized into several major arcs.

First, we'll talk about some of the key concepts when dealing with interpretability (features, circuits) and look at some of the tools that help us identify these concepts.

Next, we will do a deep dive of other tools that have revealed interesting information into the behavior of models.

The last arc will be focused on what we've learned, and give you all a ready-to-use toolkit in the case of emergency AI debugging.

Let's get started!
