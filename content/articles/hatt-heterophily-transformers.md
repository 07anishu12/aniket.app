---
title: "HATT: Building a Temporal Transformer for Heterophilic Graphs"
description: "Standard GNNs assume similar nodes connect. Most real networks don't work that way. Here's what I learned building a heterophily-aware temporal transformer."
date: "2024-11-05"
category: "AI Research"
tags: ["Transformers", "PyTorch", "GNN", "Research"]
coverImage: null
featured: false
draft: false
author: "Aniket"
---

Graph Neural Networks have historically relied on a core premise: homophily. Nodes that are connected tend to be similar. It works brilliantly for social networks ("friends like the same movies") and citation graphs ("papers cite similar research").

But the real world is messy, and many critical networks are entirely **heterophilic**. A dating app connects dissimilar people. A fraud network connects fake accounts to real ones. An ecological food web connects predators to entirely different species of prey.

When you run standard GCNs on these datasets, the message-passing step blindly averages dissimilar features, destroying the very information you need to make a prediction. To fix this, I set out to build the **Heterophily-Aware Temporal Transformer (HATT)**.

### The Attention Modification

The core insight of HATT was that we need a mechanism that can learn *when* to pay attention to a dissimilar neighbor, rather than just averaging everything. I modified the standard self-attention mechanism specifically for heterophilic node classification.

Instead of simple dot-product attention, HATT introduces a learned projection that can assign *negative* weights or filter representations based on high feature dissimilarity. If a node is vastly different from its neighbor, HATT can choose to amplify that difference as a signal, rather than smoothing it away.

### Ablation and Benchmarks

We benchmarked HATT against standard baselines: GAT, GCN, and H2GCN, using the canonical heterophilic datasets: Cornell, Texas, and Wisconsin.

The results were stark. On highly heterophilic structures, HATT outperformed standard GCNs by a significant margin. But the real value was in the ablation studies. By turning off the heterophily-aware attention head, performance collapsed back to baseline levels. This proved that the model wasn't just brute-forcing the dataset; it was explicitly leveraging the dissimilarity between connected nodes.

Building HATT taught me that the hardest part of ML research isn't writing the training loop. It's deeply understanding the mathematical geometry of the data you are trying to model, and designing architectures that explicitly respect that geometry rather than fighting against it.