import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import matter from 'gray-matter'

const root = process.cwd()
const sourceRoot = path.resolve(process.argv[2] || process.env.AUTOMOTIVE_SOURCE_ROOT || '')
const manifestPath = path.join(root, 'migration/automotive-articles-manifest.json')
const articleDir = path.join(root, 'content/articles')
const assetDir = path.join(root, 'public/images/articles')

if (!process.argv[2] && !process.env.AUTOMOTIVE_SOURCE_ROOT) {
  throw new Error('Pass the read-only source repository path: node scripts/migrate-automotive-articles.mjs /path/to/07anishu12.github.io')
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const sourceCommit = execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
if (sourceCommit !== manifest.sourceCommit) throw new Error(`Source commit mismatch: expected ${manifest.sourceCommit}, found ${sourceCommit}`)

const audit = JSON.parse(fs.readFileSync(path.join(sourceRoot, manifest.sourceAudit), 'utf8'))
const selectedAudit = audit.entries.filter((entry) => entry.datePublished === '2026-10-29')
const auditBySource = new Map(selectedAudit.map((entry) => [entry.source, entry]))
if (selectedAudit.length !== 100 || manifest.articles.length !== 100) throw new Error('Expected exactly 100 October 29 source and manifest records.')

const slugs = new Set()
const prepared = []
for (const record of manifest.articles) {
  if (slugs.has(record.slug)) throw new Error(`Duplicate manifest slug: ${record.slug}`)
  slugs.add(record.slug)
  const auditEntry = auditBySource.get(record.sourceFile)
  if (!auditEntry || auditEntry.url !== record.compatibilityRoute || auditEntry.datePublished !== record.publicationDate) {
    throw new Error(`Source audit mismatch for ${record.sourceFile}`)
  }

  const sourcePath = path.resolve(sourceRoot, record.sourceFile)
  if (!sourcePath.startsWith(`${sourceRoot}${path.sep}`)) throw new Error(`Source path escapes repository: ${record.sourceFile}`)
  const parsed = matter(fs.readFileSync(sourcePath, 'utf8'))
  const source = parsed.data
  for (const key of ['title', 'description', 'seoTitle', 'seoKeywords', 'author', 'coverImageAlt']) {
    if (typeof source[key] !== 'string' || !source[key].trim()) throw new Error(`${record.slug}: missing ${key}`)
  }
  if (source.slug !== record.slug || source.datePublished !== record.publicationDate || source.draft !== false) {
    throw new Error(`${record.slug}: slug, date, or draft status does not match the manifest.`)
  }
  if (!Array.isArray(source.tags) || !source.tags.length) throw new Error(`${record.slug}: missing tags.`)
  if (!Array.isArray(source.faqItems) || !source.faqItems.length || source.faqItems.some((faq) => !faq.question?.trim() || !faq.answer?.trim())) {
    throw new Error(`${record.slug}: invalid FAQ items.`)
  }

  const coverRelative = source.coverImage.replace(/^\//, '')
  const coverPath = path.resolve(sourceRoot, coverRelative)
  if (!coverPath.startsWith(`${sourceRoot}${path.sep}`)) throw new Error(`${record.slug}: cover path escapes source repository.`)
  const svg = fs.readFileSync(coverPath, 'utf8')
  if (!/^\s*<svg\b/i.test(svg) || /<script\b|<foreignObject\b|\bon\w+\s*=|(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/)/i.test(svg)) {
    throw new Error(`${record.slug}: SVG cover is malformed or contains unsafe active/external content.`)
  }

  const targetFile = path.join(articleDir, `${record.slug}.md`)
  const targetAsset = path.join(assetDir, record.slug, 'cover.svg')
  if (fs.existsSync(targetFile) || fs.existsSync(targetAsset)) throw new Error(`${record.slug}: target file or asset already exists; refusing to overwrite.`)

  const seoKeywords = source.seoKeywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
  const frontmatter = {
    title: source.title,
    slug: record.slug,
    description: source.description,
    seoTitle: source.seoTitle,
    seoKeywords,
    category: record.targetCategory,
    tags: source.tags,
    author: source.author,
    date: record.publicationDate,
    coverImage: `/images/articles/${record.slug}/cover.svg`,
    coverImageAlt: source.coverImageAlt,
    imageCaption: source.imageCaption || '',
    faqItems: source.faqItems,
    publishOrder: source.publishOrder,
    publishWave: source.publishWave,
    draft: false,
    featured: false,
  }

  prepared.push({ record, targetFile, targetAsset, content: matter.stringify(parsed.content, frontmatter), svg })
}

if (slugs.size !== 100 || prepared.length !== 100) throw new Error('Migration preflight did not produce exactly 100 unique articles.')

for (const item of prepared) {
  fs.mkdirSync(path.dirname(item.targetFile), { recursive: true })
  fs.mkdirSync(path.dirname(item.targetAsset), { recursive: true })
  fs.writeFileSync(item.targetFile, item.content)
  fs.writeFileSync(item.targetAsset, item.svg)
  item.record.migrationStatus = 'migrated'
  item.record.targetAsset = `/images/articles/${item.record.slug}/cover.svg`
}

manifest.migratedArticleCount = prepared.length
manifest.articles = manifest.articles.sort((a, b) => (a.publishOrder ?? Number.MAX_SAFE_INTEGER) - (b.publishOrder ?? Number.MAX_SAFE_INTEGER) || a.slug.localeCompare(b.slug))
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Migrated ${prepared.length} articles and copied ${prepared.length} validated cover SVGs.`)
