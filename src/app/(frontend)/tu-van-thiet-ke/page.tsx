import type { Metadata } from 'next'
import { Hero } from '@/components/site/Hero'
import { SvcRows } from '@/components/site/SvcRows'
import { SectionHead } from '@/components/site/ui'
import { InnerPage } from '@/components/views/InnerPage'
import { getServices } from '@/lib/data'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Tư vấn thiết kế - Song Anh',
  description: 'Dịch vụ tư vấn thiết kế của Song Anh: concept, kiến trúc, kết cấu, cơ điện MEPF, nội thất, cảnh quan, hạ tầng, dự toán, thẩm tra và tối ưu hóa thiết kế.',
  alternates: { canonical: '/tu-van-thiet-ke' },
}

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <InnerPage>
      <Hero
        title="Tư vấn thiết kế"
        image={{ url: '/uploads/2026/10/hero-thap-cao-tang-hoang-hon.webp', alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { label: 'Tư vấn thiết kế' }]}
        kicker={<><span className="l1-t">Dịch vụ</span><span>{services.length} lĩnh vực</span></>}
        lead="Song Anh là tổng thầu tư vấn thiết kế kiến trúc, kết cấu, cơ điện cho các dự án chung cư, khách sạn và khu đô thị trên khắp Việt Nam."
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <SectionHead label="Tư vấn thiết kế" title="Trọn gói hồ sơ thiết kế các bộ môn — từ ý tưởng concept đến dự toán, thẩm tra và tối ưu hóa." serif />
          <SvcRows services={services} />
        </section>
      </div>
    </InnerPage>
  )
}
