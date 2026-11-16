import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { vi } from '@payloadcms/translations/languages/vi'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Categories, ProjectCategories } from './collections/Taxonomies'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Email chỉ bật khi có cấu hình SMTP trong .env
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_USER || 'no-reply@sa-corp.vn',
      defaultFromName: 'Website Song Anh',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  // Không đặt serverURL: URL ảnh giữ dạng tương đối (/api/media/file/...) để next/image tối ưu được
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Song Anh CMS', icons: [{ rel: 'icon', type: 'image/png', url: '/img/favicon-32.png' }] },
    components: {
      graphics: { Logo: '/components/admin/Brand#Logo', Icon: '/components/admin/Brand#Icon' },
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
  },
  i18n: { supportedLanguages: { vi, en }, fallbackLanguage: 'vi' },
  collections: [Posts, Categories, Projects, ProjectCategories, Services, Pages, Media, ContactSubmissions, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./data/sa.db' } }),
  email,
  sharp,
  plugins: [],
})
