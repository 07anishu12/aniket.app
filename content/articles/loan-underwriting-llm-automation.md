---
title: "Automating Loan Underwriting with LLMs: 48 Hours to 6 Hours"
description: "How we used Claude API and Playwright to cut loan review time by 75% at a fintech startup — and what edge cases almost broke everything."
date: "2025-01-05"
category: "AI Systems"
tags: ["Automation", "Claude API", "Playwright", "LLM"]
coverImage: null
featured: false
draft: false
author: "Aniket"
---

The core bottleneck in fintech lending isn't capital; it's the time it takes to securely review documents and underwrite a loan. 

When I was an APM for AI Systems at Drivio Technologies, we noticed that our manual underwriting process—which involved downloading bank statements, extracting figures into spreadsheets, and applying a risk matrix—was taking up to 48 hours. This led to high drop-off rates as customers simply went to competitors who offered faster (though riskier) approvals.

We set out to automate the workflow using LLMs, specifically the Claude API, orchestrated via Playwright.

### Document Extraction via Playwright and Claude

The first challenge was unstructured data. Bank statements come in every conceivable PDF format. Parsing them with traditional OCR was yielding high error rates. Instead, we used a combination of Playwright to navigate portal dashboards and extract visual context, and Claude to read the raw text and structure it into a uniform JSON schema. 

Claude proved exceptionally good at understanding the semantic layout of a financial document. It didn't just read "5,000"; it understood that "5,000" under the "Cr" column on the 15th of the month meant a salary deposit.

### The Edge Cases That Almost Broke Us

Scaling from 10 test documents to 1,000+ real-world applications exposed the edge cases.

1.  **The "Creative" Formatter:** Users sometimes uploaded screenshots of their bank app instead of official PDFs. We had to build an image-fallback layer where Claude Vision analyzed the screenshots directly.
2.  **The Formatting Hallucination:** Occasionally, the LLM would output valid JSON, but the risk score field would be formatted as a string ("high") instead of the expected float (`0.85`). We introduced `pydantic` validation at the API edge to catch and retry malformed schema responses.
3.  **The Ambiguous Transaction:** When a transaction description was vague (e.g., "TRF TO X"), Claude would sometimes aggressively assume it was a loan repayment to a competitor. We had to specifically instruct the prompt to output an "uncertainty flag" rather than guessing.

### The Result

By routing the clean, high-confidence extractions straight through the automated decision matrix, and flagging only the edge cases for human review, we reduced the average underwriting time from 48 hours to just under 6 hours. 

The lesson was clear: don't automate the human out of the loop entirely. Automate the predictable 80%, and give the remaining 20% to the human, packaged with the context they need to make a decision in seconds.