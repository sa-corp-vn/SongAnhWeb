import { NextResponse } from 'next/server'
import { catOf, excerptOf, getClient, getPosts, getProjects, getServices, img } from '@/lib/data'

export const revalidate = 3600

const thumb = (url?: string) => (url ? `/_next/image?url=${encodeURIComponent(url)}&w=128&q=75` : '')

/** Dữ liệu cho ô tìm kiếm toàn site (tải khi người xem mở tìm kiếm) */
export async function GET() {
  const [posts, projects, services] = await Promise.all([getPosts(), getProjects(), getServices()])
  const payload = await getClient()
  const pages = await payload.find({ collection: 'pages', where: { _status: { equals: 'published' } }, limit: 100, depth: 0, select: { title: true, slug: true } })
  const items = [
    ...posts.map((p) => ({ t: p.title, u: `/${p.slug}`, k: catOf(p.category)?.title || 'Tin tức', d: excerptOf(p.excerpt, null, 140), i: thumb(img(p.featuredImage)?.url), p: p.publishedAt?.slice(0, 10) || '' })),
    ...projects.map((p) => ({ t: p.title, u: `/${p.slug}`, k: 'Dự án', d: excerptOf(p.excerpt, null, 140), i: thumb(img(p.heroImage)?.url), p: '' })),
    ...services.map((s) => ({ t: s.title, u: `/${s.slug}`, k: 'Dịch vụ', d: excerptOf(s.excerpt, null, 140), i: thumb(img(s.cardImage)?.url), p: '' })),
    ...pages.docs.map((p) => ({ t: p.title, u: `/${p.slug}`, k: 'Trang', d: '', i: '', p: '' })),
    ...[
      ['Giới thiệu Song Anh', '/gioi-thieu'],
      ['David Leschinski Ivanov — Giám đốc Thiết kế', '/david-leschinski-ivanov-design-director-song-anh'],
      ['Tư vấn thiết kế', '/tu-van-thiet-ke'],
      ['Các dự án', '/project'],
      ['Tin tức', '/tin-tuc-kien-thuc'],
      ['Liên hệ', '/lien-he'],
    ].map(([t, u]) => ({ t, u, k: 'Trang', d: '', i: '', p: '' })),
  ]
  return NextResponse.json(items, { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600' } })
}
