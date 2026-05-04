import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";

export async function GET() {
  try {
    // Need to bypass draft filtering to show drafts in admin
    // I will write a custom function here to read all
    const fs = require('fs')
    const path = require('path')
    const matter = require('gray-matter')
    
    const articlesDirectory = path.join(process.cwd(), 'content', 'articles')
    if (!fs.existsSync(articlesDirectory)) {
      return NextResponse.json({ articles: [] })
    }

    const filenames = fs.readdirSync(articlesDirectory).filter((f: string) => f.endsWith('.md'))
    const articles = filenames.map((filename: string) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        featured: data.featured || false,
        draft: data.draft || false,
        readingTime: data.readingTime || 0,
      }
    })

    articles.sort((a: any, b: any) => (a.date > b.date ? -1 : 1))

    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
