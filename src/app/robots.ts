import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  // SITE_NOINDEX=1 (bản chạy thử, vd. *.netlify.app): chặn máy tìm kiếm để không trùng nội dung với sa-corp.vn
  if (process.env.SITE_NOINDEX === '1') return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
