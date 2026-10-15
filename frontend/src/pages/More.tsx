import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { articles, companies, contests, coursePath, courses, jobs, problems, roadmaps } from '../data/catalog'
import { Missing } from './Learn'

export function Roadmaps() {
  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Learn" title="Roadmaps" lede="Guided paths from first syntax to a portfolio role." />
        <div className="grid-3">
          {roadmaps.map((r) => (
            <Link key={r.id} to={`/roadmaps/${r.id}`} className="card">
              <h3>{r.title}</h3>
              <p className="lede" style={{ margin: 0 }}>{r.audience}</p>
              <p className="course-meta">{r.steps.length} steps</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RoadmapDetail() {
  const { id } = useParams()
  const roadmap = roadmaps.find((r) => r.id === id)
  if (!roadmap) return <Missing />
  return (
    <section className="page">
      <div className="wrap">
        <p className="course-meta">{roadmap.audience}</p>
        <h1 className="page-title">{roadmap.title}</h1>
        <div style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
          {roadmap.steps.map((step, i) => (
            <div key={step.title} className="card">
              <strong>{i + 1}. {step.title}</strong>
              <p className="lede" style={{ marginBottom: 0 }}>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Interview() {
  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Career" title="Interview preparation" lede="Technical topics, company tracks, and a lightweight mock interview form." />
        <div className="grid-3">
          {['DSA', 'OOP', 'DBMS', 'SQL', 'Operating Systems', 'Networking', 'System Design', 'Web Development', 'AI/ML'].map((t) => (
            <Link key={t} className="card" to={`/learn?cat=${encodeURIComponent(t)}`}>{t}</Link>
          ))}
        </div>
        <h2>Company-wise tracks</h2>
        <div className="grid-3">
          {companies.map((c) => (
            <Link key={c.slug} to={`/interview/${c.slug}`} className="card">
              <h3>{c.name}</h3>
              <p className="course-meta">{c.roles.join(' · ')}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CompanyPrep() {
  const { slug } = useParams()
  const company = companies.find((c) => c.slug === slug)
  if (!company) return <Missing />
  return (
    <section className="page">
      <div className="wrap grid-2">
        <div>
          <h1 className="page-title">{company.name}</h1>
          <div className="card">
            <h3>Roles</h3>
            <p>{company.roles.join(', ')}</p>
            <h3>Topics</h3>
            <div className="chips">{company.topics.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <h3>Sample questions</h3>
            <ul>{company.questions.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        </div>
        <form className="card" onSubmit={(e) => e.preventDefault()}>
          <h3>AI mock interview</h3>
          <div className="field"><label>Position</label><input defaultValue="Software Developer" /></div>
          <div className="field"><label>Level</label><select defaultValue="Junior"><option>Junior</option><option>Mid</option><option>Senior</option></select></div>
          <label><input type="checkbox" defaultChecked /> DSA</label>
          <label><input type="checkbox" defaultChecked /> SQL</label>
          <p className="lede">This demo returns a static rubric. A hosted model can score communication and gaps later.</p>
          <Link className="btn btn-green btn-wide" to="/ai">Start interview</Link>
        </form>
      </div>
    </section>
  )
}

export function Contests() {
  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Practice" title="Contests" lede="Weekly sprints, beginner cups, and university events." />
        <table className="table">
          <thead><tr><th>Contest</th><th>Starts</th><th>Duration</th><th>Problems</th><th>Status</th></tr></thead>
          <tbody>
            {contests.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td><td>{c.starts}</td><td>{c.duration}</td><td>{c.problems}</td>
                <td>{c.status} · {c.registered.toLocaleString()} registered</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function Jobs() {
  const [level, setLevel] = useState('All')
  const rows = jobs.filter((j) => level === 'All' || j.level === level)
  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Career" title="Jobs & internships" lede="Roles across Africa and remote teams." />
        <div className="chips" style={{ marginBottom: 16 }}>
          {['All', 'Intern', 'Junior', 'Mid-level'].map((l) => (
            <button key={l} className={`chip${level === l ? ' active' : ''}`} onClick={() => setLevel(l)}>{l}</button>
          ))}
        </div>
        <div className="grid-3">
          {rows.map((j) => (
            <article key={j.id} className="card">
              <h3>{j.title}</h3>
              <p>{j.company} · {j.location} {j.remote ? '· Remote' : ''}</p>
              <p className="course-meta">{j.type} · {j.level} · {j.salary}</p>
              <div className="chips">{j.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const hit = (text: string) => !q || text.toLowerCase().includes(q)
  const art = useMemo(() => articles.filter((a) => hit(a.title) || hit(a.excerpt)), [q])
  const probs = useMemo(() => problems.filter((p) => hit(p.title) || hit(p.topic)), [q])
  const crs = useMemo(() => courses.filter((c) => hit(c.title)), [q])

  return (
    <section className="page">
      <div className="wrap">
        <h1 className="page-title">Search{q ? `: “${params.get('q')}”` : ''}</h1>
        <p className="lede">Articles {art.length} · Problems {probs.length} · Courses {crs.length}</p>
        <div className="grid-3">
          <div className="card">
            <h3>Articles</h3>
            <ul>{art.map((a) => <li key={a.slug}><Link to={`/learn/${a.slug}`}>{a.title}</Link></li>)}</ul>
          </div>
          <div className="card">
            <h3>Problems</h3>
            <ul>{probs.map((p) => <li key={p.id}><Link to={`/practice/${p.id}`}>{p.title}</Link></li>)}</ul>
          </div>
          <div className="card">
            <h3>Courses</h3>
            <ul>{crs.map((c) => <li key={c.id}><Link to={coursePath(c)}>{c.title}</Link></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Community() {
  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Community" title="Ask and learn" lede="Ask, answer, and vote. Moderation lands in a later phase; this board is a preview." />
        <article className="card">
          <h3>Why is my React component rendering twice?</h3>
          <p>14 upvotes · 6 answers</p>
          <p>Strict Mode remounts in development. Make effects idempotent instead of disabling it.</p>
        </article>
      </div>
    </section>
  )
}
