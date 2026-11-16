import Image from 'next/image'
import { NewsCard } from '@/components/site/Cards'
import { ContactForm } from '@/components/site/ContactForm'
import { HomeEffects } from '@/components/site/Effects'
import { Footer } from '@/components/site/Footer'
import { Btn, SectionHead } from '@/components/site/ui'
import { HomeView } from '@/components/home/HomeView'
import { getPosts, getProjects, getSettings, img, infoValue } from '@/lib/data'

export const revalidate = 3600

export default async function HomePage() {
  const [settings, projects, posts] = await Promise.all([getSettings(), getProjects(), getPosts(undefined, 3)])
  const featured = projects.filter((p) => p.featuredOnHome).slice(0, 8)

  const cases = featured.map((p, i) => {
    const im = img(p.heroImage)
    return (
      <article
        key={p.id}
        className={`case ${i < 4 ? 'first-line' : 'second-line'}`}
        tabIndex={0}
        data-case-id={i + 1}
        data-title={p.title}
        data-short={p.shortName}
        data-client={infoValue(p, 'Chủ đầu tư') || 'Đang cập nhật'}
        data-location={infoValue(p, 'Vị trí')}
        data-scale={infoValue(p, 'Quy mô')}
        data-url={`/${p.slug}`}
        data-img={im?.url}
      >
        <div className="wrap-case-img">
          <div className="case-img-in">{im && <Image src={im.url} alt={p.shortName} fill sizes="(max-width:1023px) 50vw, 20vw" />}</div>
        </div>
        <p className="case-name l1">
          <span className="case-counter l1-t">{String(i + 1).padStart(3, '0')}</span> {p.shortName}
        </p>
      </article>
    )
  })
  const caseBgs = featured.map((p, i) => {
    const im = img(p.heroImage)
    return im ? <Image key={p.id} data-case-bg={i + 1} src={im.url} alt="" fill sizes="100vw" /> : null
  })
  const news = (
    <section className="home-news" id="news" data-ui="black">
      <SectionHead label="Tin tức & kiến thức" title="Tin tức">
        <Btn href="/tin-tuc-kien-thuc">Xem tất cả</Btn>
      </SectionHead>
      <div className="n-grid">
        {posts.map((p) => (
          <NewsCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  )
  const contactForm = (
    <>
      <ContactForm withEmail={false} />
      <p className="description-text l1-t">
        Khi gửi yêu cầu, bạn đồng ý với{' '}
        <a href="/chinh-sach-bao-mat" className="link">
          chính sách bảo mật
        </a>{' '}
        của chúng tôi. Thông tin cá nhân của bạn luôn được bảo vệ an toàn.
      </p>
    </>
  )

  return (
    <>
      <HomeView news={news} footer={<Footer settings={settings} />} cases={cases} caseBgs={caseBgs} contactForm={contactForm} />
      <HomeEffects />
    </>
  )
}
