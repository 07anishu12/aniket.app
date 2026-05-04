import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import readingTime from "reading-time";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, slug, category, tags, coverImage, featured, draft, content, sha } = data;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const time = Math.ceil(readingTime(content).minutes);
    const date = new Date().toISOString().split("T")[0];

    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
tags: [${tags.map((t: string) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]
coverImage: ${coverImage ? `"${coverImage}"` : "null"}
readingTime: ${time}
featured: ${featured}
draft: ${draft}
author: "Aniket"
---

${content}
`;

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    // Assuming the repo is "portfolio" as per the prompt instructions (or the current repo)
    // For local dev, we might just write to the file system, but the prompt specifically asked for GitHub API.
    // Let's use the actual repository name 'aniket' since we are operating in it, or we could just write locally if GITHUB_TOKEN isn't meant to actually push during this agent run.
    // Since the prompt explicitly says "The system works by writing .md files to GitHub via the GitHub API", we will implement it as requested.
    
    const owner = "07anishu12";
    const repo = "portfolio"; // Or whatever the actual repo name is, the prompt said `repos/07anishu12/portfolio`
    const path = `content/articles/${slug}.md`;

    // We must encode to base64
    const encodedContent = Buffer.from(fileContent).toString("base64");

    const params: any = {
      owner,
      repo,
      path,
      message: `${sha ? "Update" : "Add"} article: ${title}`,
      content: encodedContent,
    };

    if (sha) {
      params.sha = sha;
    }

    await octokit.repos.createOrUpdateFileContents(params);

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to publish article" },
      { status: 500 }
    );
  }
}
