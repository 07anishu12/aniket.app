---
title: "From Ecological Food Webs to GNNs: What Biology Taught Me About Graph Structure"
date: "2025-01-15"
tags: ["Research", "GNN", "Graph ML"]
excerpt: "How modeling biological networks shifted my perspective on heterophily and message passing in Graph Neural Networks."
---

Most people think of Graph Neural Networks (GNNs) in the context of social networks or recommendation systems. "People who like X also like Y." This is the core assumption of homophily—nodes connected to each other tend to be similar.

But when you apply GNNs to ecological food webs (like my research at OIST), this assumption breaks completely.

In a food web, predators don't share features with their prey. A hawk is not a mouse. A shark is not a sardine. Yet, they are strongly connected. This is **heterophily**—where connected nodes are dissimilar. 

Standard GCNs perform terribly here. The message-passing mechanism essentially averages node features with their neighbors, leading to over-smoothing and washing out the distinct representations of predator and prey.

To fix this, we need **Heterophily-Aware Temporal Transformers (HATT)**. Instead of blindly averaging, we use self-attention mechanisms that can assign *negative* weights or filter representations based on dissimilarity. The network learns *how* the connection relates the nodes, rather than assuming similarity.

This shift in perspective—from sociology to biology—fundamentally changed how I approach architecture design. It taught me that before you import `GCNConv`, you need to ask: *What does an edge actually mean in this domain?*