import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero } from '@/components/site/Hero'
import { Btn, SectionHead } from '@/components/site/ui'
import { Yt } from '@/components/site/Yt'
import { InnerPage } from '@/components/views/InnerPage'

export const metadata: Metadata = {
  title: 'Giới thiệu - Song Anh',
  description:
    'Công ty Cổ phần Tư vấn Đầu tư Xây dựng Song Anh — đơn vị tư vấn thiết kế và tổng thầu thiết kế các dự án chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị phức hợp.',
  alternates: { canonical: '/gioi-thieu' },
}

const U = '/uploads/2026/10/'
const CARDS = [
  { img: 'gioi-thieu-tam-nhin.webp', t: 'Tầm nhìn', d: 'Trở thành đơn vị tư vấn thiết kế và tổng thầu thiết kế hàng đầu Việt Nam, được chủ đầu tư tin tưởng nhờ chất lượng hồ sơ, tiến độ và năng lực ứng dụng BIM.' },
  { img: 'gioi-thieu-su-menh.webp', t: 'Sứ mệnh', d: 'Đồng hành cùng chủ đầu tư tạo ra những công trình tối ưu công năng, an toàn, bền vững và hiệu quả đầu tư, từ ý tưởng đến thi công.' },
  { img: 'gioi-thieu-gia-tri-cot-loi.webp', t: 'Giá trị cốt lõi', d: 'Chuyên nghiệp, minh bạch, sáng tạo và trách nhiệm. Mỗi dự án là một cam kết về chất lượng và uy tín của Song Anh.' },
]
const TIMELINE = [
  { y: '2014', t: 'Thành lập', d: 'Song Anh được thành lập với định hướng tư vấn thiết kế xây dựng.' },
  { y: '2018', t: 'Mở rộng quy mô', d: 'Mở rộng đội ngũ và lĩnh vực, tham gia các dự án chung cư và khách sạn quy mô lớn.' },
  { y: '2020', t: 'Ứng dụng BIM', d: 'Triển khai BIM xuyên suốt các giai đoạn thiết kế, nâng cao chất lượng hồ sơ.' },
  { y: 'Nay', t: 'Tổng thầu thiết kế', d: 'Tổng thầu thiết kế kiến trúc, kết cấu, cơ điện cho nhiều dự án trên cả nước.' },
]
const FIELDS = [
  ['Thiết kế concept', 'Định hình ý tưởng và phương án quy hoạch, kiến trúc ban đầu.'],
  ['Tổng thầu thiết kế kiến trúc, kết cấu, cơ điện & PCCC', 'Trọn gói hồ sơ thiết kế các bộ môn.'],
  ['Thiết kế cảnh quan, hạ tầng kỹ thuật', 'Hoàn thiện không gian ngoại thất và hạ tầng đồng bộ.'],
  ['Lập tổng dự toán & kiểm soát chi phí đầu tư', 'Kiểm soát chi phí xuyên suốt vòng đời dự án.'],
  ['Tối ưu hóa thiết kế', 'Tối ưu công năng, kết cấu và chi phí xây dựng.'],
]

export default function AboutPage() {
  return (
    <InnerPage>
      <Hero
        title="Kiến tạo giá trị thực — Bền vững — Khác biệt"
        big={false}
        image={{ url: `${U}gioi-thieu-tam-nhin.webp`, alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { label: 'Giới thiệu' }]}
        kicker={<><span className="l1-t">Giới thiệu</span><span>Công ty Cổ phần Tư vấn Đầu tư Xây dựng Song Anh</span></>}
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <span className="block-name l1-t">Về chúng tôi</span>
          <p className="h1-t intro-big" data-split="" data-reveal="" style={{ marginTop: '1rem' }}>
            Song Anh là đơn vị tư vấn thiết kế và tổng thầu thiết kế các dự án chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị phức hợp trên khắp Việt Nam.
          </p>
          <div className="split2" style={{ marginTop: '4rem' }}>
            <div />
            <div className="p-txt l1" data-reveal="fade">
              <p>Với đội ngũ chuyên gia giàu kinh nghiệm cùng quy trình ứng dụng BIM xuyên suốt từ concept đến hồ sơ thi công, chúng tôi đồng hành cùng chủ đầu tư để kiến tạo những công trình có giá trị thực, bền vững và khác biệt.</p>
            </div>
          </div>
        </section>
        <section className="p-section" style={{ paddingTop: 0 }}>
          <div className="split2">
            <div data-reveal="fade"><Yt id="dvDykFyR76c" label="Khám phá Song Anh qua video" /></div>
            <div data-reveal="fade"><Yt id="kFzuTL-9PLA" label="Về chúng tôi — Song Anh" /></div>
          </div>
        </section>
        <section className="p-section gray">
          <SectionHead label="Kim chỉ nam cho mọi hành động và quyết định của chúng tôi" title="Tầm nhìn — Sứ mệnh — Giá trị cốt lõi" />
          <div className="cards3">
            {CARDS.map((c) => (
              <div className="card3" data-reveal="fade" key={c.t}>
                <div className="card3__img" style={{ position: 'relative' }}>
                  <Image src={U + c.img} alt={`${c.t} Song Anh`} fill sizes="(max-width:1023px) 100vw, 33vw" />
                </div>
                <h3 className="h1-t" style={{ fontSize: '2rem' }}>{c.t}</h3>
                <p className="l1">{c.d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="p-section black" data-ui="white">
          <SectionHead label="Hành trình" title="Lịch sử hình thành và mốc phát triển" />
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li data-reveal="fade" key={t.y}><p className="yr">{t.y}</p><span className="l1-t">{t.t}</span><p className="l1">{t.d}</p></li>
            ))}
          </ol>
        </section>
        <section className="p-section">
          <SectionHead label="Lĩnh vực" title="Chúng tôi hoạt động trong nhiều lĩnh vực chuyên môn" />
          <ul className="fields">
            {FIELDS.map(([t, d], i) => (
              <li data-reveal="fade" key={t}><span className="l1-t">{String(i + 1).padStart(2, '0')}</span><p className="h1">{t}</p><p className="l1">{d}</p></li>
            ))}
          </ul>
        </section>
        <section className="p-section gray">
          <SectionHead label="Đội ngũ" title="Đội ngũ Song Anh — nền tảng của thành công" />
          <div className="split2">
            <div className="p-txt l1" data-reveal="fade">
              <p>Song Anh sở hữu đội ngũ kiến trúc sư, kỹ sư kết cấu, cơ điện và chuyên viên BIM giàu kinh nghiệm, được tổ chức theo mô hình chuyên môn hóa theo bộ môn.</p>
              <p>Sự phối hợp chặt chẽ giữa các bộ môn trên mô hình BIM giúp phát hiện sớm xung đột, rút ngắn thời gian thiết kế và đảm bảo chất lượng hồ sơ.</p>
              <p style={{ marginTop: '2rem' }}><Btn href="/david-leschinski-ivanov-design-director-song-anh">Năng lực chuyên gia</Btn></p>
            </div>
            <figure className="media-wide" data-reveal="fade">
              <Image src={`${U}gioi-thieu-so-do-to-chuc.webp`} alt="Sơ đồ tổ chức Song Anh" width={1400} height={985} sizes="(max-width:1023px) 100vw, 50vw" />
            </figure>
          </div>
        </section>
      </div>
    </InnerPage>
  )
}
