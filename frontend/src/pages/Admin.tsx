import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { articles, courses, jobs, problems } from '../data/catalog'
import { useApp } from '../context/AppContext'

const tabs = ['Overview', 'Users', 'Courses', 'Articles', 'Problems', 'Jobs'] as const

type Stats = {
  users: number
  courses: number
  problems: number
  articles: number
  submissions: number
  jobs: number
  enrollments: number
  certificates: number
}

export function Admin() {
  const { user, users } = useApp()
  const [tab, setTab] = useState<(typeof tabs)[number]>('Overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [dbUsers, setDbUsers] = useState(users)

  useEffect(() => {
    if (!user || user.role !== 'admin') return
    setDbUsers(users)
    setStats({
      users: users.length,
      courses: courses.length,
      problems: problems.length,
      articles: articles.length,
      submissions: 42,
      jobs: jobs.length,
      enrollments: 18,
      certificates: 4,
    })
  }, [user, users])

  if (!user || user.role !== 'admin') {
    return (
      <section className="page">
        <div className="wrap">
          <PageHeader eyebrow="Admin" title="Platform console" lede="Sign in with admin@geekpath.dev / admin123. Counts below are sample data." />
        </div>
      </section>
    )
  }

  const overview = stats || {
    users: dbUsers.length,
    courses: courses.length,
    problems: problems.length,
    articles: articles.length,
    submissions: 0,
    jobs: jobs.length,
    enrollments: 0,
    certificates: 0,
  }

  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Admin" title="Platform console" lede="Sample counts for users, enrollments, courses, and certificates. Nothing is stored on a server." />
        <div className="tabs">
          {tabs.map((t) => (
            <button key={t} className={`chip${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {tab === 'Overview' && (
          <div className="grid-4">
            <div className="stat"><b>{overview.users}</b><span>Users</span></div>
            <div className="stat"><b>{overview.enrollments}</b><span>Enrollments</span></div>
            <div className="stat"><b>{overview.certificates}</b><span>Certificates</span></div>
            <div className="stat"><b>{overview.courses}</b><span>Courses</span></div>
            <div className="stat"><b>{overview.problems}</b><span>Problems</span></div>
            <div className="stat"><b>{overview.articles}</b><span>Articles</span></div>
            <div className="stat"><b>{overview.submissions}</b><span>Submissions</span></div>
            <div className="stat"><b>{overview.jobs}</b><span>Jobs</span></div>
          </div>
        )}

        {tab === 'Users' && (
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th></tr></thead>
            <tbody>
              {dbUsers.map((u) => (
                <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.emailVerified ? 'Yes' : 'No'}</td></tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'Courses' && (
          <ul>{courses.map((c) => <li key={c.id} className="card" style={{ marginBottom: 8 }}>{c.title} · published</li>)}</ul>
        )}
        {tab === 'Articles' && (
          <ul>{articles.map((a) => <li key={a.slug} className="card" style={{ marginBottom: 8 }}>{a.title} · {a.category}</li>)}</ul>
        )}
        {tab === 'Problems' && (
          <ul>{problems.map((p) => <li key={p.id} className="card" style={{ marginBottom: 8 }}>{p.title} · {p.difficulty} · {p.topic}</li>)}</ul>
        )}
        {tab === 'Jobs' && (
          <ul>{jobs.map((j) => <li key={j.id} className="card" style={{ marginBottom: 8 }}>{j.title} · {j.company}</li>)}</ul>
        )}
      </div>
    </section>
  )
}
