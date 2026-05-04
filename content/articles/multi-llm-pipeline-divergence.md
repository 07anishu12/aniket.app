---
title: "When Gemini, DeepSeek and Claude Disagree: Notes on Multi-LLM Pipelines"
description: "I ran ensemble calls across four LLMs to generate ecological descriptors. The divergence patterns were more interesting than the outputs."
date: "2025-02-18"
category: "AI Research"
tags: ["LLM", "Research", "Robustness", "OIST"]
coverImage: null
featured: false
draft: false
author: "Aniket"
---

Most AI systems today are dangerously coupled to a single provider. We build an entire product around the specific quirks and RLHF alignment of `gpt-4o` or `claude-3-opus`. But what happens when you use LLMs to generate synthetic data for scientific research, and the model hallucinates a biological relationship that doesn't exist?

During my research pipeline development at OIST, we needed to generate synthetic ecological descriptors for sparse food webs. A single model is a point estimate—it gives you an answer, but no confidence interval. To fix this, we moved away from single-model generation and built a **Multi-LLM ensemble pipeline** featuring Gemini, DeepSeek, Claude, and OpenAI.

We didn't do this to bypass rate limits. We did it to measure **inter-model behavioral divergence**.

When three frontier models generate similar synthetic data points given the same biological context, confidence is high. But when one model strongly disagrees with the others, it almost always points to a nuanced ambiguity in the prompt, or a specific blind spot in that model's pre-training data.

For example, when asked to describe the interaction between two obscure deep-sea species:
- Claude might output a conservative summary based on known marine biology principles.
- Gemini might pull a highly specific (but potentially outdated) paper.
- DeepSeek might hallucinate a completely plausible-sounding but false trophic interaction.

By measuring this divergence, we built an automated anomaly detection system for synthetic data. Instead of treating an LLM output as ground truth, a multi-LLM pipeline treats outputs as expert opinions. You wouldn't base a major biological conclusion on the word of a single expert without peer review. Why do we do it with AI models?

The future of robust AI systems isn't just about finding the "best" model. It's about designing architectures that can aggregate, weight, and evaluate the outputs of many models simultaneously to arrive at a scientifically sound consensus.