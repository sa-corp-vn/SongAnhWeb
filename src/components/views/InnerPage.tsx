import type { ReactNode } from 'react'
import { InnerEffects } from '@/components/site/Effects'
import { Footer } from '@/components/site/Footer'
import { getSettings } from '@/lib/data'

/** Khung chung cho mọi trang con: nội dung + footer + hiệu ứng */
export async function InnerPage({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <main className="page page-inner" id="top">
        {children}
        <Footer settings={settings} />
      </main>
      <InnerEffects />
    </>
  )
}
