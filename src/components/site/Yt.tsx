/** Video YouTube: hiện ảnh xem trước, bấm mới tải trình phát (nhẹ trang, không theo dõi trước khi bấm) */
export function Yt({ id, label }: { id: string; label: string }) {
  return (
    <div className="yt" data-yt={id} role="button" tabIndex={0} aria-label={`Phát video: ${label}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" />
      <span className="yt__play">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 1.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </span>
      <span className="yt__label l1">{label}</span>
    </div>
  )
}
