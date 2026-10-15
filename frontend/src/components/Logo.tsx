interface LogoProps {
  wordmark?: boolean
  full?: boolean
  size?: number
  light?: boolean
}

/** GeekPath mark for the student UI demo. */
export function Logo({ wordmark = false, full = false, size = 36, light = false }: LogoProps) {
  const green = '#0f766e'
  const textCol = light ? '#ffffff' : '#134e4a'
  const subCol = light ? 'rgba(255,255,255,0.7)' : '#5f6b66'
  const height = size
  const width = Math.round(size * 1.15)

  const icon = (
    <svg className="gfg-mark" width={width} height={height} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill={green} />
      <path d="M10 26 V14 h6.2 c3.4 0 5.4 1.7 5.4 4.2 0 1.8-1 3.2-2.6 3.8 L22.6 26 h-3.4 l-3-3.6 H13.2 V26 H10 Zm3.2-6.2 h2.7 c1.5 0 2.4-.7 2.4-1.8 s-.9-1.7-2.4-1.7 h-2.7 v3.5 Z" fill="#fff" />
      <path d="M24 26 V14 h3.2 v12 H24 Z" fill="#d1fae5" />
    </svg>
  )

  if (!wordmark && !full) return icon

  const nameSize = Math.max(13, Math.round(size * 0.42))
  const nameEl = (
    <span className="gfg-wordmark" style={{
      fontSize: nameSize,
      fontWeight: 800,
      fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
      letterSpacing: '-0.3px',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      userSelect: 'none',
      color: textCol,
    }}>
      Geek<span style={{ color: green }}>Path</span>
    </span>
  )

  if (wordmark && !full) {
    return <span className="gfg-logo with-word">{icon}{nameEl}</span>
  }

  return (
    <span className="gfg-logo with-word">
      {icon}
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3, lineHeight: 1.15 }}>
        {nameEl}
        <span style={{ fontSize: Math.round(size * 0.24), color: subCol, fontWeight: 500 }}>
          Student learning demo
        </span>
      </span>
    </span>
  )
}
