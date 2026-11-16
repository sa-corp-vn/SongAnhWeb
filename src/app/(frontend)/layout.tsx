import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Tinos } from 'next/font/google'
import type { ReactNode } from 'react'
import { SiteRuntime } from '@/components/site/Effects'
import { FixedUI } from '@/components/site/FixedUI'
import { getSettings, siteUrl } from '@/lib/data'
import '@/styles/template.css'
import '@/styles/pages.css'
import '@/styles/app.css'

const sans = Inter_Tight({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600', '700', '800'], variable: '--f-sans', display: 'swap' })
const serif = Tinos({ subsets: ['latin', 'vietnamese'], weight: ['400'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Song Anh — Tổng thầu tư vấn thiết kế', template: '%s' },
  description:
    'Song Anh là đơn vị tư vấn thiết kế và tổng thầu thiết kế các dự án chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị phức hợp trên khắp Việt Nam.',
  icons: {
    icon: [
      { url: '/img/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/img/apple-touch-icon-180.png',
  },
  openGraph: { type: 'website', locale: 'vi_VN', siteName: 'Song Anh', images: ['/img/hero-poster.webp'] },
  ...(process.env.SITE_NOINDEX === '1' ? { robots: { index: false, follow: false } } : {}),
}
export const viewport: Viewport = { themeColor: '#141210' }

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="page-curtain" aria-hidden="true">
          <div className="pc-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mark-metal.png" alt="" />
          </div>
        </div>
        <FixedUI phone={settings.phone || '0969 865 728'} />
        {children}
        <SiteRuntime />
      </body>
    </html>
  )
}
