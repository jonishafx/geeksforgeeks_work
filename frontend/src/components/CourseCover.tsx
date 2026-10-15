import { Star } from 'lucide-react'
import type { Course } from '../types'

const covers: Record<string, { headline: string | [string, string]; kicker: string; chips?: string[]; theme: string }> = {
  'system-design': {
    headline: 'System Design',
    kicker: 'HLD • Scalability • Distributed Systems',
    theme: 'system',
  },
  'dsa-system-design': {
    headline: 'DSA + System Design',
    kicker: 'SDE Interview Prep',
    chips: ['DSA', 'System Design'],
    theme: 'dsa',
  },
  'ai-engineering': {
    headline: 'AI ENGINEERING',
    kicker: 'Agentic AI • GenAI',
    theme: 'ai',
  },
  'devops-cloud': {
    headline: 'DEVOPS & CLOUD',
    kicker: 'AWS • Docker • Kubernetes • AI',
    theme: 'cloud',
  },
  'java-backend': {
    headline: ['JAVA', 'BACKEND'],
    kicker: 'Spring Boot • Microservices • AI',
    theme: 'java',
  },
  mern: {
    headline: ['MERN FULL', 'STACK'],
    kicker: 'React • Node • MongoDB • AI',
    theme: 'mern',
  },
  'placement-360': {
    headline: 'Placement 360',
    kicker: 'The Complete Tech Interview Program',
    theme: 'placement',
  },
}

function SystemScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 210 160" aria-hidden="true">
      <ellipse cx="138" cy="146" rx="50" ry="9" fill="#c4b5fd" opacity="0.32" />
      <g className="scene-float">
        <rect x="118" y="54" width="74" height="56" rx="12" fill="#fff" />
        <rect x="126" y="62" width="26" height="18" rx="4" fill="#7c5cff" />
        <rect x="156" y="62" width="28" height="8" rx="2" fill="#38bdf8" />
        <rect x="156" y="74" width="18" height="6" rx="2" fill="#f9a8d4" />
        <rect x="126" y="86" width="58" height="5" rx="2" fill="#e5e7eb" />
        <rect x="126" y="96" width="38" height="5" rx="2" fill="#e5e7eb" />
      </g>
      <g className="scene-bob">
        <circle cx="94" cy="68" r="14" fill="#1e3a5f" />
        <rect x="80" y="84" width="28" height="34" rx="11" fill="#6366f1" />
        <rect x="74" y="114" width="16" height="14" rx="5" fill="#1e3a5f" />
        <rect x="98" y="114" width="16" height="14" rx="5" fill="#1e3a5f" />
      </g>
      <circle className="scene-pulse" cx="186" cy="44" r="14" fill="#f59e0b" />
      <text x="186" y="49" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">$</text>
      <rect className="scene-pulse" x="176" y="72" width="14" height="14" rx="3" fill="#a78bfa" />
      <circle cx="198" cy="92" r="7" fill="#fb923c" />
    </svg>
  )
}

function DsaScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 180 140" aria-hidden="true">
      <ellipse cx="120" cy="124" rx="50" ry="9" fill="#9fb4e6" opacity="0.35" />
      <g className="scene-float">
        <rect x="78" y="62" width="86" height="52" rx="8" fill="#e8eefc" />
        <rect x="86" y="70" width="70" height="36" rx="4" fill="#f8fbff" />
        <rect x="92" y="76" width="28" height="4" rx="2" fill="#7dd3fc" />
        <rect x="92" y="84" width="40" height="4" rx="2" fill="#c4b5fd" />
        <rect x="92" y="92" width="22" height="4" rx="2" fill="#86efac" />
      </g>
      <g className="gear-spin" style={{ transformOrigin: '148px 48px' }}>
        <circle cx="148" cy="48" r="16" fill="#64748b" />
        <circle cx="148" cy="48" r="7" fill="#e2e8f0" />
        <rect x="146" y="30" width="4" height="8" rx="1" fill="#64748b" />
        <rect x="146" y="58" width="4" height="8" rx="1" fill="#64748b" />
        <rect x="130" y="46" width="8" height="4" rx="1" fill="#64748b" />
        <rect x="158" y="46" width="8" height="4" rx="1" fill="#64748b" />
      </g>
      <g className="gear-spin reverse" style={{ transformOrigin: '118px 36px' }}>
        <circle cx="118" cy="36" r="12" fill="#94a3b8" />
        <circle cx="118" cy="36" r="5" fill="#e2e8f0" />
      </g>
      <g className="scene-bob">
        <rect x="54" y="78" width="28" height="34" rx="10" fill="#38bdf8" />
        <circle cx="68" cy="68" r="12" fill="#0ea5e9" />
        <circle cx="64" cy="66" r="2" fill="#fff" />
        <circle cx="72" cy="66" r="2" fill="#fff" />
      </g>
    </svg>
  )
}

function AiScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 180 140" aria-hidden="true">
      <ellipse cx="122" cy="124" rx="48" ry="9" fill="#7dd3fc" opacity="0.35" />
      <g className="scene-float">
        <rect x="88" y="54" width="82" height="54" rx="8" fill="#dbeafe" />
        <rect x="96" y="62" width="66" height="38" rx="4" fill="#f8fbff" />
        <text x="129" y="88" textAnchor="middle" fontSize="22" fontWeight="800" fill="#2563eb">AI</text>
      </g>
      <g className="scene-bob">
        <rect x="118" y="28" width="44" height="22" rx="5" fill="#fff" />
        <rect x="124" y="34" width="18" height="4" rx="2" fill="#93c5fd" />
        <rect x="124" y="41" width="12" height="4" rx="2" fill="#c4b5fd" />
      </g>
      <g className="scene-pulse">
        <circle cx="168" cy="40" r="10" fill="#38bdf8" />
        <path d="M164 40h8M168 36v8" stroke="#fff" strokeWidth="1.6" />
      </g>
    </svg>
  )
}

function CloudScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 180 140" aria-hidden="true">
      <ellipse cx="124" cy="124" rx="46" ry="9" fill="#86efac" opacity="0.4" />
      <g className="scene-float">
        <ellipse cx="132" cy="42" rx="28" ry="16" fill="#38bdf8" />
        <ellipse cx="112" cy="48" rx="18" ry="12" fill="#7dd3fc" />
        <ellipse cx="148" cy="48" rx="16" ry="11" fill="#0ea5e9" />
      </g>
      <g className="scene-bob">
        <rect x="96" y="72" width="62" height="38" rx="6" fill="#d1fae5" />
        <rect x="104" y="80" width="46" height="22" rx="3" fill="#ecfdf5" />
        <circle cx="127" cy="91" r="10" fill="none" stroke="#16a34a" strokeWidth="3" />
        <path d="M120 91h14" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="scene-pulse">
        <rect x="124" y="52" width="12" height="18" rx="3" fill="#facc15" />
        <path d="M118 70h24l-12 12z" fill="#facc15" />
      </g>
    </svg>
  )
}

function JavaScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 210 160" aria-hidden="true">
      <ellipse cx="134" cy="148" rx="48" ry="8" fill="#5eead4" opacity="0.28" />
      <g className="scene-float">
        <g transform="rotate(-12 168 42)">
          <rect x="132" y="16" width="72" height="52" rx="10" fill="#fff" />
          <text x="168" y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f766e">&lt;/&gt;</text>
        </g>
      </g>
      <g className="scene-bob">
        <rect x="96" y="50" width="82" height="62" rx="10" fill="#134e4a" />
        <rect x="104" y="58" width="66" height="40" rx="5" fill="#99f6e4" />
        <ellipse cx="137" cy="80" rx="12" ry="14" fill="#115e59" />
        <path d="M128 74c5-10 14-10 18 0" fill="none" stroke="#5eead4" strokeWidth="2.2" />
        <path d="M131 70c3-6 9-6 12 0" fill="none" stroke="#ccfbf1" strokeWidth="1.6" />
        <rect x="128" y="112" width="18" height="8" rx="2" fill="#0f766e" />
        <rect x="120" y="120" width="34" height="5" rx="2" fill="#115e59" />
      </g>
      <path className="scene-pulse" d="M82 108c22 24 56 22 72 4" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
      <path d="M148 104l18 10-20 6z" fill="#f59e0b" />
    </svg>
  )
}

function MernScene() {
  return (
    <svg className="cover-scene" viewBox="0 0 210 160" aria-hidden="true">
      <ellipse cx="132" cy="148" rx="52" ry="9" fill="#c4b5fd" opacity="0.35" />
      <g className="scene-float">
        <rect x="92" y="38" width="104" height="70" rx="12" fill="#ddd6fe" />
        <rect x="100" y="46" width="88" height="54" rx="6" fill="#faf5ff" />
        <rect x="108" y="54" width="30" height="5" rx="2" fill="#a78bfa" />
        <rect x="108" y="64" width="48" height="5" rx="2" fill="#67e8f9" />
        <rect x="108" y="74" width="24" height="5" rx="2" fill="#86efac" />
        <circle cx="170" cy="72" r="10" fill="none" stroke="#22d3ee" strokeWidth="2.2" />
        <circle cx="170" cy="72" r="3.5" fill="#22d3ee" />
        <ellipse cx="170" cy="72" rx="14" ry="5" fill="none" stroke="#67e8f9" strokeWidth="1.4" />
      </g>
      <g className="scene-bob">
        <circle cx="76" cy="88" r="13" fill="#1e3a5f" />
        <rect x="63" y="102" width="26" height="30" rx="10" fill="#2563eb" />
        <rect x="58" y="128" width="14" height="12" rx="4" fill="#1e3a5f" />
        <rect x="80" y="128" width="14" height="12" rx="4" fill="#1e3a5f" />
      </g>
      <g className="scene-pulse">
        <rect x="118" y="18" width="42" height="15" rx="7" fill="#fff" />
        <text x="139" y="29" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0f766e">MongoDB</text>
        <rect x="162" y="18" width="34" height="15" rx="7" fill="#fff" />
        <text x="179" y="29" textAnchor="middle" fontSize="7" fontWeight="700" fill="#16a34a">Node.js</text>
        <rect x="168" y="108" width="28" height="14" rx="7" fill="#fff" />
        <text x="182" y="118" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0ea5e9">React</text>
      </g>
      <circle cx="148" cy="118" r="8" fill="#fb923c" />
      <circle cx="148" cy="118" r="3" fill="#fff" />
    </svg>
  )
}

function PlacementMark() {
  return (
    <div className="place-mark">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path
          d="M96 28a46 46 0 1 1-18-16"
          fill="none"
          stroke="#143d28"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path d="M92 8l18 22-26 2z" fill="#143d28" />
      </svg>
      <div className="place-copy">
        <span>Placement</span>
        <b>360</b>
      </div>
    </div>
  )
}

export function CourseCover({ course, showRating = false }: { course: Course; showRating?: boolean }) {
  const cover = covers[course.id]
  const theme = cover?.theme ?? 'generic'
  const headline = cover?.headline ?? course.title.split(/[-–]/)[0]?.replace(' Course', '').trim() ?? course.title
  const kicker = cover?.kicker ?? course.subtitle
  const headlineLines = Array.isArray(headline) ? headline : null

  return (
    <div className={`offer-cover theme-${theme}`} style={theme === 'generic' ? { background: course.color } : undefined}>
      {course.live && theme !== 'placement' && (
        <span className="live-pill">
          <i />
          LIVE COURSE
        </span>
      )}
      {cover?.chips?.map((chip) => (
        <span key={chip} className={`cover-chip chip-${chip.toLowerCase().replace(/\s+/g, '-')}`}>{chip}</span>
      ))}
      {showRating && (
        <span className="cover-rating">
          <Star size={11} fill="#f5b301" color="#f5b301" />
          {course.rating.toFixed(1)}
        </span>
      )}

      {theme === 'placement' ? (
        <>
          <PlacementMark />
          <div className="place-side">
            <p>The Complete Tech<br />Interview Program</p>
            <span>Your Career Starts Here →</span>
          </div>
        </>
      ) : (
        <>
          <div className="cover-copy">
            <h3>
              {headlineLines
                ? headlineLines.map((line) => (
                    <span key={line} className="cover-line">{line}</span>
                  ))
                : headline}
            </h3>
            <p>{kicker}</p>
          </div>
          {theme === 'system' && <SystemScene />}
          {theme === 'dsa' && <DsaScene />}
          {theme === 'ai' && <AiScene />}
          {theme === 'cloud' && <CloudScene />}
          {theme === 'java' && <JavaScene />}
          {theme === 'mern' && <MernScene />}
          {theme === 'generic' && (
            <div className="cover-blob" style={{ background: course.accent }} />
          )}
        </>
      )}
    </div>
  )
}
