import type { CollectionConfig } from 'payload'
import { authenticated, contentFields, publishedOrAuthenticated, revalidate, seoFields, slugField } from './shared'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Dự án', plural: 'Dự án' },
  admin: {
    useAsTitle: 'title',
    group: 'Dự án',
    defaultColumns: ['title', 'shortName', 'status', 'order', '_status'],
    preview: (doc) => (doc?.slug ? `/${doc.slug}` : null),
  },
  defaultSort: 'order',
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: revalidate((doc) => [`/${doc.slug}`, '/project', '/tu-van-thiet-ke']),
  fields: [
    { name: 'title', label: 'Tên dự án', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'shortName', label: 'Tên ngắn (hiện trên thẻ)', type: 'text', required: true },
        { name: 'order', label: 'Thứ tự hiển thị', type: 'number', defaultValue: 100 },
      ],
    },
    { name: 'categories', label: 'Loại dự án', type: 'relationship', relationTo: 'project-categories', hasMany: true },
    { name: 'heroImage', label: 'Ảnh chính', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Thông tin dự án',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  label: 'Trạng thái',
                  type: 'select',
                  options: [
                    { label: 'Đang thực hiện', value: 'ongoing' },
                    { label: 'Đã hoàn thành', value: 'completed' },
                  ],
                },
                { name: 'period', label: 'Thời gian', type: 'text', admin: { placeholder: '09/2025 - Nay' } },
              ],
            },
            {
              name: 'stats',
              label: 'Số liệu nổi bật',
              type: 'array',
              labels: { singular: 'Số liệu', plural: 'Số liệu' },
              fields: [
                { type: 'row', fields: [{ name: 'value', label: 'Giá trị', type: 'text', required: true }, { name: 'label', label: 'Nhãn', type: 'text', required: true }] },
              ],
            },
            {
              name: 'info',
              label: 'Bảng thông tin',
              type: 'array',
              labels: { singular: 'Dòng', plural: 'Dòng' },
              admin: { description: 'Vị trí, Chủ đầu tư, Loại và cấp công trình, Quy mô, Phạm vi Song Anh thực hiện…' },
              fields: [
                { name: 'label', label: 'Mục', type: 'text', required: true },
                { name: 'value', label: 'Nội dung', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Bản đồ',
          fields: [
            {
              name: 'location',
              label: 'Vị trí trên bản đồ',
              type: 'group',
              fields: [
                { name: 'showOnMap', label: 'Hiện trên bản đồ dự án', type: 'checkbox', defaultValue: false },
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', label: 'Vĩ độ', type: 'number' },
                    { name: 'lng', label: 'Kinh độ', type: 'number' },
                    { name: 'province', label: 'Tỉnh / thành', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        { label: 'Nội dung', fields: contentFields() },
      ],
    },
    {
      name: 'featuredOnHome',
      label: 'Hiện ở mục "Dự án tiêu biểu" trang chủ',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Trang chủ hiện 8 dự án đầu tiên theo thứ tự.' },
    },
    seoFields(),
    slugField(),
  ],
}
