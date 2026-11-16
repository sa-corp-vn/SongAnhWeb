import type { CollectionConfig } from 'payload'
import { authenticated, contentFields, publishedOrAuthenticated, revalidate, seoFields, slugField } from './shared'

/** Trang văn bản đơn giản (chính sách bảo mật, điều khoản…) */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Trang', plural: 'Trang văn bản' },
  admin: { useAsTitle: 'title', group: 'Nội dung', defaultColumns: ['title', 'slug', '_status'], preview: (doc) => (doc?.slug ? `/${doc.slug}` : null) },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: revalidate((doc) => [`/${doc.slug}`]),
  fields: [{ name: 'title', label: 'Tiêu đề', type: 'text', required: true }, ...contentFields(), seoFields(), slugField()],
}
