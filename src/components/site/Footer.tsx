import type { SiteSetting } from '@/payload-types'
import { ArrowUpRight, Roll } from './ui'

export function Footer({ settings }: { settings: SiteSetting }) {
  const tel = (settings.phone || '').replace(/\s/g, '')
  return (
    <footer className="footer" id="footer" data-ui="white">
      <div className="footer-logo" id="footerLogo" aria-hidden="true">
        <span className="ui-dot" />
        <span className="logo-3d" data-layers="28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/mark-metal.png" alt="" />
        </span>
      </div>
      <div className="wrap-content">
        <div className="locations-contact">
          <div className="contact-part">
            <p className="name l1-t">TP. Hồ Chí Minh</p>
            <Roll href={`tel:${tel}`} text={settings.phone || ''} />
            <span className="l1-t">Hotline</span>
            <Roll href={`mailto:${settings.email}`} text={settings.email || ''} className="email l1" />
            <a className="l1 addr" href={settings.mapUrl || '#'} target="_blank" rel="noopener">
              {settings.address}
            </a>
            <span className="l1-t js-clock">(--:--:--)</span>
          </div>
          <div className="contact-part">
            <p className="name l1-t">Công ty</p>
            <p className="l1">{settings.companyName}</p>
            <span className="l1-t">MSDN</span>
            <p className="l1">{settings.taxCode}</p>
          </div>
        </div>
        <div className="contact-part">
          <p className="name l1-t">Kết nối</p>
          {(settings.socials || []).map((s) => (
            <Roll key={s.url} href={s.url} text={s.label} external />
          ))}
        </div>
        <div className="contact-part">
          <p className="name l1-t">Pháp lý</p>
          <Roll href="/chinh-sach-bao-mat" text="Chính sách bảo mật" />
          <Roll href="/tuyen-dung" text="Tuyển dụng" />
          <p className="all-rights l1">© {new Date().getFullYear()} Song Anh. Bảo lưu mọi quyền.</p>
        </div>
        <a className="site-link l1" href="/lien-he">
          <span className="wrap" data-text="Liên hệ">
            <span>Liên hệ</span>
          </span>
          <ArrowUpRight />
        </a>
      </div>
    </footer>
  )
}
