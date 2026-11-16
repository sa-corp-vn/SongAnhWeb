import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Cố ý dùng <a> thường: src/fx/runtime.js chặn click toàn trang để chuyển trang bằng router của Next
      // (kèm màn che + tải trước), áp dụng được cả cho link trong nội dung HTML lấy từ CMS.
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^(_|ignore)' },
      ],
    },
  },
  {
    ignores: ['.next/', 'media/', 'public/', 'src/payload-types.ts', 'src/payload-generated-schema.ts', 'src/app/(payload)/admin/importMap.js'],
  },
]

export default eslintConfig
