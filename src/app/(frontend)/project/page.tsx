import type { Metadata } from 'next'
import { ProjectCard } from '@/components/site/Cards'
import { Hero } from '@/components/site/Hero'
import { ProjectsMap, type MapItem } from '@/components/site/ProjectsMap'
import { SectionHead } from '@/components/site/ui'
import { InnerPage } from '@/components/views/InnerPage'
import { getProjectCategories, getProjects, img, STATUS_LABEL } from '@/lib/data'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Các dự án - Song Anh',
  description: 'Dự án tiêu biểu của Song Anh: chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị trên khắp Việt Nam.',
  alternates: { canonical: '/project' },
}

export default async function ProjectsPage() {
  const [projects, cats] = await Promise.all([getProjects(), getProjectCategories()])
  const counts = cats
    .map((c) => ({ c, n: projects.filter((p) => (p.categories || []).some((x) => (typeof x === 'object' ? x.id : x) === c.id)).length }))
    .filter((x) => x.n > 0)
  const mapItems: MapItem[] = projects
    .filter((p) => p.location?.showOnMap && p.location.lat != null && p.location.lng != null)
    .map((p) => ({
      t: p.shortName, u: `/${p.slug}`, lat: p.location!.lat!, lng: p.location!.lng!,
      img: img(p.heroImage)?.url, p: p.location?.province || '', s: p.status ? STATUS_LABEL[p.status] : '',
    }))
  return (
    <InnerPage>
      <Hero
        title="Các dự án"
        image={{ url: '/uploads/2026/10/hero-khu-nghi-duong-ven-bien.webp', alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { label: 'Các dự án' }]}
        kicker={<><span className="l1-t">Dự án</span><span>{projects.length} công trình</span></>}
        lead="Chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị — từ Hải Phòng đến Phú Quốc."
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <div className="tabs-bar" role="tablist" id="pjTabs">
            <button className="l1 active" data-filter="*">Tất cả<sup>{projects.length}</sup></button>
            {counts.map(({ c, n }) => (
              <button key={c.id} className="l1" data-filter={c.slug}>{c.title}<sup>{n}</sup></button>
            ))}
          </div>
          <div className="pj-grid" id="pjGrid">
            {projects.map((p, k) => <ProjectCard key={p.id} project={p} index={k + 1} />)}
          </div>
        </section>
        <section className="p-section black" id="ban-do" data-ui="white">
          <SectionHead label="Bản đồ" title="Địa điểm dự án" />
          <ProjectsMap items={mapItems} />
        </section>
      </div>
    </InnerPage>
  )
}
