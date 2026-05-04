import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const owner = "07anishu12";
const repo = "portfolio"; 

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const path = `content/articles/${resolvedParams.slug}.md`;

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (Array.isArray(data) || data.type !== "file") {
      throw new Error("Not a file");
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");
    
    return NextResponse.json({ content, sha: data.sha });
  } catch (error: any) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const path = `content/articles/${resolvedParams.slug}.md`;

    // Get the SHA first
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (Array.isArray(fileData) || fileData.type !== "file") {
      throw new Error("Not a file");
    }

    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete article: ${resolvedParams.slug}`,
      sha: fileData.sha,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
