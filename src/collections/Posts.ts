import type { CollectionConfig } from 'payload'
import { authenticated, contentFields, publishedOrAuthenticated, revalidate, seoFields, slugField } from './shared'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Bài viết', plural: 'Bài viết' },
  admin: {
    useAsTitle: 'title',
    group: 'Tin tức',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => (doc?.slug ? `/${doc.slug}` : null),
  },
  defaultSort: '-publishedAt',
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: revalidate((doc) => [`/${doc.slug}`, '/tin-tuc-kien-thuc', '/kien-thuc-thiet-ke', '/hoat-dong-song-anh', '/tuyen-dung']),
  fields: [
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'category', label: 'Chuyên mục', type: 'relationship', relationTo: 'categories', required: true },
        {
          name: 'publishedAt',
          label: 'Ngày đăng',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: { date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' } },
        },
      ],
    },
    { name: 'featuredImage', label: 'Ảnh đại diện', type: 'upload', relationTo: 'media' },
    ...contentFields(),
    seoFields(),
    slugField(),
  ],
}
