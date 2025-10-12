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

This guide is organized into two major portions, as long as you've found this book intact (godspeed to you if not).

**The Quick Reference** gives you the 15-minute overview. Need to disarm your AI in 15 minutes? Read this section. It will improve your odds of survival by ... well ... I think you'll be better off?

**The Deep Dives** (Chapters 1-4) explore specific tools and discoveries in detail. Want to really understand how we find features? Chapter 1. Want to know what circuits are and why induction heads are everywhere? Chapter 2. Each chapter includes Maicroscopes you can play with, to peer at actual models and watch them do things.

**Choose your own adventure:**

- Got an emergency? → Quick Reference
- Want to understand features deeply? → Chapter 1
- Want to understand circuits? → Chapter 2
- Want to explore other tools? → Chapter 3
- Want to see what we've discovered? → Chapter 4
- Have no idea what any of these words mean? → Reread this introduction

Let's get started. And remember: Don't Panic! It won't help anyway.
