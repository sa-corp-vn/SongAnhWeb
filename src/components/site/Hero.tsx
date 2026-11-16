import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Img } from '@/lib/data'

export type Crumb = { href?: string; label: string }

export function Hero({ title, image, crumbs, kicker, lead, footLeft, short, big }: {
  title: string
  image?: Img
  crumbs: Crumb[]
  kicker?: ReactNode
  lead?: string
  footLeft?: ReactNode
  short?: boolean
  big?: boolean
}) {
  const isBig = big ?? title.length <= 24
  const textOnly = !image
  return (
    <section className={`p-hero${short || textOnly ? ' is-short' : ''}${textOnly ? ' is-text' : ''}`} data-ui="white">
      {image && (
        <>
          <div className="p-hero__bg">
            <Image src={image.url} alt="" fill priority sizes="100vw" />
          </div>
          <div className="p-hero__shade" />
        </>
      )}
      <nav className="p-crumbs l1" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="sep">/</span>}
            {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
      <div className="p-hero__inner">
        {kicker && <p className="p-hero__kicker l1">{kicker}</p>}
        <h1 className={`p-hero__title ${isBig ? 'd1' : 'h1'}`} data-split="" data-hero="">
          {title}
        </h1>
        {lead && <p className="p-hero__lead l1">{lead}</p>}
      </div>
      <div className="p-hero__foot l1">
        <span>{footLeft}</span>
        <span>Cuộn xuống ↓</span>
      </div>
    </section>
  )
}
