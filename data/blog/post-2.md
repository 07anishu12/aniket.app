---
title: "Building a NL-to-SQL System That Doesn't Break: Lessons from Drivio"
date: "2025-02-02"
tags: ["LLM Systems", "Engineering", "TypeScript"]
excerpt: "Connecting an LLM to your production database is easy. Making it reliable, secure, and context-aware is hard. Here is how we did it."
---

Building a Natural Language to SQL (NL-to-SQL) system looks trivial in a LangChain tutorial. You pass the schema to the LLM, append the user query, and execute the output. 

In a real fintech startup, that naive approach fails catastrophically within 10 minutes. 

During my time at Drivio Technologies, we built a BI layer over heterogeneous enterprise data using the Claude API. Here are the three main failure modes we encountered and how we mitigated them:

### 1. The Schema Hallucination Problem
LLMs love to invent columns that logically *should* exist but don't. 
**The Fix:** We implemented strict schema-grounding. Instead of just dumping the DDL into the prompt, we built an intermediate retrieval step that fetches only the relevant tables and their exact schema definitions, passing them as hard constraints.

### 2. The Multi-Source Join Nightmare
When queries spanned multiple distinct databases (e.g., matching loan applications in Postgres with clickstream data in MongoDB), a single SQL generation step failed.
**The Fix:** We orchestrated the query generation into a multi-step planner. The LLM first acts as a router, deciding which sources need to be queried, generates source-specific queries, and then writes a Python data manipulation script to join the results in memory.

### 3. Injection Resistance
You cannot blindly execute LLM-generated SQL on production data.
**The Fix:** We implemented a two-pass evaluation loop. The first pass generates the SQL. The second pass (a separate, cheaper model) analyzes the generated SQL for destructive operations (`DROP`, `DELETE`, `UPDATE`) or massive unconstrained `SELECT *` queries before execution.

Building AI products isn't about making the model smarter; it's about building a robust system around the model to handle its inevitable stupidity.