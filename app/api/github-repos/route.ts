import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1. Load manual overrides/private repos
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const localData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let githubRepos: any[] = [];
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      const { data } = await octokit.repos.listForUser({
        username: "07anishu12",
        type: "owner",
        sort: "updated",
        per_page: 100,
      });

      githubRepos = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          id: repo.name,
          name: repo.name.replace(/-/g, " "),
          description: repo.description || "",
          tags: [repo.language].filter(Boolean) as string[],
          github: repo.html_url,
          private: repo.private,
          featured: false,
          category: "Other", // Will be overridden if matched
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
        }));
    } catch (err) {
      console.error("Failed to fetch GitHub repos, using only local data", err);
    }

    // 2. Merge local data with GitHub data
    const localIds = new Set(localData.map((p: any) => p.id));
    const mergedRepos = [
      ...localData,
      ...githubRepos.filter((repo) => !localIds.has(repo.id) && !localIds.has(repo.name)),
    ];

    // 3. Sort: featured first
    mergedRepos.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return NextResponse.json({ repos: mergedRepos, lastFetched: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}
