import Image from 'next/image'
import type { Category, Post, Project } from '@/payload-types'
import { catOf, fmtDate, img, infoValue } from '@/lib/data'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const im = img(project.heroImage)
  const cats = (project.categories || []).map((c) => (typeof c === 'object' ? c.slug : '')).join(' ')
  const client = infoValue(project, 'Chủ đầu tư')
  return (
    <a className="pj-card" href={`/${project.slug}`} data-cats={cats} data-reveal="fade">
      <div className="pj-card__img">
        {im && <Image src={im.url} alt={project.title} fill sizes="(max-width:1023px) 50vw, 25vw" />}
      </div>
      <p className="pj-card__name l1">
        <span className="case-counter l1-t">{String(index).padStart(3, '0')}</span>
        {project.shortName}
      </p>
      {client && <p className="pj-card__client l1-t">{client}</p>}
    </a>
  )
}

export function NewsCard({ post, hidden, priority }: { post: Post; hidden?: boolean; priority?: boolean }) {
  const im = img(post.featuredImage)
  const cat = catOf(post.category) as Category | undefined
  return (
    <a className={`n-card${hidden ? ' is-hidden' : ''}`} href={`/${post.slug}`}>
      <div className="n-card__img">
        {im && <Image src={im.url} alt="" fill sizes="(max-width:1023px) 100vw, 33vw" priority={priority} />}
      </div>
      <p className="n-card__meta l1">
        <span className="l1-t">{cat?.title || 'Tin tức'}</span>
        <span>{fmtDate(post.publishedAt)}</span>
      </p>
      <h3 className="n-card__title">{post.title}</h3>
    </a>
  )
}
