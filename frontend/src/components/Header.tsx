import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Award, BookOpen, ChevronDown, Code2, FileText, History,
  LayoutDashboard, LogOut, Menu, Moon, Search, Settings,
  Sun, Users, X,
} from 'lucide-react'
import { Logo } from './Logo'
import { articles, courses, navCategories, problems } from '../data/catalog'
import { STUDENT_GITHUB, STUDENT_NAME, STUDENT_REG } from '../data/classroom'
import { useApp } from '../context/AppContext'

const menus = {
  Courses: [
    ['/courses/category/dsa-placements', 'DSA / Placements'],
    ['/courses/category/data-science', 'DA / Data Science & AI'],
    ['/courses/category/development', 'Development'],
    ['/courses/category/development', 'DevOps Course'],
    ['/courses', 'All Courses'],
  ],
  Tutorials: [
    ['/learn?cat=Programming Languages', 'Programming Languages'],
    ['/learn?cat=DSA', 'DSA'],
    ['/learn?cat=Web Development', 'Web Technology'],
    ['/learn?cat=AI', 'AI, ML & Data Science'],
    ['/learn?cat=DevOps', 'DevOps'],
    ['/learn?cat=CS', 'CS Core Subjects'],
    ['/interview', 'Interview Preparation'],
    ['/learn?cat=Tools', 'Software and Tools'],
  ],
  'Interview Prep': [
    ['/interview', 'Complete Interview Preparation'],
    ['/interview/nimbus', 'Company Wise'],
    ['/practice', 'Practice Problems'],
    ['/roadmaps', 'Roadmaps'],
    ['/courses/system-design-training-program', 'System Design'],
  ],
} as const

export function Header() {
  const { theme, toggleTheme, user, openAuth, logout } = useApp()
  const [mobile, setMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)

  /* Auto-focus when search opens */
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [searchOpen])

  /* Close on Escape or outside click */
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') closeSearch() }
    function clickOut(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeSearch()
    }
    window.addEventListener('keydown', handler)
    document.addEventListener('mousedown', clickOut)
    return () => {
      window.removeEventListener('keydown', handler)
      document.removeEventListener('mousedown', clickOut)
    }
  })

  /* Live suggestions from real catalog data */
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return { courses: [], articles: [], problems: [] }
    return {
      courses:  courses.filter(c => c.title.toLowerCase().includes(q)).slice(0, 3),
      articles: articles.filter(a => a.title.toLowerCase().includes(q)).slice(0, 3),
      problems: problems.filter(p => p.title.toLowerCase().includes(q)).slice(0, 3),
    }
  }, [query])

  const hasSuggestions = query.trim().length >= 2 &&
    (suggestions.courses.length + suggestions.articles.length + suggestions.problems.length) > 0

  function openSearch() { setSearchOpen(true) }
  function closeSearch() { setSearchOpen(false); setQuery('') }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    closeSearch()
  }

  function go(path: string) { navigate(path); closeSearch() }

  return (
    <header className="header">
      <div className="identity-bar">
        <div className="wrap">
          <span>{STUDENT_NAME} · Reg {STUDENT_REG} · UI demo with sample data</span>
          <a href={STUDENT_GITHUB} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="wrap header-row">

        {/* ── LEFT: logo + search ── */}
        <div className="header-left">
          {/* Logo — always visible */}
          <Link to="/" className="brand" aria-label="GeekPath home">
            <Logo size={34} />
          </Link>

          {/* Inline search with autocomplete */}
          <div className="hdr-search-wrap" ref={wrapRef}>
            {searchOpen ? (
              <>
                <form className="hdr-inline-search" onSubmit={handleSubmit}>
                  <Search size={15} className="hdr-inline-icon" />
                  <input
                    ref={inputRef}
                    className="hdr-inline-input"
                    placeholder="Search courses, articles, problems…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    aria-label="Search"
                    autoComplete="off"
                  />
                  {query && (
                    <button type="button" className="hdr-inline-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Clear">
                      <X size={13} />
                    </button>
                  )}
                  <button type="button" className="hdr-inline-close" onClick={closeSearch} aria-label="Close">
                    <X size={16} />
                  </button>
                </form>

                {/* Live suggestions */}
                {hasSuggestions && (
                  <div className="hdr-autocomplete">
                    {suggestions.courses.length > 0 && (
                      <div className="hdr-ac-group">
                        <span className="hdr-ac-label">Courses</span>
                        {suggestions.courses.map(c => (
                          <button key={c.id} className="hdr-ac-item" onClick={() => go(`/courses/${c.id}`)}>
                            <BookOpen size={13} />{c.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {suggestions.articles.length > 0 && (
                      <div className="hdr-ac-group">
                        <span className="hdr-ac-label">Articles</span>
                        {suggestions.articles.map(a => (
                          <button key={a.slug} className="hdr-ac-item" onClick={() => go(`/learn/${a.slug}`)}>
                            <FileText size={13} />{a.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {suggestions.problems.length > 0 && (
                      <div className="hdr-ac-group">
                        <span className="hdr-ac-label">Problems</span>
                        {suggestions.problems.map(p => (
                          <button key={p.id} className="hdr-ac-item" onClick={() => go(`/practice/${p.id}`)}>
                            <Code2 size={13} />{p.title}
                          </button>
                        ))}
                      </div>
                    )}
                    <button className="hdr-ac-all" onClick={() => handleSubmit()}>
                      See all results for "<strong>{query}</strong>" →
                    </button>
                  </div>
                )}

                {/* No results hint */}
                {query.trim().length >= 2 && !hasSuggestions && (
                  <div className="hdr-autocomplete">
                    <div className="hdr-ac-empty">
                      <Search size={18} /> No results for "<strong>{query}</strong>"
                      <button className="hdr-ac-all" onClick={() => handleSubmit()}>Search anyway →</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button className="hdr-search-trigger" onClick={openSearch} aria-label="Open search">
                <Search size={18} strokeWidth={2.2} />
              </button>
            )}
          </div>
        </div>

        {/* ── CENTER: nav ── */}
        <nav className="header-nav">
          {(Object.keys(menus) as Array<keyof typeof menus>).map((label) => (
            <Drop key={label} label={label} links={[...menus[label]]} />
          ))}
        </nav>

        {/* ── RIGHT: theme + user ── */}
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <div className="hdr-user-menu">
              <button className="hdr-avatar-btn" aria-label="User menu">
                <span className="hdr-avatar">{(user.name || user.email || 'G')[0].toUpperCase()}</span>
              </button>
              <div className="hdr-user-dropdown">
                <div className="hdr-user-top">
                  <span className="hdr-udrop-avatar">{(user.name || user.email || 'G')[0].toUpperCase()}</span>
                  <div>
                    <strong>{user.name || 'User'}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="hdr-udrop-divider" />
                <Link to="/profile"   className="hdr-udrop-item"><Settings size={15} />       My Profile</Link>
                <Link to="/dashboard" className="hdr-udrop-item"><BookOpen size={15} />       My Courses</Link>
                <Link to="/contests"  className="hdr-udrop-item"><Award size={15} />          Leaderboard</Link>
                <Link to="/community" className="hdr-udrop-item"><Users size={15} />          Community</Link>
                <Link to="/dashboard" className="hdr-udrop-item"><History size={15} />        Transaction History</Link>
                <Link to="/profile"   className="hdr-udrop-item"><LayoutDashboard size={15}/> Edit Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hdr-udrop-item"><Settings size={15} /> Admin Panel</Link>
                )}
                <div className="hdr-udrop-divider" />
                <button className="hdr-udrop-item hdr-udrop-logout" onClick={logout}>
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-ink btn-sm" onClick={() => openAuth('login')}>Sign In</button>
          )}

          <button className="icon-btn mobile-only" onClick={() => setMobile(v => !v)} aria-label="Menu">
            {mobile ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Category bar ── */}
      <div className="cat-bar">
        <div className="wrap cat-row">
          {navCategories.map(item => (
            <Link key={item.to + item.label} to={item.to}>{item.label}</Link>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobile && (
        <div className="mobile-menu">
          {Object.entries(menus).map(([label, links]) => (
            <div key={label}>
              <strong>{label}</strong>
              {links.map(([to, text]) => (
                <Link key={to + text} to={to} onClick={() => setMobile(false)}>{text}</Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

function Drop({ label, links }: {
  label: string
  links: readonly (readonly [string, string])[] | [string, string][]
}) {
  return (
    <div className="dropdown">
      <button className="linkish" type="button">
        {label} <ChevronDown size={14} />
      </button>
      <div className="dropdown-panel">
        {links.map(([to, text]) => (
          <Link key={to + text} to={to}>{text}</Link>
        ))}
      </div>
    </div>
  )
}
