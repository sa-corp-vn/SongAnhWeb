/**
 * Nạp toàn bộ nội dung chuyển từ sa-corp.vn vào Payload CMS.
 *   npm run seed
 * Chạy lại nhiều lần được: tài liệu trùng đường dẫn (slug) sẽ được cập nhật, không tạo bản trùng.
 */
import fs from 'fs'
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(dirname, '../..')
const PUBLIC = path.join(ROOT, 'public')
// Ảnh đại diện chỉ dùng để nạp vào Thư viện ảnh (không xuất hiện trong nội dung bài) nằm ở seed/images,
// ảnh vừa là ảnh đại diện vừa nằm trong nội dung bài thì vẫn ở public/uploads.
const SEED_IMAGES = path.join(dirname, 'images')

type Img = { file: string; alt: string } | null
type KV = { label: string; value: string }
type Data = {
  categories: { slug: string; title: string }[]
  projectCategories: { slug: string; title: string }[]
  posts: { slug: string; title: string; seoTitle?: string; excerpt?: string; category: string; publishedAt: string; featured: Img; html: string }[]
  projects: {
    slug: string; title: string; shortName: string; order: number; categories: string[]; excerpt?: string; seoTitle?: string; hero: Img
    status: string; period: string; stats: KV[]; info: KV[]; map: { lat: number; lng: number; province: string } | null; featuredOnHome: boolean; html: string
  }[]
  services: { slug: string; title: string; order: number; excerpt?: string; seoTitle?: string; hero: Img; card: Img; html: string }[]
  pages: { slug: string; title: string; excerpt?: string; html: string }[]
}

const ctx = { disableRevalidate: true }
const STATUS: Record<string, 'ongoing' | 'completed'> = { 'Đang thực hiện': 'ongoing', 'Đã hoàn thành': 'completed' }

async function upsert(payload: Payload, collection: 'posts' | 'projects' | 'services' | 'pages' | 'categories' | 'project-categories', slug: string, data: Record<string, unknown>) {
  const found = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
  if (found.docs[0]) {
    return payload.update({ collection, id: found.docs[0].id, data: data as never, context: ctx, overrideAccess: true, depth: 0 })
  }
  return payload.create({ collection, data: data as never, context: ctx, overrideAccess: true, depth: 0 })
}

const mediaCache = new Map<string, number>()
async function mediaId(payload: Payload, img: Img): Promise<number | undefined> {
  if (!img?.file) return undefined
  if (mediaCache.has(img.file)) return mediaCache.get(img.file)
  const abs = [path.join(SEED_IMAGES, img.file.replace(/^\/?uploads\//, '')), path.join(PUBLIC, img.file)].find((p) => fs.existsSync(p))
  if (!abs) {
    payload.logger.warn(`Thiếu ảnh: ${img.file}`)
    return undefined
  }
  const filename = path.basename(abs)
  const found = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, depth: 0 })
  let id = found.docs[0]?.id as number | undefined
  if (!id) {
    const doc = await payload.create({ collection: 'media', data: { alt: (img.alt || filename).slice(0, 250) }, filePath: abs, overrideAccess: true })
    id = doc.id as number
  }
  mediaCache.set(img.file, id)
  return id
}

async function main() {
  const payload = await getPayload({ config })
  const data: Data = JSON.parse(fs.readFileSync(path.join(dirname, 'data.json'), 'utf-8'))
  const t0 = Date.now()
  const log = (m: string) => payload.logger.info(`[seed ${((Date.now() - t0) / 1000).toFixed(0)}s] ${m}`)

  await payload.updateGlobal({ slug: 'site-settings', data: {}, context: ctx })
  log('Thông tin công ty')

  const catIds: Record<string, number> = {}
  for (const c of data.categories) catIds[c.slug] = (await upsert(payload, 'categories', c.slug, c)).id as number
  const pcatIds: Record<string, number> = {}
  for (const c of data.projectCategories) pcatIds[c.slug] = (await upsert(payload, 'project-categories', c.slug, c)).id as number
  log(`Chuyên mục: ${data.categories.length} · Loại dự án: ${data.projectCategories.length}`)

  for (const p of data.projects) {
    await upsert(payload, 'projects', p.slug, {
      title: p.title, shortName: p.shortName, order: p.order, slug: p.slug,
      categories: p.categories.map((c) => pcatIds[c]).filter(Boolean),
      heroImage: await mediaId(payload, p.hero),
      status: STATUS[p.status] ?? undefined, period: p.period,
      stats: p.stats.filter((s) => s.label && s.value), info: p.info.filter((r) => r.label && r.value),
      location: p.map ? { showOnMap: true, lat: p.map.lat, lng: p.map.lng, province: p.map.province } : { showOnMap: false },
      featuredOnHome: p.featuredOnHome, contentHtml: p.html, excerpt: p.excerpt, seoTitle: p.seoTitle, _status: 'published',
    })
  }
  log(`Dự án: ${data.projects.length}`)

  for (const s of data.services) {
    await upsert(payload, 'services', s.slug, {
      title: s.title, order: s.order, slug: s.slug, heroImage: await mediaId(payload, s.hero), cardImage: await mediaId(payload, s.card),
      contentHtml: s.html, excerpt: s.excerpt, seoTitle: s.seoTitle, _status: 'published',
    })
  }
  log(`Dịch vụ: ${data.services.length}`)

  let n = 0
  for (const p of data.posts) {
    await upsert(payload, 'posts', p.slug, {
      title: p.title, slug: p.slug, category: catIds[p.category], publishedAt: p.publishedAt,
      featuredImage: await mediaId(payload, p.featured), contentHtml: p.html, excerpt: p.excerpt, seoTitle: p.seoTitle, _status: 'published',
    })
    if (++n % 50 === 0) log(`Bài viết: ${n}/${data.posts.length}`)
  }
  log(`Bài viết: ${data.posts.length}`)

  for (const pg of data.pages) {
    await upsert(payload, 'pages', pg.slug, { title: pg.title, slug: pg.slug, contentHtml: pg.html, excerpt: pg.excerpt, _status: 'published' })
  }
  log(`Trang văn bản: ${data.pages.length} · Ảnh: ${mediaCache.size}`)
  log('Hoàn tất.')
  process.exit(0)
}

// `payload run` thoát ngay khi script nạp xong → phải chờ ở cấp cao nhất
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
