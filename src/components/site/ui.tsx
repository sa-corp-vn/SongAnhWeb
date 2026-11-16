import type { ReactNode } from 'react'

export const ArrowUpRight = () => (
  <svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true">
    <path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
export const ArrowRight = ({ left }: { left?: boolean }) => (
  <svg className={`arrow${left ? ' to-left' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)
export const SearchIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/** Nút viền tròn với hiệu ứng chữ cuộn (theo template) */
export function Btn({ href, children, light, className = '', type, external }: { href?: string; children: ReactNode; light?: boolean; className?: string; type?: 'submit' | 'button'; external?: boolean }) {
  const inner = (
    <>
      <span className="wrap-text l1 hidden">{children}</span>
      <span className="wrap-text l1 hover">{children}</span>
      <span className="btn-hover-bg" />
    </>
  )
  const cls = `btn${light ? ' light' : ''} ${className}`.trim()
  if (href) {
    return (
      <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} type={type || 'button'}>
      {inner}
    </button>
  )
}

/** Link chữ cuộn lên khi rê chuột */
export function Roll({ href, text, className = 'l1', external }: { href: string; text: string; className?: string; external?: boolean }) {
  return (
    <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      <span className="wrap" data-text={text}>
        <span>{text}</span>
      </span>
    </a>
  )
}

export function SectionHead({ label, title, children, serif }: { label: string; title: string; children?: ReactNode; serif?: boolean }) {
  return (
    <div className="p-head">
      <div>
        <span className="block-name l1-t">{label}</span>
        <h2 className={serif ? 'h1-t' : 'h1'} data-split="" data-reveal="">
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}
