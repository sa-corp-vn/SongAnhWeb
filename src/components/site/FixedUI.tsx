'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, SearchIcon } from './ui'

export const NAV = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/david-leschinski-ivanov-design-director-song-anh', label: 'Chuyên gia' },
  { href: '/tu-van-thiet-ke', label: 'Dịch vụ' },
  { href: '/project', label: 'Dự án' },
  { href: '/tin-tuc-kien-thuc', label: 'Tin tức' },
  { href: '/tuyen-dung', label: 'Tuyển dụng' },
  { href: '/lien-he', label: 'Liên hệ' },
]

type SAWindow = Window & { SA?: { setNav?: (o: boolean) => void; footerNavOpen?: boolean } }

/** Thanh điều hướng cố định của template: menu trái, "Trao đổi ngay" phải, logo 3D góc dưới */
export function FixedUI({ phone }: { phone: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const isHome = pathname === '/'

  useEffect(() => {
    const w = window as SAWindow
    w.SA = w.SA || {}
    w.SA.setNav = (o: boolean) => setOpen(o)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !w.SA?.footerNavOpen) setOpen(false) }
    const onClick = (e: MouseEvent) => {
      if (!w.SA?.footerNavOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [])

  const current = (href: string) => (href === '/' ? isHome : pathname === href || pathname.startsWith(href + '/'))

  return (
    <div className="fixed-ui" id="fixedUi">
      <div className="ui-left">
        <nav ref={menuRef} className={`navigation-menu l1 ui-anim${open ? ' active' : ''}`} id="navMenu" aria-label="Điều hướng chính">
          <button className="nav-name" id="navToggle" aria-expanded={open} aria-controls="navList" onClick={() => setOpen((o) => !o)}>
            Điều hướng
          </button>
          <button className="ui-search" type="button" data-search-open="" aria-label="Tìm kiếm">
            <SearchIcon />
            <span>Tìm kiếm</span>
          </button>
          <ul className="nav-list" id="navList">
            {NAV.map((n, k) => (
              <li key={n.href}>
                <a className={`l1${k ? ` n${k + 1}` : ''}${current(n.href) ? ' is-current' : ''}`} href={n.href} tabIndex={open ? 0 : -1} aria-current={current(n.href) ? 'page' : undefined}>
                  <sup>[ {k + 1} ]</sup>
                  <span className="wrap-item">
                    <span>{n.label}</span>
                    <span aria-hidden="true">{n.label}</span>
                  </span>
                </a>
              </li>
            ))}
            {phone && (
              <li className="nav-tel">
                <a className="l1 n9" href={`tel:${phone.replace(/\s/g, '')}`} tabIndex={open ? 0 : -1} aria-label={`Gọi hotline ${phone}`}>
                  <span className="l1-t">Hotline</span>
                  <span className="wrap-item">
                    <span>{phone}</span>
                    <span aria-hidden="true">{phone}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="ui-right">
        <a className="lets-discuss l1 ui-anim" href={isHome ? '#contact' : '/lien-he'}>
          <span className="wrap-anim-btn">
            <span>Trao đổi ngay</span>
            <ArrowUpRight />
          </span>
          <span className="wrap-anim-btn" aria-hidden="true">
            <span>Trao đổi ngay</span>
            <ArrowUpRight />
          </span>
        </a>
      </div>
      <a className="ui-logo" href="/" aria-label="Song Anh — trang chủ">
        <span className="ui-dot" />
        <span className="logo-3d spin" data-layers="10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/mark-metal.png" alt="" />
        </span>
      </a>
    </div>
  )
}
