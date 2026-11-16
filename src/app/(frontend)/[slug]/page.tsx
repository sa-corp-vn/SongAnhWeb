import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsListing, PageView, PostView, ProjectView, ServiceView } from '@/components/views/Views'
import { excerptOf, getAllSlugs, getBySlug, img } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true // bài mới đăng sau khi build vẫn hiển thị được

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const found = await getBySlug(decodeURIComponent(slug))
  if (!found) return { title: 'Không tìm thấy trang — Song Anh' }
  if (found.kind === 'category') {
    return { title: `${found.doc.title} - Song Anh`, description: found.doc.description || `${found.doc.title} — Song Anh`, alternates: { canonical: `/${slug}` } }
  }
  const d = found.doc
  const image = found.kind === 'post' ? img(found.doc.featuredImage) : found.kind === 'project' ? img(found.doc.heroImage) : found.kind === 'service' ? img(found.doc.heroImage) : undefined
  const description = excerptOf(d.excerpt, d.contentHtml, 180)
  return {
    title: d.seoTitle || `${d.title} - Song Anh`,
    description,
    alternates: { canonical: `/${d.slug}` },
    openGraph: {
      title: d.seoTitle || d.title,
      description,
      type: found.kind === 'post' ? 'article' : 'website',
      ...(found.kind === 'post' ? { publishedTime: found.doc.publishedAt } : {}),
      ...(image ? { images: [image.url] } : {}),
    },
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const found = await getBySlug(decodeURIComponent(slug))
  if (!found) notFound()
  switch (found.kind) {
    case 'post':
      return <PostView post={found.doc} />
    case 'project':
      return <ProjectView project={found.doc} />
    case 'service':
      return <ServiceView service={found.doc} />
    case 'page':
      return <PageView page={found.doc} />
    case 'category':
      return <NewsListing category={found.doc} />
  }
}
