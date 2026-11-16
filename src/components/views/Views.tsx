import Image from 'next/image'
import type { Category, Page, Post, Project, Service } from '@/payload-types'
import { NewsCard, ProjectCard } from '@/components/site/Cards'
import { Hero } from '@/components/site/Hero'
import { Aside, Prose, tocOf } from '@/components/site/Prose'
import { SvcRows } from '@/components/site/SvcRows'
import { Btn, SectionHead } from '@/components/site/ui'
import { catOf, excerptOf, FALLBACK_HERO, fmtDate, getCategories, getPosts, getProjects, getServices, img, infoValue, readingMinutes, STATUS_LABEL } from '@/lib/data'
import { InnerPage } from './InnerPage'

/* ---------------- bài viết ---------------- */
export async function PostView({ post }: { post: Post }) {
  const cat = catOf(post.category) as Category | undefined
  const siblings = await getPosts(cat?.id)
  const idx = siblings.findIndex((p) => p.id === post.id)
  const prev = idx >= 0 ? siblings[idx + 1] : undefined
  const next = idx > 0 ? siblings[idx - 1] : undefined
  const related = siblings.filter((p) => p.id !== post.id).slice(0, 3)
  const cover = img(post.featuredImage)
  const mins = readingMinutes(post.contentHtml)
  const date = fmtDate(post.publishedAt)
  return (
    <InnerPage>
      <Hero
        title={post.title}
        big={false}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { href: '/tin-tuc-kien-thuc', label: 'Tin tức' }, ...(cat ? [{ href: `/${cat.slug}`, label: cat.title }] : [])]}
        kicker={<><span className="l1-t">{cat?.title}</span><span>{date}</span></>}
        footLeft={`${mins} phút đọc`}
      />
      <div className="p-sheet" data-ui="black">
        {cover && (
          <figure className="p-cover" data-reveal="fade">
            <Image src={cover.url} alt={post.title} width={cover.width || 1400} height={cover.height || 788} sizes="(max-width:1023px) 100vw, 70vw" priority />
          </figure>
        )}
        <article className="p-article">
          <Aside meta={<><p className="l1-t">{cat?.title}</p><p className="l1">{date} · {mins} phút đọc</p></>} toc={tocOf(post.content, post.contentHtml)} />
          <Prose content={post.content} html={post.contentHtml} />
        </article>
        {(prev || next) && (
          <nav className="p-pager" aria-label="Bài viết khác">
            {prev ? <a href={`/${prev.slug}`}><span className="l1">← Bài trước</span><span className="h1-t">{prev.title}</span></a> : <span />}
            {next ? <a href={`/${next.slug}`}><span className="l1">Bài tiếp →</span><span className="h1-t">{next.title}</span></a> : <span />}
          </nav>
        )}
      </div>
      {related.length > 0 && (
        <section className="p-section gray" data-ui="black">
          <SectionHead label="Đọc thêm" title="Bài viết liên quan">
            <Btn href={cat ? `/${cat.slug}` : '/tin-tuc-kien-thuc'}>Xem tất cả</Btn>
          </SectionHead>
          <div className="n-grid">{related.map((p) => <NewsCard key={p.id} post={p} />)}</div>
        </section>
      )}
    </InnerPage>
  )
}

/* ---------------- dự án ---------------- */
export async function ProjectView({ project }: { project: Project }) {
  const all = await getProjects()
  const cats = (project.categories || []).filter((c): c is Exclude<typeof c, number> => typeof c === 'object')
  const catIds = new Set(cats.map((c) => c.id))
  const same = all.filter((p) => p.id !== project.id && (p.categories || []).some((c) => catIds.has(typeof c === 'object' ? c.id : c)))
  const related = [...same, ...all.filter((p) => p.id !== project.id && !same.includes(p))].slice(0, 4)
  const status = project.status ? STATUS_LABEL[project.status] : ''
  const clabel = cats[0]?.title || 'Dự án'
  return (
    <InnerPage>
      <Hero
        title={project.title}
        big={false}
        image={img(project.heroImage, FALLBACK_HERO)}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { href: '/project', label: 'Các dự án' }, { label: project.shortName }]}
        kicker={<><span className="l1-t">Dự án</span><span>{clabel}</span></>}
        footLeft={infoValue(project, 'Vị trí')}
      />
      <div className="p-sheet">
        {(project.stats?.length || project.info?.length) ? (
          <section className="pj-info" data-ui="white">
            {(status || project.period) && (
              <div className="pj-state l1">
                {status && <span className="pj-chip">{status}</span>}
                <span>{project.period}</span>
              </div>
            )}
            {!!project.stats?.length && (
              <div className="pj-stats">
                {project.stats.map((s) => (
                  <div className="pj-stat" key={s.id || s.label}><p className="val">{s.value}</p><p className="lab l1">{s.label}</p></div>
                ))}
              </div>
            )}
            <ul className="pj-rows">
              {(project.info || []).map((r) => (
                <li key={r.id || r.label}><span className="l1-t">{r.label}</span><p className="l1">{r.value}</p></li>
              ))}
            </ul>
          </section>
        ) : null}
        <article className="p-article" data-ui="black">
          <Aside meta={<><p className="l1-t">{clabel}</p><p className="l1">{status}</p></>} toc={tocOf(project.content, project.contentHtml)} />
          <Prose content={project.content} html={project.contentHtml} />
        </article>
      </div>
      <section className="p-section gray" data-ui="black">
        <SectionHead label="Dự án" title="Dự án liên quan">
          <Btn href="/project">Tất cả dự án</Btn>
        </SectionHead>
        <div className="pj-grid">{related.map((p) => <ProjectCard key={p.id} project={p} index={all.indexOf(p) + 1} />)}</div>
      </section>
    </InnerPage>
  )
}

/* ---------------- dịch vụ ---------------- */
export async function ServiceView({ service }: { service: Service }) {
  const [services, projects] = await Promise.all([getServices(), getProjects()])
  return (
    <InnerPage>
      <Hero
        title={service.title}
        image={img(service.heroImage, FALLBACK_HERO)}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { href: '/tu-van-thiet-ke', label: 'Tư vấn thiết kế' }, { label: service.title }]}
        kicker={<><span className="l1-t">Dịch vụ</span><span>Tư vấn thiết kế</span></>}
        lead={excerptOf(service.excerpt, service.contentHtml, 200)}
      />
      <div className="p-sheet" data-ui="black">
        <article className="p-article">
          <Aside meta={<><p className="l1-t">Tư vấn thiết kế</p><p className="l1">Song Anh — tổng thầu thiết kế đa bộ môn</p></>} toc={tocOf(service.content, service.contentHtml)} />
          <Prose content={service.content} html={service.contentHtml} />
        </article>
      </div>
      <section className="p-section gray" data-ui="black">
        <SectionHead label="Dự án" title="Dự án tiêu biểu">
          <Btn href="/project">Tất cả dự án</Btn>
        </SectionHead>
        <div className="pj-grid">{projects.slice(0, 4).map((p, k) => <ProjectCard key={p.id} project={p} index={k + 1} />)}</div>
      </section>
      <section className="p-section" data-ui="black">
        <SectionHead label="Dịch vụ" title="Dịch vụ khác" />
        <SvcRows services={services.filter((s) => s.id !== service.id)} />
      </section>
    </InnerPage>
  )
}

/* ---------------- trang văn bản ---------------- */
export async function PageView({ page }: { page: Page }) {
  return (
    <InnerPage>
      <Hero title={page.title} short image={{ url: '/img/bg-thap-trang.webp', alt: '' }} crumbs={[{ href: '/', label: 'Trang chủ' }, { label: page.title }]} kicker={<span className="l1-t">Song Anh</span>} />
      <div className="p-sheet" data-ui="black">
        <article className="p-article">
          <Prose content={page.content} html={page.contentHtml} />
        </article>
      </div>
    </InnerPage>
  )
}

/* ---------------- danh sách tin ---------------- */
const PER = 18
export async function NewsListing({ category }: { category?: Category }) {
  const [cats, posts, all] = await Promise.all([getCategories(), getPosts(category?.id), category ? getPosts() : Promise.resolve(null)])
  const total = (all || posts).length
  const counts = await Promise.all(cats.map(async (c) => ({ c, n: (await getPosts(c.id)).length })))
  const title = category?.title || 'Tin tức'
  return (
    <InnerPage>
      <Hero
        title={title}
        image={{ url: '/uploads/2026/10/gioi-thieu-tam-nhin.webp', alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, ...(category ? [{ href: '/tin-tuc-kien-thuc', label: 'Tin tức' }] : []), { label: title }]}
        kicker={<><span className="l1-t">{category ? 'Chuyên mục' : 'Tin tức & kiến thức'}</span><span>{posts.length} bài viết</span></>}
        lead={category?.description || undefined}
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <div className="tabs-bar">
            <a className="l1" href="/tin-tuc-kien-thuc" aria-current={!category ? 'page' : undefined}>Tất cả<sup>{total}</sup></a>
            {counts.map(({ c, n }) => (
              <a key={c.id} className="l1" href={`/${c.slug}`} aria-current={category?.id === c.id ? 'page' : undefined}>{c.title}<sup>{n}</sup></a>
            ))}
          </div>
          <div className="n-grid" id="nGrid">
            {posts.map((p, k) => <NewsCard key={p.id} post={p} hidden={k >= PER} priority={k < 3} />)}
          </div>
          {posts.length > PER && (
            <>
              <div className="n-more">
                <button className="btn" type="button" data-more={PER}>
                  <span className="wrap-text l1 hidden">Xem thêm</span>
                  <span className="wrap-text l1 hover">Xem thêm</span>
                  <span className="btn-hover-bg" />
                </button>
              </div>
              <p className="n-count l1"><span className="js-shown">{PER}</span> / {posts.length} bài viết</p>
            </>
          )}
        </section>
      </div>
    </InnerPage>
  )
}
