import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero } from '@/components/site/Hero'
import { SectionHead } from '@/components/site/ui'
import { InnerPage } from '@/components/views/InnerPage'

export const metadata: Metadata = {
  title: 'David Leschinski Ivanov – Design Director Song Anh',
  description:
    'David Leschinski Ivanov — Giám đốc Thiết kế (Design Director) của Song Anh, hơn 15 năm kinh nghiệm quốc tế về kiến trúc và quản lý thiết kế tại Tây Ban Nha, Việt Nam, Campuchia và Thái Lan.',
  alternates: { canonical: '/david-leschinski-ivanov-design-director-song-anh' },
  openGraph: { images: ['/uploads/2026/10/david-anh-chuyen-gia.webp'] },
}

const U = '/uploads/2026/10/'
const AWARDS = [
  { img: 'ho-so-giai-apph-2025.webp', k: '2025 · Giải thưởng', t: 'Asia Pacific Property & Hotel Awards', d: 'Best Hotel Architecture Vietnam – Novotel Phan Thiết (Kume Design Asia).' },
  { img: 'ho-so-giai-vmark-2025.webp', k: '2025 · Giải thưởng', t: 'VMARK Vietnam Design Golden Award', d: 'Best Hospitality Design – Marriott Bình Tiên, chứng nhận trao cho Kume Design Asia.' },
  { img: 'ho-so-design-voices.webp', k: '2024 · Diễn giả', t: 'VMARK Design Week – Design Voices', d: 'Phiên Design Voices về Hospitality và F&B tại The Reverie Saigon.' },
  { img: 'ho-so-art-of-architecture.webp', k: '2025 · Diễn giả', t: 'The Art of Architecture Talkshow', d: 'Trao đổi về lãnh đạo thiết kế và xu hướng phát triển của thị trường khách sạn.' },
]
const STATS = [['23', 'khách sạn 4–6 sao'], ['4,45 triệu', 'm² sàn xây dựng'], ['780 ha', 'đồ án quy hoạch lớn nhất'], ['250+', 'căn villa'], ['4', 'quốc gia triển khai dự án'], ['80+', 'chuyên gia từng dẫn dắt']]
const Item = ({ t, d }: { t: string; d: string }) => (
  <li data-reveal="fade"><span className="l1-t">{t}</span><p className="l1">{d}</p></li>
)

export default function ExpertPage() {
  return (
    <InnerPage>
      <Hero
        title="David Leschinski Ivanov"
        big={false}
        image={{ url: `${U}ho-so-lam-viec-nhom-1.webp`, alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { href: '/gioi-thieu', label: 'Giới thiệu' }, { label: 'David Leschinski Ivanov' }]}
        kicker={<><span className="l1-t">Năng lực chuyên gia</span><span>Giám đốc Thiết kế | Design Director</span></>}
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <div className="split2">
            <figure className="media-wide" data-reveal="fade" style={{ maxWidth: '30rem' }}>
              <Image src={`${U}david-anh-chuyen-gia.webp`} alt="David Leschinski Ivanov — Giám đốc Thiết kế Song Anh" width={1254} height={1254} sizes="(max-width:1023px) 100vw, 30vw" />
            </figure>
            <div>
              <span className="block-name l1-t">Giám đốc Thiết kế | Design Director</span>
              <p className="h1-t" data-split="" data-reveal="" style={{ margin: '1rem 0 2.5rem' }}>
                Hơn 15 năm kinh nghiệm quốc tế trong thiết kế kiến trúc và quản lý thiết kế tại Tây Ban Nha, Việt Nam, Campuchia và Thái Lan.
              </p>
              <div className="p-txt l1" data-reveal="fade">
                <p>David Leschinski Ivanov đảm nhiệm vị trí Design Director tại Công ty Cổ phần Tư vấn Đầu tư Xây dựng Song Anh, với hơn 15 năm kinh nghiệm quốc tế trong lĩnh vực thiết kế kiến trúc và quản lý thiết kế tại Tây Ban Nha, Việt Nam, Campuchia và Thái Lan.</p>
                <p>Chuyên môn của ông tập trung vào khách sạn – nghỉ dưỡng cao cấp, nhà ở, công trình phức hợp và quy hoạch quy mô lớn, xuyên suốt từ concept, quản lý thiết kế, điều phối đa bộ môn đến triển khai kỹ thuật và đưa công trình vào vận hành.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="p-section gray">
          <SectionHead label="Vai trò tại Song Anh" title="Định hướng và kiểm soát chất lượng thiết kế" />
          <div className="split2">
            <div className="p-txt l1" data-reveal="fade">
              <p>Tháng 7/2026, Song Anh chính thức bổ nhiệm ông David Leschinski Ivanov giữ vị trí Design Director – Giám đốc Thiết kế.</p>
              <p>Ông chịu trách nhiệm định hướng và kiểm soát chất lượng thiết kế từ concept đến hoàn thiện hồ sơ, đứng ở cấp độ định hướng tổng thể: định hướng thiết kế, phản biện phương án và điều phối đa bộ môn. Chiều sâu về kết cấu, cơ điện (MEP), BIM do đội ngũ chuyên môn của Song Anh đảm nhiệm.</p>
            </div>
            <figure className="media-wide" data-reveal="fade">
              <Image src={`${U}ho-so-le-bo-nhiem.webp`} alt="Lễ bổ nhiệm Giám đốc Thiết kế Song Anh" width={1400} height={1050} sizes="(max-width:1023px) 100vw, 50vw" />
              <figcaption className="l1-t" style={{ marginTop: '.6rem', textTransform: 'none' }}>Lễ bổ nhiệm ông David Leschinski Ivanov chính thức giữ chức Giám đốc Thiết kế (Design Director) của Song Anh.</figcaption>
            </figure>
          </div>
        </section>
        <section className="p-section">
          <SectionHead label="Trọng tâm" title="Ba yếu tố ông tập trung kiểm soát" />
          <ul className="grid4" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <Item t="Công năng sử dụng" d="Phương án đáp ứng đúng cách công trình được sử dụng và vận hành." />
            <Item t="Giá trị thẩm mỹ kiến trúc" d="Bản sắc riêng, được giữ nhất quán từ ý tưởng đến công trình." />
            <Item t="Tính thống nhất giữa các bộ môn" d="Mọi quyết định cùng phục vụ một mục tiêu chung của Chủ đầu tư." />
          </ul>
        </section>
        <section className="p-section gray">
          <SectionHead label="Giá trị cho Chủ đầu tư" title="Trách nhiệm giải trình rõ ràng hơn ở từng bước thiết kế">
            <p className="l1" style={{ maxWidth: '20rem' }}>Song Anh đồng hành từ thiết kế concept đến triển khai hồ sơ, với vai trò tổng thầu thiết kế đa bộ môn.</p>
          </SectionHead>
          <ul className="grid4">
            <Item t="Concept rõ ràng" d="Định hướng ngay từ giai đoạn đầu, khi khả năng điều chỉnh phương án còn linh hoạt." />
            <Item t="Nhất quán" d="Giữ ý đồ thiết kế xuyên suốt các giai đoạn phát triển và triển khai hồ sơ." />
            <Item t="Gắn với vận hành" d="Tích hợp sớm yêu cầu của các đơn vị vận hành quốc tế, đặc biệt với khách sạn và khu nghỉ dưỡng." />
            <Item t="Phối hợp tốt hơn" d="Thiết kế và kỹ thuật được đánh giá đồng thời về công năng, thẩm mỹ và khả năng triển khai." />
          </ul>
        </section>
        <section className="p-section black" data-ui="white">
          <SectionHead label="Kinh nghiệm nghề nghiệp" title="Năng lực đo bằng khối lượng công việc đã hoàn thành tại bốn quốc gia" />
          <ul className="stats6">
            {STATS.map(([v, l]) => (
              <li data-reveal="fade" key={l}><p className="val">{v}</p><p className="l1">{l}</p></li>
            ))}
          </ul>
        </section>
        <section className="p-section">
          <SectionHead label="Phương pháp thiết kế" title="Cân bằng giữa ý tưởng kiến trúc, nhu cầu thực tế và mục tiêu phát triển của dự án" />
          <ul className="grid4" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <Item t="Lãnh đạo thiết kế và phối hợp" d="Thiết lập mục tiêu và nguyên tắc rõ ràng ngay từ đầu; duy trì trao đổi, phản biện thường xuyên để vấn đề về công năng, trải nghiệm và chất lượng được xử lý sớm." />
            <Item t="Nhất quán từ ý tưởng đến triển khai" d="Concept là nền tảng định hướng cho cả quá trình; các quyết định quan trọng được xác lập từ sớm và kiểm soát khi vào chi tiết, hạn chế thay đổi lớn ảnh hưởng chất lượng công trình." />
            <Item t="Gắn với vận hành và giá trị dài hạn" d="Trải nghiệm khách hàng, yêu cầu của đơn vị vận hành và mục tiêu khai thác của Chủ đầu tư được xem xét ngay trong quá trình thiết kế khách sạn – nghỉ dưỡng." />
          </ul>
        </section>
        <section className="p-section gray">
          <SectionHead label="Ghi nhận" title="Giải thưởng, diễn đàn" />
          <ul className="awards">
            {AWARDS.map((a) => (
              <li className="award" data-reveal="fade" key={a.t}>
                <div className="award__img" style={{ position: 'relative' }}>
                  <Image src={U + a.img} alt={a.t} fill sizes="(max-width:1023px) 100vw, 25vw" />
                </div>
                <span className="l1-t">{a.k}</span>
                <h3 className="h1-t">{a.t}</h3>
                <p className="l1">{a.d}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </InnerPage>
  )
}
