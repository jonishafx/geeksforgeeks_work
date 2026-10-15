import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Clock, Users, Calendar, ChevronRight, Zap, Star, Award, Play } from 'lucide-react'

/* ── Mock contest data ────────────────────────── */
const CONTESTS = [
  {
    id: 1,
    name: 'GFG Weekly Contest #182',
    status: 'Live',
    start: 'Today, 9:00 PM IST',
    duration: '2 Hours',
    participants: '14,203',
    prizes: '₹50,000',
    difficulty: 'Medium',
    tags: ['DSA', 'CP'],
  },
  {
    id: 2,
    name: 'Job-A-Thon: Hiring Challenge #48',
    status: 'Upcoming',
    start: 'Sep 25, 2026, 7:00 PM IST',
    duration: '3 Hours',
    participants: '6,802',
    prizes: 'Job Opportunities',
    difficulty: 'Hard',
    tags: ['Hiring', 'DSA'],
  },
  {
    id: 3,
    name: 'Beginner-Friendly Contest #12',
    status: 'Upcoming',
    start: 'Sep 27, 2026, 8:00 PM IST',
    duration: '90 Mins',
    participants: '3,240',
    prizes: 'GeekCoins + Certificate',
    difficulty: 'Easy',
    tags: ['Beginner', 'DSA'],
  },
  {
    id: 4,
    name: 'GFG Biweekly Contest #91',
    status: 'Upcoming',
    start: 'Sep 29, 2026, 9:00 PM IST',
    duration: '90 Mins',
    participants: '9,105',
    prizes: '₹25,000',
    difficulty: 'Medium',
    tags: ['DSA', 'CP'],
  },
  {
    id: 5,
    name: 'GFG Weekly Contest #181',
    status: 'Past',
    start: 'Sep 16, 2026',
    duration: '2 Hours',
    participants: '12,980',
    prizes: '₹50,000',
    difficulty: 'Medium',
    tags: ['DSA', 'CP'],
  },
  {
    id: 6,
    name: 'Python Coding Challenge #5',
    status: 'Past',
    start: 'Sep 10, 2026',
    duration: '90 Mins',
    participants: '5,410',
    prizes: 'GeekCoins',
    difficulty: 'Easy',
    tags: ['Python'],
  },
]

const LEADERBOARD = [
  { rank: 1, name: 'Arpit_coder99', score: 2800, problems: 4, time: '1:22:10', country: '🇮🇳' },
  { rank: 2, name: 'devmaster_88', score: 2800, problems: 4, time: '1:24:55', country: '🇺🇸' },
  { rank: 3, name: 'algo_queen', score: 2650, problems: 3, time: '0:58:30', country: '🇬🇧' },
  { rank: 4, name: 'code_wizard', score: 2400, problems: 3, time: '1:10:22', country: '🇩🇪' },
  { rank: 5, name: 'pythonista_X', score: 2100, problems: 2, time: '0:45:18', country: '🇨🇦' },
]

const STATS = [
  { icon: <Trophy size={28} color="#f59e0b" />, value: '182+', label: 'Weekly Contests', bg: '#fffbeb' },
  { icon: <Users size={28} color="#3b82f6" />, value: '2M+', label: 'Participants', bg: '#eff6ff' },
  { icon: <Award size={28} color="#2f8d46" />, value: '₹5Cr+', label: 'Prize Money', bg: '#f0fdf4' },
  { icon: <Star size={28} color="#a855f7" />, value: '50K+', label: 'Certificates Issued', bg: '#faf5ff' },
]

function diffColor(d: string) {
  return d === 'Easy' ? '#2f8d46' : d === 'Medium' ? '#f59e0b' : '#ef4444'
}
function statusColor(s: string) {
  return s === 'Live' ? '#ef4444' : s === 'Upcoming' ? '#3b82f6' : '#6b7280'
}

export function CodingContest() {
  const [tab, setTab] = useState<'all' | 'live' | 'upcoming' | 'past'>('all')

  const filtered = CONTESTS.filter(c => {
    if (tab === 'all') return true
    return c.status.toLowerCase() === tab
  })

  return (
    <div className="contest-page">
      {/* Hero */}
      <div className="contest-hero">
        <div className="wrap">
          <div className="contest-hero-inner">
            <div>
              <span className="contest-live-badge"><span className="contest-live-dot" /> LIVE NOW</span>
              <h1>Coding Contests</h1>
              <p>Compete with coders worldwide, win prizes, and get noticed by top companies.</p>
              <div className="contest-hero-btns">
                <Link to="/contests" className="btn btn-green">Register Now <Zap size={14} /></Link>
                <Link to="/practice" className="btn btn-ghost">Practice Problems</Link>
              </div>
            </div>
            <div className="contest-hero-art">
              <Trophy size={120} strokeWidth={1} color="#f59e0b" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap contest-body">
        {/* Stats */}
        <div className="contest-stats">
          {STATS.map(s => (
            <div key={s.label} className="contest-stat" style={{ '--stat-bg': s.bg } as React.CSSProperties}>
              {s.icon}
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="contest-cols">
          {/* Left: contest list */}
          <div className="contest-main">
            {/* Tabs */}
            <div className="contest-tabs">
              {(['all', 'live', 'upcoming', 'past'] as const).map(t => (
                <button key={t} className={`contest-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  {t === 'live' && <span className="contest-live-dot ml-2" />}
                </button>
              ))}
            </div>

            <div className="contest-list">
              {filtered.map(c => (
                <div key={c.id} className="contest-card">
                  <div className="contest-card-top">
                    <div>
                      <span className="contest-status-badge" style={{ color: statusColor(c.status), borderColor: statusColor(c.status) }}>
                        {c.status === 'Live' && <span className="contest-live-dot" />} {c.status}
                      </span>
                      <h3>{c.name}</h3>
                    </div>
                    <span className="contest-diff" style={{ color: diffColor(c.difficulty) }}>{c.difficulty}</span>
                  </div>

                  <div className="contest-card-meta">
                    <span><Calendar size={14} /> {c.start}</span>
                    <span><Clock size={14} /> {c.duration}</span>
                    <span><Users size={14} /> {c.participants} registered</span>
                    <span><Trophy size={14} color="#f59e0b" /> {c.prizes}</span>
                  </div>

                  <div className="contest-card-tags">
                    {c.tags.map(t => <span key={t} className="contest-tag">{t}</span>)}
                  </div>

                  <div className="contest-card-actions">
                    {c.status === 'Live' && (
                      <button className="btn btn-green btn-sm"><Play size={14} /> Join Now</button>
                    )}
                    {c.status === 'Upcoming' && (
                      <button className="btn btn-ink btn-sm">Register Free</button>
                    )}
                    {c.status === 'Past' && (
                      <button className="btn btn-ghost btn-sm">View Results</button>
                    )}
                    <button className="btn btn-ghost btn-sm">View Problems <ChevronRight size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: leaderboard */}
          <aside className="contest-aside">
            <div className="contest-lb">
              <h3><Trophy size={18} color="#f59e0b" /> Contest #181 Leaderboard</h3>
              <table className="contest-lb-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map(l => (
                    <tr key={l.rank} className={l.rank <= 3 ? 'lb-top' : ''}>
                      <td>
                        <span className={`lb-rank rank-${l.rank}`}>
                          {l.rank === 1 ? '🥇' : l.rank === 2 ? '🥈' : l.rank === 3 ? '🥉' : `#${l.rank}`}
                        </span>
                      </td>
                      <td>{l.country} {l.name}</td>
                      <td><strong>{l.score}</strong></td>
                      <td className="lb-time">{l.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/contests" className="contest-lb-more">View Full Leaderboard <ChevronRight size={14} /></Link>
            </div>

            <div className="contest-aside-card">
              <h4>🎯 How Contests Work</h4>
              <ol className="contest-how">
                <li>Register for a contest before it starts</li>
                <li>Solve problems during the contest window</li>
                <li>Earn points based on correctness & speed</li>
                <li>Win prizes &amp; certificates for top ranks</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
