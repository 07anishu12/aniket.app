---
title: "What Modeling Food Webs Taught Me About Graph Neural Networks"
description: "Six months at OIST Japan, a sparse biological dataset, and a GAT architecture. Here's what ecological modeling taught me about heterophily, message passing, and why graph structure is everything."
date: "2025-01-15"
category: "AI Research"
tags: ["GNN", "PyTorch", "Ecology", "OIST", "Research"]
coverImage: null
featured: true
draft: false
author: "Aniket"
---

When you study Graph Neural Networks (GNNs) in a classroom, the examples are almost always social networks. You learn the core assumption of homophily: nodes connected to each other tend to be similar. "People who like this post also like this post."

But what happens when you step out of the social graph and into a biological one?

For the last six months, I've been a Research Intern at the Okinawa Institute of Science and Technology (OIST), Japan. My project involved applying GNN architectures to model ecological food webs.

A food web is a graph where nodes are species and edges represent energy flow (who eats whom). If you apply a standard Graph Convolutional Network (GCN) to this dataset, it fails spectacularly. Why? Because of **heterophily**.

In a food web, predators and prey are connected, but they do not share features. A hawk is not a mouse. A shark is not a sardine. Yet, they are strongly linked. The message-passing mechanism of a standard GCN essentially averages node features with their neighbors. In a heterophilic graph, this leads to immediate over-smoothing, washing out the distinct representations of predator and prey into an uninformative blur.

### Enter Graph Attention Networks (GAT)

To solve this, we moved to GAT-based architectures. Instead of blindly averaging, GAT uses self-attention to learn *how* important a neighboring node is.

```python
import torch
import torch.nn.functional as F
from torch_geometric.nn import GATConv

class FoodWebGAT(torch.nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels, heads=8):
        super().__init__()
        # Attention allows the network to assign different weights to predator/prey links
        self.conv1 = GATConv(in_channels, hidden_channels, heads=heads, dropout=0.6)
        self.conv2 = GATConv(hidden_channels * heads, out_channels, heads=1, concat=False, dropout=0.6)

    def forward(self, x, edge_index):
        x = F.dropout(x, p=0.6, training=self.training)
        x = F.elu(self.conv1(x, edge_index))
        x = F.dropout(x, p=0.6, training=self.training)
        x = self.conv2(x, edge_index)
        return x
```

But even GAT wasn't enough out of the box. Ecological graphs are incredibly sparse. Through ablation studies on message-passing depth and edge-feature augmentation, I learned that under sparse conditions, pushing information too far (too many layers) amplifies noise. We had to carefully balance depth with structural sparsity.

The biggest takeaway from this research wasn't about tuning hyperparameters. It was a fundamental shift in how I view AI architecture. Before importing `GCNConv` or writing your forward pass, you have to ask: *What does an edge actually mean in this domain?* If you get the geometry of the problem wrong, no amount of compute will save you.