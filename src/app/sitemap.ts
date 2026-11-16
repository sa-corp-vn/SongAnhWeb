import type { MetadataRoute } from 'next'
import { getCategories, getClient, getPosts, getProjects, getServices, siteUrl } from '@/lib/data'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const [posts, projects, services, cats] = await Promise.all([getPosts(), getProjects(), getServices(), getCategories()])
  const pages = await (await getClient()).find({ collection: 'pages', where: { _status: { equals: 'published' } }, limit: 100, depth: 0, select: { slug: true, updatedAt: true } })
  const fixed = ['', '/gioi-thieu', '/david-leschinski-ivanov-design-director-song-anh', '/tu-van-thiet-ke', '/project', '/tin-tuc-kien-thuc', '/lien-he']
  return [
    ...fixed.map((p) => ({ url: `${base}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 })),
    ...cats.map((c) => ({ url: `${base}/${c.slug}`, changeFrequency: 'daily' as const, priority: 0.6 })),
    ...services.map((s) => ({ url: `${base}/${s.slug}`, lastModified: s.updatedAt, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.updatedAt, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.publishedAt, priority: 0.6 })),
    ...pages.docs.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.updatedAt, priority: 0.3 })),
  ]
}
