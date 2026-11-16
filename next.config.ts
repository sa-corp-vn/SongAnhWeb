import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  // Docker build đặt NEXT_OUTPUT=standalone để đóng gói gọn; chạy thường (npm start) thì không cần
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' as const } : {}),
  poweredByHeader: false,
  // next dev mặc định sinh AGENTS.md trong dự án — không cần cho website
  agentRules: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/uploads/**' }, { pathname: '/img/**' }],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/(uploads|img|video)/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
    ]
  },
  // Đường dẫn cũ của WordPress → trang tương ứng (giữ thứ hạng tìm kiếm)
  async redirects() {
    return [
      { source: '/project/page/:n', destination: '/project', permanent: true },
      { source: '/:cat(tin-tuc-kien-thuc|kien-thuc-thiet-ke|hoat-dong-song-anh|tuyen-dung)/page/:n', destination: '/:cat', permanent: true },
      { source: '/:cat(chung-cu-cao-tang|khach-san|nha-o-xa-hoi|khu-dan-cu-khu-do-thi)', destination: '/project#:cat', permanent: true },
      { source: '/feed', destination: '/tin-tuc-kien-thuc', permanent: true },
      { source: '/wp-admin', destination: '/admin', permanent: false },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
