---
title: "Building a NL-to-SQL System That Doesn't Break in Production"
description: "I built a natural-language-to-SQL BI system at Drivio using Claude API. Here are the three failure modes that almost killed it — and how prompt evaluation loops saved it."
date: "2024-12-10"
category: "AI Systems"
tags: ["LLM Systems", "TypeScript", "FastAPI", "Claude API"]
coverImage: null
featured: true
draft: false
author: "Aniket"
---

Building a Natural Language to SQL (NL-to-SQL) system looks trivial in a LangChain tutorial. You pass the schema to the LLM, append the user query, and execute the output. 

In a real fintech startup, that naive approach fails catastrophically within 10 minutes. 

During my time as an APM at Drivio Technologies, we built a Business Intelligence layer over heterogeneous enterprise data using the Claude API. The goal was simple: allow PMs to query data using plain English. The execution was not simple. Here are the three main failure modes we encountered and how we mitigated them:

### 1. The Schema Hallucination Problem

LLMs love to invent columns that logically *should* exist but don't. For instance, if asked about "loan default rates by user age," an LLM might invent an `age` column, completely ignoring the fact that our schema only tracks `date_of_birth`.

**The Fix:** We implemented strict schema-grounding. Instead of just dumping the DDL into the prompt, we built an intermediate retrieval step that fetches only the relevant tables and their exact schema definitions, passing them as hard constraints.

### 2. The Multi-Source Join Nightmare

When queries spanned multiple distinct databases (e.g., matching loan applications in Postgres with clickstream data in MongoDB), a single SQL generation step failed. The LLM couldn't magically write a query that operated across database dialects and connections simultaneously.

**The Fix:** We orchestrated the query generation into a multi-step planner. The LLM first acts as a router, deciding which sources need to be queried, generates source-specific queries, and then writes a Python data manipulation script to join the results in memory before rendering the final table.

### 3. Injection Resistance

You cannot blindly execute LLM-generated SQL on production data. If an LLM decides to hallucinate a `DROP TABLE` command due to a poorly phrased user query, the system breaks.

**The Fix:** We implemented a two-pass evaluation loop. The first pass generates the SQL. The second pass (using a smaller, faster model) acts as a strict security gatekeeper. It analyzes the generated SQL for destructive operations (`DROP`, `DELETE`, `UPDATE`) or massive unconstrained `SELECT *` queries. If the query fails the check, it is rewritten or entirely blocked before execution.

Building AI products isn't about making the model smarter; it's about building a robust system around the model to handle its inevitable stupidity.