import type { CollectionConfig } from 'payload'
import { authenticated, contentFields, publishedOrAuthenticated, revalidate, seoFields, slugField } from './shared'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Dịch vụ', plural: 'Dịch vụ' },
  admin: {
    useAsTitle: 'title',
    group: 'Dịch vụ',
    defaultColumns: ['title', 'order', '_status'],
    preview: (doc) => (doc?.slug ? `/${doc.slug}` : null),
  },
  defaultSort: 'order',
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: revalidate((doc) => [`/${doc.slug}`, '/tu-van-thiet-ke']),
  fields: [
    { name: 'title', label: 'Tên dịch vụ', type: 'text', required: true },
    { name: 'order', label: 'Thứ tự hiển thị', type: 'number', defaultValue: 100 },
    {
      type: 'row',
      fields: [
        { name: 'heroImage', label: 'Ảnh đầu trang', type: 'upload', relationTo: 'media' },
        { name: 'cardImage', label: 'Ảnh trong danh sách', type: 'upload', relationTo: 'media' },
      ],
    },
    ...contentFields(),
    seoFields(),
    slugField(),
  ],
}
