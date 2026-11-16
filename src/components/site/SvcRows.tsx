import type { Service } from '@/payload-types'
import { excerptOf, img } from '@/lib/data'
import { ArrowRight } from './ui'

/** Danh sách dịch vụ dạng hàng, ảnh nổi theo con trỏ */
export function SvcRows({ services, start = 1 }: { services: Service[]; start?: number }) {
  return (
    <>
      <div className="svc-list">
        {services.map((s, k) => (
          <a key={s.id} className="svc-row" href={`/${s.slug}`} data-img={(img(s.cardImage) || img(s.heroImage))?.url || ''}>
            <span className="svc-num l1-t">{String(k + start).padStart(2, '0')}</span>
            <span className="svc-title h1">{s.title}</span>
            <span className="svc-desc l1">{excerptOf(s.excerpt, null, 140)}</span>
            <span className="svc-arrow">
              <ArrowRight />
            </span>
          </a>
        ))}
      </div>
      <div className="svc-float" aria-hidden="true" />
    </>
  )
}
