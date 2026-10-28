import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'migration/automotive-articles-manifest.json'), 'utf8'))
const records = manifest.articles
const legacyRecords = manifest.preservedLegacyArticles || []
if (records.length !== 100 || manifest.migratedArticleCount !== 100) throw new Error('Manifest must contain exactly 100 migrated articles.')
const slugs = new Set()
const titles = new Set()
const descriptions = new Set()
const oldCount = 8
for (const record of records) {
  if (slugs.has(record.slug)) throw new Error(`Duplicate slug: ${record.slug}`)
  slugs.add(record.slug)
  if (record.migrationStatus !== 'migrated' || record.publicationDate !== '2026-10-29') throw new Error(`Invalid migration/date status: ${record.slug}`)
  const filename = path.join(root, record.targetFile)
  if (!fs.existsSync(filename)) throw new Error(`Missing Markdown file: ${record.targetFile}`)
  const { data, content } = matter(fs.readFileSync(filename, 'utf8'))
  if (data.slug !== record.slug || data.draft !== false || data.date !== '2026-10-29' || data.category !== 'Automotive') throw new Error(`Invalid frontmatter: ${record.slug}`)
  if (!data.title?.trim() || !data.description?.trim() || !data.seoTitle?.trim() || !Array.isArray(data.seoKeywords) || !data.seoKeywords.length) throw new Error(`Missing SEO metadata: ${record.slug}`)
  if (titles.has(data.title) || descriptions.has(data.description)) throw new Error(`Duplicate title or description: ${record.slug}`)
  titles.add(data.title); descriptions.add(data.description)
  if (!Array.isArray(data.faqItems) || data.faqItems.length !== record.faqCount || !/Frequently Asked Questions/i.test(content)) throw new Error(`FAQ content/schema mismatch: ${record.slug}`)
  if (!data.coverImageAlt?.trim() || !data.imageCaption?.trim()) throw new Error(`Missing image alt/caption: ${record.slug}`)
  const asset = path.join(root, 'public', data.coverImage.replace(/^\//, ''))
  if (!fs.existsSync(asset) || !/^\s*<svg\b/i.test(fs.readFileSync(asset, 'utf8'))) throw new Error(`Missing or invalid SVG asset: ${record.slug}`)
  for (const [, target] of content.matchAll(/\]\(\/blog\/auto\/([^/\s)]+)\/?(?:#[^\s)]*)?\)/g)) {
    if (!slugs.has(target) && !records.some((candidate) => candidate.slug === target)) throw new Error(`Internal link target missing: ${record.slug} -> ${target}`)
  }
  record.targetRoute = `/articles/${record.slug}`
  record.compatibilityRoute = `/blog/auto/${record.slug}/`
}
if (records.filter(({ publishWave }) => publishWave === 1).length !== 25 || records.filter(({ publishWave }) => publishWave === 2).length !== 25 || records.filter(({ publishWave }) => publishWave === 3).length !== 25 || records.filter(({ publishWave }) => publishWave === 4).length !== 25) throw new Error('Expected 25 migrated articles in each of 4 source waves.')
const targetArticleFiles = fs.readdirSync(path.join(root, 'content/articles')).filter((file) => file.endsWith('.md'))
for (const legacy of legacyRecords) {
  const filename = path.join(root, 'content/articles', `${legacy.slug}.md`)
  if (legacy.migrationStatus !== 'preserved-legacy-route' || !fs.existsSync(filename)) throw new Error(`Missing preserved legacy article: ${legacy.slug}`)
  const { data } = matter(fs.readFileSync(filename, 'utf8'))
  if (data.date !== legacy.publicationDate || data.draft !== false || data.category !== 'Automotive' || !Array.isArray(data.faqItems) || data.faqItems.length !== 2) throw new Error(`Invalid preserved legacy metadata: ${legacy.slug}`)
  slugs.add(legacy.slug)
}
if (targetArticleFiles.length !== oldCount + records.length + legacyRecords.length) throw new Error(`Expected ${oldCount + records.length + legacyRecords.length} articles, found ${targetArticleFiles.length}.`)
if (!fs.existsSync(path.join(root, 'app/blog/auto/[slug]/page.tsx')) || !fs.existsSync(path.join(root, 'app/blog/page.tsx'))) throw new Error('Compatibility routes are missing.')
fs.writeFileSync(path.join(root, 'migration/automotive-articles-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Validated ${records.length} migrated articles and ${legacyRecords.length} preserved legacy routes; original=${oldCount}, final=${targetArticleFiles.length}, unique slugs=${slugs.size}.`)
