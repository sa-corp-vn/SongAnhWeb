import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { ReactNode } from 'react'
import { toSlug } from '@/collections/shared'

type Lexical = { root: { children: unknown[] } } | null | undefined
export type TocItem = { id: string; text: string }

const nodeText = (n: unknown): string => {
  const node = n as { text?: string; children?: unknown[] }
  if (typeof node.text === 'string') return node.text
  return (node.children || []).map(nodeText).join('')
}
const hasLexical = (c: Lexical) => Boolean(c?.root?.children?.some((n) => nodeText(n).trim() || (n as { type?: string }).type === 'upload'))

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag
    return <Tag id={toSlug(nodeText(node)).slice(0, 60)}>{nodesToJSX({ nodes: node.children })}</Tag>
  },
})

/** Mục lục từ các tiêu đề H2 */
export function tocOf(content: Lexical, html?: string | null): TocItem[] {
  if (hasLexical(content)) {
    return (content!.root.children as { type?: string; tag?: string }[])
      .filter((n) => n.type === 'heading' && n.tag === 'h2')
      .map((n) => { const text = nodeText(n); return { id: toSlug(text).slice(0, 60), text } })
  }
  const out: TocItem[] = []
  const re = /<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html || ''))) out.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim() })
  return out
}

/** Thân bài: ưu tiên nội dung soạn trong CMS, nếu trống thì dùng HTML chuyển từ website cũ */
export function Prose({ content, html }: { content: Lexical; html?: string | null }) {
  if (hasLexical(content)) {
    return (
      <div className="p-prose">
        <RichText data={content as unknown as SerializedEditorState} converters={converters} disableContainer />
      </div>
    )
  }
  // HTML do quản trị viên soạn trong CMS (nguồn tin cậy)
  return <div className="p-prose" dangerouslySetInnerHTML={{ __html: html || '' }} />
}

export function Aside({ meta, toc }: { meta: ReactNode; toc: TocItem[] }) {
  return (
    <aside className="p-aside">
      <div className="p-aside__inner">
        <div className="p-meta">{meta}</div>
        {toc.length >= 2 && (
          <nav className="p-toc l1" aria-label="Mục lục">
            <p className="l1-t">Mục lục</p>
            <ol>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} data-toc="">
                    {t.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="p-share l1">
          <button type="button" data-copy-link="">
            <span className="wrap" data-text="Sao chép liên kết">
              <span>Sao chép liên kết</span>
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
