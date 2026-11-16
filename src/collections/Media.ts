import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from './shared'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Ảnh', plural: 'Thư viện ảnh' },
  admin: { group: 'Nội dung', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'alt', label: 'Mô tả ảnh (alt)', type: 'text', required: true, admin: { description: 'Mô tả ngắn nội dung ảnh — tốt cho Google và người khiếm thị.' } },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
  },
}
