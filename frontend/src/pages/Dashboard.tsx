import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award, BookOpen, Bookmark, Briefcase, Camera, CheckCircle2,
  ChevronRight, Clock, Edit2, Flame, GraduationCap,
  LayoutDashboard, MapPin, MessageSquare, MoreHorizontal,
  Phone, Search, Settings, Trophy, User, Users,
} from 'lucide-react'
import { articles, courses as allCourses, findCourse, problems } from '../data/catalog'
import { listCertificates, listMyCourses } from '../data/classroom'
import { useApp } from '../context/AppContext'

type MyCourse = {
  id: string; slug: string; title: string; tag?: string
  status: string; progress: number; certificateId: string | null
}
type Cert = { id: string; courseTitle: string; issuedAt: string }

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'G'
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 22; const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width="56" height="56" className="prog-ring" aria-hidden="true">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle
        cx="28" cy="28" r={r} fill="none"
        stroke={pct === 100 ? '#0d7a56' : '#2f8f4e'}
        strokeWidth="5" strokeDasharray={circ}
        strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 28 28)"
      />
      <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
        {pct}%
      </text>
    </svg>
  )
}

export function Dashboard() {
  const { user, solved, enrollments, xp, streak, submissions, openAuth } = useApp()
  const [mine, setMine] = useState<MyCourse[]>([])
  const [certs, setCerts] = useState<Cert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    setMine(listMyCourses(enrollments))
    setCerts(listCertificates().map((cert) => ({
      id: cert.id,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt,
    })))
    setLoading(false)
  }, [user, enrollments])

  const continueCourse = useMemo(() => mine.find((c) => c.status !== 'completed') ?? mine[0], [mine])
  const completedCourses = mine.filter((c) => c.status === 'completed').length

  if (!user) {
    return (
      <div className="db-gate">
        <div className="db-gate-card">
          <LayoutDashboard size={40} strokeWidth={1.5} />
          <h1>Your learning dashboard</h1>
          <p>Sign in to see your enrolled courses, track progress, and download certificates.</p>
          <button className="btn btn-green" onClick={() => openAuth('login')}>Sign In to Continue</button>
          <Link className="btn btn-ghost" to="/courses">Browse Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="db-page">
      {/* ── HERO HEADER ── */}
      <div className="db-hero">
        <div className="wrap db-hero-inner">
          <div className="db-avatar">{initials(user.name)}</div>
          <div className="db-hello">
            <p className="db-greet">Welcome back</p>
            <h1 className="db-name">{user.name}</h1>
            <p className="db-meta">
              {user.university || 'GeekPath student'} · {user.skillLevel || 'Learner'}
            </p>
          </div>
          <div className="db-hero-actions">
            <Link className="btn btn-green" to="/courses">Explore Courses</Link>
            <Link className="btn btn-ghost" to="/profile">Edit Profile</Link>
          </div>
        </div>
      </div>

      <div className="wrap db-wrap">
        {/* ── STATS ROW ── */}
        <div className="db-stats">
          {[
            { icon: <BookOpen size={20} />, val: mine.length, label: 'Enrolled', color: '#3b6fd4' },
            { icon: <GraduationCap size={20} />, val: completedCourses, label: 'Completed', color: '#0d7a56' },
            { icon: <Award size={20} />, val: certs.length, label: 'Certificates', color: '#d97706' },
            { icon: <Trophy size={20} />, val: xp, label: 'XP earned', color: '#7c3aed' },
            { icon: <Flame size={20} />, val: `${streak}d`, label: 'Streak', color: '#dc2626' },
            { icon: <CheckCircle2 size={20} />, val: solved.length, label: 'Problems solved', color: '#059669' },
          ].map(({ icon, val, label, color }) => (
            <article key={label} className="db-stat">
              <span className="db-stat-icon" style={{ background: `${color}18`, color }}>{icon}</span>
              <b className="db-stat-val">{val}</b>
              <span className="db-stat-label">{label}</span>
            </article>
          ))}
        </div>

        {/* ── CONTINUE BANNER ── */}
        {continueCourse && (
          <div className="db-continue">
            <div className="db-continue-info">
              <p className="eyebrow">Continue where you left off</p>
              <h2>{continueCourse.title}</h2>
              <div className="db-continue-bar">
                <div className="db-continue-fill" style={{ width: `${continueCourse.progress}%` }} />
              </div>
              <p className="db-continue-pct">{continueCourse.progress}% complete · {continueCourse.status === 'completed' ? 'Finished' : 'In progress'}</p>
            </div>
            <div className="db-continue-actions">
              <Link className="btn btn-green" to={`/courses/${continueCourse.slug}/learn`}>
                {continueCourse.progress > 0 ? 'Resume Course' : 'Start Course'} <ChevronRight size={16} />
              </Link>
              {continueCourse.certificateId && (
                <Link className="btn btn-ghost" to={`/certificates/${continueCourse.certificateId}`}>
                  <Award size={15} /> Certificate
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="db-layout">
          {/* LEFT: courses */}
          <div className="db-left">
            <div className="db-section-head">
              <h3>My Courses</h3>
              <Link to="/courses">Browse all <ChevronRight size={14} /></Link>
            </div>

            {loading && <p className="lede">Loading your courses…</p>}

            {!loading && mine.length === 0 && (
              <div className="db-empty">
                <BookOpen size={36} strokeWidth={1.5} />
                <h4>No courses yet</h4>
                <p>Find a course that interests you and start learning today.</p>
                <Link className="btn btn-green" to="/courses">Browse Courses</Link>
              </div>
            )}

            <div className="db-course-list">
              {mine.map((row) => {
                const cat = findCourse(row.id)
                return (
                  <article key={row.id} className="db-course-card">
                    <div className="db-course-cover" style={{ background: cat?.color ?? '#ecfdf3' }}>
                      <span style={{ color: cat?.accent ?? '#0d7a56' }}>{row.tag ?? 'COURSE'}</span>
                    </div>
                    <div className="db-course-info">
                      <div>
                        <p className="db-course-tag">{cat?.level ?? ''}</p>
                        <h4 className="db-course-title">{row.title}</h4>
                      </div>
                      <div className="db-course-prog">
                        <ProgressRing pct={row.progress} />
                        <div>
                          <span className={`db-course-status ${row.status === 'completed' ? 'db-status-done' : ''}`}>
                            {row.status === 'completed' ? 'Completed' : 'In progress'}
                          </span>
                          {row.status !== 'completed' && (
                            <p className="db-course-left">
                              {Math.round(((100 - row.progress) / 100) * (row.id === 'mern' ? 12 : 9))} lessons left
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="db-course-actions">
                      <Link className="btn btn-green btn-sm" to={`/courses/${row.slug}/learn`}>
                        {row.status === 'completed' ? 'Review' : row.progress > 0 ? 'Continue' : 'Start'}
                      </Link>
                      {row.certificateId && (
                        <Link className="btn btn-ghost btn-sm" to={`/certificates/${row.certificateId}`}>
                          <Award size={14} />
                        </Link>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <aside className="db-right">
            {/* Certificates */}
            <div className="db-card">
              <div className="db-card-head">
                <Award size={18} />
                <h4>Certificates</h4>
              </div>
              {certs.length === 0 ? (
                <p className="db-aside-empty">Complete a course to earn your first certificate.</p>
              ) : (
                <ul className="db-cert-list">
                  {certs.map((cert) => (
                    <li key={cert.id}>
                      <Award size={15} style={{ color: '#d97706', flexShrink: 0 }} />
                      <div>
                        <Link to={`/certificates/${cert.id}`} className="db-cert-name">{cert.courseTitle}</Link>
                        <span className="db-cert-id">{cert.id}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Practice */}
            <div className="db-card">
              <div className="db-card-head">
                <CheckCircle2 size={18} />
                <h4>Practice Progress</h4>
              </div>
              <div className="db-prac-stats">
                <div><b>{solved.length}</b><span>Solved</span></div>
                <div><b>{streak}d</b><span>Streak</span></div>
                <div><b>{xp}</b><span>XP</span></div>
              </div>
              <Link className="btn btn-ghost btn-sm" to="/practice" style={{ marginTop: 12 }}>
                Open Practice Arena
              </Link>
            </div>

            {/* Recent submissions */}
            <div className="db-card">
              <div className="db-card-head">
                <Clock size={18} />
                <h4>Recent Submissions</h4>
              </div>
              {submissions.length === 0 ? (
                <p className="db-aside-empty">Solve a coding problem to see submissions here.</p>
              ) : (
                <ul className="db-sub-list">
                  {submissions.slice(0, 5).map((s) => (
                    <li key={s.id}>
                      <Link to={`/practice/${s.problemId}`}>{s.problemId}</Link>
                      <span className={`db-sub-status ${s.status === 'Accepted' ? 'db-sub-ok' : 'db-sub-err'}`}>{s.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Shortcuts */}
            <div className="db-shortcuts">
              {[
                { to: '/practice', label: 'Practice Problems', val: problems.length },
                { to: '/courses', label: 'All Courses', val: allCourses.length },
                { to: '/learn', label: 'Articles', val: articles.length },
                { to: '/roadmaps', label: 'Roadmaps', val: '' },
              ].map(({ to, label, val }) => (
                <Link key={to} to={to} className="db-shortcut">
                  <span>{label}{val ? ` · ${val}` : ''}</span>
                  <ChevronRight size={15} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* ── Trending posts mock data ── */
const TRENDING_POSTS = [
  { id: 1, name: 'GOURAV PANDEY', verified: true, snippet: 'Day 11 - Binary Search Find Minimum in Rotated Sorted Array Yesterday w…', initials: 'GP', color: '#2f8d46' },
  { id: 2, name: 'Rohan Tukaram Umbarepatil', verified: false, snippet: 'Good coding habits matter more than writing more code. Before solving a…', initials: 'RU', color: '#3b82f6' },
  { id: 3, name: 'Vaibhav Agarwal', verified: false, snippet: 'Hexaware Technologies Interview experience for Software Engineer M…', initials: 'VA', color: '#a855f7' },
  { id: 4, name: 'Saurabh Sanan Kalad', verified: false, snippet: 'Just solved my 100th problem on GfG! 🎉 DSA is all about consistency…', initials: 'SK', color: '#f59e0b' },
]

const JOBS = {
  fresher: [
    { id: 1, title: 'Junior Quality Analyst', company: 'LBM Solutions', type: '0.5–1 Years · Onsite · Mohali (Punjab)', deadline: 'Apply by Sat Sep 26 2026', color: '#6b21a8' },
    { id: 2, title: 'Graduate Trainee Engineer', company: 'Infosys', type: '0 Years · Remote · Bengaluru', deadline: 'Apply by Mon Sep 28 2026', color: '#3b82f6' },
    { id: 3, title: 'Software Developer Intern', company: 'TCS iON', type: 'Fresher · Hybrid · Mumbai', deadline: 'Apply by Wed Sep 30 2026', color: '#0891b2' },
  ],
  experienced: [
    { id: 4, title: 'Senior Backend Engineer', company: 'Razorpay', type: '3–5 Years · Remote · India', deadline: 'Apply by Fri Oct 2 2026', color: '#ef4444' },
    { id: 5, title: 'Lead Data Scientist', company: 'Flipkart', type: '5+ Years · Onsite · Bengaluru', deadline: 'Apply by Sun Oct 4 2026', color: '#f59e0b' },
  ],
}

type ProfileTab = 'overview' | 'posts' | 'mentions' | 'bookmarks'

export function Profile() {
  const { user, updateUser, openAuth, solved, xp, streak } = useApp()
  const [tab, setTab] = useState<ProfileTab>('overview')
  const [jobTab, setJobTab] = useState<'fresher' | 'experienced'>('fresher')
  const [userSearch, setUserSearch] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [editVal, setEditVal] = useState('')
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  if (!user) {
    return (
      <section className="pf-gate">
        <div className="pf-gate-card">
          <User size={48} strokeWidth={1} color="#2f8d46" />
          <h2>Sign in to view your profile</h2>
          <p>Track your progress, posts, and achievements all in one place.</p>
          <button className="btn btn-green" onClick={() => openAuth('login')}>Sign In</button>
        </div>
      </section>
    )
  }

  const ini = initials(user.name || 'GfG User')

  function startEdit(field: string, current: string) {
    setEditing(field)
    setEditVal(current)
  }

  function saveEdit() {
    if (!editing) return
    updateUser({ [editing]: editVal })
    setEditing(null)
  }

  const profileComplete = [user.name, user.bio, user.university, user.country].filter(Boolean).length
  const completePct = Math.round((profileComplete / 4) * 100)

  return (
    <div className="pf-page">
      <div className="wrap pf-layout">
        {/* ── Main column ── */}
        <main className="pf-main">
          {/* Profile card */}
          <div className="pf-card pf-top-card">
            {/* Avatar */}
            <div className="pf-avatar-wrap">
              <div className="pf-avatar">{ini}</div>
              <button className="pf-cam-btn" title="Change photo"><Camera size={14} /></button>
            </div>

            {/* Name / meta */}
            <div className="pf-identity">
              <h1 className="pf-name">{user.name || 'Your Name'}</h1>
              {user.university && <p className="pf-uni"><GraduationCap size={14} /> {user.university}</p>}
              {user.country && <p className="pf-loc"><MapPin size={14} /> {user.country}</p>}
              <div className="pf-follow">
                <span><strong>0</strong> Followers</span>
                <span className="pf-dot">•</span>
                <span><strong>0</strong> Following</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pf-actions">
              <button className="btn btn-ghost btn-sm pf-edit-btn" onClick={() => startEdit('name', user.name)}>
                <Edit2 size={14} /> Edit Profile
              </button>
              <button className="pf-icon-btn" title="Settings"><Settings size={18} /></button>
              <div className="pf-more-wrap" ref={moreRef}>
                <button className="pf-icon-btn" onClick={() => setShowMoreMenu(v => !v)} title="More"><MoreHorizontal size={18} /></button>
                {showMoreMenu && (
                  <div className="pf-more-menu">
                    <button onClick={() => { updateUser({ twoFactor: !user.twoFactor }); setShowMoreMenu(false) }}>
                      {user.twoFactor ? '✓' : '○'} Two-Factor Auth
                    </button>
                    <button onClick={() => setShowMoreMenu(false)}>Share Profile</button>
                    <button onClick={() => setShowMoreMenu(false)}>Report</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="pf-tabs">
            {([['overview','Overview'],['posts','Posts'],['mentions','Mentions'],['bookmarks','Bookmarks']] as [ProfileTab,string][]).map(([key, label]) => (
              <button key={key} className={`pf-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
                {key === 'posts' && <MessageSquare size={14} />}
                {key === 'bookmarks' && <Bookmark size={14} />}
                {key === 'mentions' && <Users size={14} />}
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'overview' && (
            <div className="pf-overview">
              {/* Complete banner */}
              {completePct < 100 && (
                <div className="pf-complete-banner">
                  <div className="pf-complete-bar"><div className="pf-complete-fill" style={{ width: `${completePct}%` }} /></div>
                  <span>Complete your profile to let others know you better.</span>
                  <button className="pf-complete-link" onClick={() => startEdit('bio', user.bio)}>Complete now →</button>
                </div>
              )}

              {/* Sections */}
              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3><User size={16} /> Basic Information</h3>
                  <button className="pf-sec-edit" onClick={() => startEdit('name', user.name)}><Edit2 size={14} /></button>
                </div>
                {editing === 'name' ? (
                  <div className="pf-inline-edit">
                    <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)} placeholder="Full name" />
                    <button className="btn btn-green btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <p className="pf-sec-desc">Edit your name, contact, location, gender and headline.</p>
                )}
                <div className="pf-fields-grid">
                  <div className="pf-field-row">
                    <span className="pf-field-label">Name</span>
                    <span className="pf-field-val">{user.name || <em>Not set</em>}</span>
                  </div>
                  <div className="pf-field-row">
                    <span className="pf-field-label">Email</span>
                    <span className="pf-field-val">{user.email}</span>
                  </div>
                  <div className="pf-field-row">
                    <span className="pf-field-label">Country</span>
                    <span className="pf-field-val">{user.country || <em>Not set</em>}</span>
                  </div>
                </div>
              </div>

              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3><Phone size={16} /> WhatsApp study coach</h3>
                  <button className="pf-sec-edit" onClick={() => startEdit('phone', user.phone || '')}><Edit2 size={14} /></button>
                </div>
                {editing === 'phone' ? (
                  <div className="pf-inline-edit">
                    <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)} placeholder="+250 7xx xxx xxx" />
                    <button className="btn btn-green btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <p className="pf-sec-desc">
                    {user.phone || 'Add your WhatsApp number to get new courses and a study plan automatically.'}
                  </p>
                )}
                <label className="auth-check" style={{ marginTop: 10 }}>
                  <input
                    type="checkbox"
                    checked={Boolean(user.whatsappOptIn)}
                    onChange={(e) => updateUser({ whatsappOptIn: e.target.checked })}
                  />
                  Send me study reminders and new courses on WhatsApp
                </label>
              </div>

              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3><MessageSquare size={16} /> About Me</h3>
                  <button className="pf-sec-edit" onClick={() => startEdit('bio', user.bio)}><Edit2 size={14} /></button>
                </div>
                {editing === 'bio' ? (
                  <div className="pf-inline-edit">
                    <textarea autoFocus rows={3} value={editVal} onChange={e => setEditVal(e.target.value)} placeholder="Tell others about yourself..." />
                    <button className="btn btn-green btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <p className="pf-sec-desc">{user.bio || 'Let others know more about you.'}</p>
                )}
              </div>

              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3><Briefcase size={16} /> Experience · 0 Years</h3>
                  <button className="pf-sec-edit"><Edit2 size={14} /></button>
                </div>
                <p className="pf-sec-desc">Add your work experiences.</p>
              </div>

              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3><GraduationCap size={16} /> Qualifications</h3>
                  <button className="pf-sec-edit" onClick={() => startEdit('university', user.university)}><Edit2 size={14} /></button>
                </div>
                {editing === 'university' ? (
                  <div className="pf-inline-edit">
                    <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)} placeholder="University / College" />
                    <button className="btn btn-green btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <p className="pf-sec-desc">{user.university || 'Add your education details.'}</p>
                )}
              </div>

              {/* Stats row */}
              <div className="pf-stats-row">
                <div className="pf-stat-box"><Trophy size={20} color="#f59e0b" /><strong>{xp}</strong><span>XP Points</span></div>
                <div className="pf-stat-box"><CheckCircle2 size={20} color="#2f8d46" /><strong>{solved.length}</strong><span>Problems Solved</span></div>
                <div className="pf-stat-box"><Flame size={20} color="#ef4444" /><strong>{streak}d</strong><span>Streak</span></div>
                <div className="pf-stat-box"><Award size={20} color="#a855f7" /><strong>{solved.length >= 1 ? 1 : 0}</strong><span>Badges</span></div>
              </div>

              {/* Badges */}
              <div className="pf-section">
                <div className="pf-sec-head"><h3><Award size={16} /> Badges &amp; Achievements</h3></div>
                <div className="pf-badges">
                  <span className="pf-badge pf-badge-green">✓ Joined GeeksforGeeks</span>
                  {solved.length >= 1 && <span className="pf-badge pf-badge-blue">🎯 First Problem Solved</span>}
                  {solved.length >= 10 && <span className="pf-badge pf-badge-purple">⚡ 10 Problems</span>}
                  {streak >= 7 && <span className="pf-badge pf-badge-orange">🔥 7-Day Streak</span>}
                  <span className="pf-badge pf-badge-gray">🔒 DSA Beginner</span>
                  <span className="pf-badge pf-badge-gray">🔒 50 Problems</span>
                </div>
              </div>

              {/* Links */}
              <div className="pf-section">
                <div className="pf-sec-head">
                  <h3>Social Links</h3>
                  <button className="pf-sec-edit" onClick={() => startEdit('github', user.github || '')}><Edit2 size={14} /></button>
                </div>
                {editing === 'github' ? (
                  <div className="pf-inline-edit">
                    <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)} placeholder="GitHub URL" />
                    <button className="btn btn-green btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="pf-links">
                    {user.github && <a href={user.github} target="_blank" rel="noreferrer" className="pf-link">GitHub</a>}
                    {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" className="pf-link">LinkedIn</a>}
                    {user.website && <a href={user.website} target="_blank" rel="noreferrer" className="pf-link">Website</a>}
                    {!user.github && !user.linkedin && !user.website && <p className="pf-sec-desc">Add your social links.</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'posts' && (
            <div className="pf-empty-tab">
              <MessageSquare size={48} strokeWidth={1} />
              <h3>No posts yet</h3>
              <p>Share your learning journey with the community.</p>
            </div>
          )}

          {tab === 'mentions' && (
            <div className="pf-empty-tab">
              <Users size={48} strokeWidth={1} />
              <h3>No mentions yet</h3>
              <p>When someone mentions you, it'll show up here.</p>
            </div>
          )}

          {tab === 'bookmarks' && (
            <div className="pf-empty-tab">
              <Bookmark size={48} strokeWidth={1} />
              <h3>No bookmarks yet</h3>
              <p>Save articles and problems to revisit them later.</p>
            </div>
          )}
        </main>

        {/* ── Right sidebar ── */}
        <aside className="pf-sidebar">
          {/* User search */}
          <div className="pf-sidebar-card">
            <div className="pf-user-search">
              <Search size={15} />
              <input
                placeholder="Search Users"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Trending posts */}
          <div className="pf-sidebar-card">
            <h4 className="pf-sidebar-title">Trending Posts</h4>
            <div className="pf-trend-posts">
              {TRENDING_POSTS.map(p => (
                <div key={p.id} className="pf-trend-post">
                  <div className="pf-mini-avatar" style={{ background: p.color }}>{p.initials}</div>
                  <div className="pf-trend-info">
                    <span className="pf-trend-name">
                      {p.name} {p.verified && <span className="pf-verified">✓</span>}
                    </span>
                    <p className="pf-trend-snippet">{p.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/community" className="pf-view-all">View All <ChevronRight size={13} /></Link>
          </div>

          {/* Jobs */}
          <div className="pf-sidebar-card">
            <div className="pf-job-tabs">
              <button className={`pf-job-tab${jobTab === 'fresher' ? ' active' : ''}`} onClick={() => setJobTab('fresher')}>Fresher Jobs</button>
              <button className={`pf-job-tab${jobTab === 'experienced' ? ' active' : ''}`} onClick={() => setJobTab('experienced')}>Experienced Jobs</button>
            </div>
            <div className="pf-jobs">
              {JOBS[jobTab].map(j => (
                <div key={j.id} className="pf-job">
                  <div className="pf-job-icon" style={{ background: j.color }}><Briefcase size={16} color="#fff" /></div>
                  <div className="pf-job-info">
                    <strong>{j.title}</strong>
                    <span>{j.company}</span>
                    <span className="pf-job-meta">{j.type}</span>
                    <span className="pf-job-deadline">{j.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/jobs" className="pf-view-all">View All Jobs <ChevronRight size={13} /></Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
