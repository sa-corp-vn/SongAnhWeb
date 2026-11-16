import type { CollectionConfig } from 'payload'
import { anyone, authenticated, revalidate, slugField } from './shared'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Chuyên mục', plural: 'Chuyên mục tin' },
  admin: { useAsTitle: 'title', group: 'Tin tức', defaultColumns: ['title', 'slug'] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidate((doc) => ['/tin-tuc-kien-thuc', `/${doc.slug}`]),
  fields: [
    { name: 'title', label: 'Tên chuyên mục', type: 'text', required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea' },
    slugField(),
  ],
}

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: { singular: 'Loại dự án', plural: 'Loại dự án' },
  admin: { useAsTitle: 'title', group: 'Dự án', defaultColumns: ['title', 'slug'] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidate(() => ['/project']),
  fields: [{ name: 'title', label: 'Tên loại', type: 'text', required: true }, slugField()],
}
