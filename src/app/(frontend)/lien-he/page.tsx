import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { Hero } from '@/components/site/Hero'
import { InnerPage } from '@/components/views/InnerPage'
import { getSettings } from '@/lib/data'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Liên hệ - Song Anh',
  description: 'Liên hệ Công ty CP Tư vấn Đầu tư Xây dựng Song Anh — Tòa nhà Park IX, 08 Phan Đình Giót, P. Tân Sơn Hòa, TP.HCM · 0969 865 728 · tnc@sa-corp.vn',
  alternates: { canonical: '/lien-he' },
}

export default async function ContactPage() {
  const s = await getSettings()
  const tel = (s.phone || '').replace(/\s/g, '')
  return (
    <InnerPage>
      <Hero
        title="Liên hệ"
        image={{ url: '/uploads/2026/10/hero-thap-trang-hien-dai.webp', alt: '' }}
        crumbs={[{ href: '/', label: 'Trang chủ' }, { label: 'Liên hệ' }]}
        kicker={<><span className="l1-t">Thông tin liên hệ</span><span>Song Anh</span></>}
        lead={`${s.address} · ${s.phone} · ${s.email}`}
      />
      <div className="p-sheet" data-ui="black">
        <section className="p-section">
          <span className="block-name l1-t">Thông tin liên hệ</span>
          <p className="h1-t" data-split="" data-reveal="" style={{ marginTop: '1rem', maxWidth: '60rem' }}>
            {s.companyName} — luôn sẵn sàng đồng hành cùng chủ đầu tư từ ý tưởng đến hồ sơ thi công.
          </p>
          <ul className="ct-grid">
            <li data-reveal="fade"><span className="l1-t">Công ty</span><p className="l1">{s.companyName}<br />MSDN: {s.taxCode}</p></li>
            <li data-reveal="fade"><span className="l1-t">Địa chỉ</span><p className="l1"><a href={s.mapUrl || '#'} target="_blank" rel="noopener">{s.address}</a></p></li>
            <li data-reveal="fade"><span className="l1-t">Điện thoại</span><p className="l1"><a href={`tel:${tel}`}>{s.phone}</a></p></li>
            <li data-reveal="fade"><span className="l1-t">Email</span><p className="l1"><a href={`mailto:${s.email}`}>{s.email}</a></p></li>
          </ul>
        </section>
        <section className="contact" id="contact" data-ui="black">
          <h2 className="title d1" data-split="" data-reveal="">Gửi yêu cầu<br />tư vấn</h2>
          <p className="sub-title l1">Chuyên viên Song Anh sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
          <ContactForm />
          <p className="description-text l1-t">
            Khi gửi yêu cầu, bạn đồng ý với <a href="/chinh-sach-bao-mat" className="link">chính sách bảo mật</a> của chúng tôi.
          </p>
        </section>
        <iframe
          className="gmap"
          title="Bản đồ văn phòng Song Anh"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(s.address || '')}&output=embed`}
        />
      </div>
    </InnerPage>
  )
}
