import config from '@payload-config'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'
import type { Category, Media, Page, Post, Project, ProjectCategory, Service, SiteSetting } from '@/payload-types'

export const getClient = cache(() => getPayload({ config }))
const PUBLISHED: Where = { _status: { equals: 'published' } }

export type Kind =
  | { kind: 'post'; doc: Post }
  | { kind: 'project'; doc: Project }
  | { kind: 'service'; doc: Service }
  | { kind: 'page'; doc: Page }
  | { kind: 'category'; doc: Category }

export const getSettings = cache(async (): Promise<SiteSetting> => (await getClient()).findGlobal({ slug: 'site-settings', depth: 0 }))

export const getProjects = cache(async (): Promise<Project[]> =>
  (await getClient()).find({ collection: 'projects', where: PUBLISHED, sort: 'order', limit: 500, depth: 1, select: { contentHtml: false, content: false } }).then((r) => r.docs as Project[]),
)

export const getServices = cache(async (): Promise<Service[]> =>
  (await getClient()).find({ collection: 'services', where: PUBLISHED, sort: 'order', limit: 100, depth: 1, select: { contentHtml: false, content: false } }).then((r) => r.docs as Service[]),
)

export const getCategories = cache(async (): Promise<Category[]> =>
  (await getClient()).find({ collection: 'categories', sort: 'title', limit: 100, depth: 0 }).then((r) => r.docs),
)

export const getProjectCategories = cache(async (): Promise<ProjectCategory[]> =>
  (await getClient()).find({ collection: 'project-categories', limit: 100, depth: 0 }).then((r) => r.docs),
)

/** Danh sách bài (không tải nội dung) — dùng cho thẻ, danh mục, trang chủ */
export const getPosts = cache(async (categoryId?: number, limit = 2000): Promise<Post[]> =>
  (await getClient())
    .find({
      collection: 'posts',
      where: categoryId ? { and: [PUBLISHED, { category: { equals: categoryId } }] } : PUBLISHED,
      sort: '-publishedAt',
      limit,
      depth: 1,
      select: { title: true, slug: true, publishedAt: true, category: true, featuredImage: true, excerpt: true },
    })
    .then((r) => r.docs as Post[]),
)

export const getBySlug = cache(async (slug: string): Promise<Kind | null> => {
  const p = await getClient()
  const one = async <T,>(collection: 'posts' | 'projects' | 'services' | 'pages', where: Where = PUBLISHED) =>
    (await p.find({ collection, where: { and: [where, { slug: { equals: slug } }] }, limit: 1, depth: 2 })).docs[0] as T | undefined
  const page = await one<Page>('pages')
  if (page) return { kind: 'page', doc: page }
  const post = await one<Post>('posts')
  if (post) return { kind: 'post', doc: post }
  const project = await one<Project>('projects')
  if (project) return { kind: 'project', doc: project }
  const service = await one<Service>('services')
  if (service) return { kind: 'service', doc: service }
  const cat = (await p.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]
  if (cat) return { kind: 'category', doc: cat }
  return null
})

export const getAllSlugs = cache(async (): Promise<string[]> => {
  const p = await getClient()
  const out: string[] = []
  for (const collection of ['posts', 'projects', 'services', 'pages'] as const) {
    const r = await p.find({ collection, where: PUBLISHED, limit: 5000, depth: 0, select: { slug: true } })
    out.push(...r.docs.map((d) => (d as { slug: string }).slug))
  }
  const cats = await p.find({ collection: 'categories', limit: 100, depth: 0, select: { slug: true } })
  out.push(...cats.docs.map((d) => d.slug))
  return out
})

/* ---------- ảnh ---------- */
export type Img = { url: string; alt: string; width?: number; height?: number }
export function img(m: number | Media | null | undefined, fallback?: Img): Img | undefined {
  if (m && typeof m === 'object' && m.url) return { url: m.url, alt: m.alt || '', width: m.width ?? undefined, height: m.height ?? undefined }
  return fallback
}
export const FALLBACK_HERO: Img = { url: '/img/bg-thap-hoang-hon.webp', alt: '' }

/* ---------- định dạng ---------- */
export const fmtDate = (iso?: string | null) => {
  if (!iso) return ''
  const d = new Date(iso)
  return new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric' }).format(d).replace(/\//g, '.')
}
export const stripTags = (html?: string | null) => (html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
export const excerptOf = (text?: string | null, html?: string | null, n = 170) => {
  const s = (text && text.trim()) || stripTags(html)
  return s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + '…'
}
export const readingMinutes = (html?: string | null, words?: number) => Math.max(1, Math.round((words ?? stripTags(html).split(' ').length) / 220))
export const catOf = (c: Post['category']) => (c && typeof c === 'object' ? c : undefined)
export const infoValue = (p: Project, label: string) => p.info?.find((r) => r.label.toLowerCase().startsWith(label.toLowerCase()))?.value || ''
export const STATUS_LABEL: Record<string, string> = { ongoing: 'Đang thực hiện', completed: 'Đã hoàn thành' }
export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
