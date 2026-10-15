import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { potdId, problems, languages } from '../data/catalog'
import { useApp } from '../context/AppContext'
import { judge } from '../utils/judge'
import { Missing } from './Learn'
import type { Difficulty } from '../types'

const topics = ['All', ...Array.from(new Set(problems.map((p) => p.topic)))]

export function Practice() {
  const { solved, attempted, bookmarks, streak } = useApp()
  const [diff, setDiff] = useState<Difficulty | 'All'>('All')
  const [topic, setTopic] = useState('All')
  const [status, setStatus] = useState('All')
  const potd = problems.find((p) => p.id === potdId)

  const rows = useMemo(() => problems.filter((p) => {
    if (diff !== 'All' && p.difficulty !== diff) return false
    if (topic !== 'All' && p.topic !== topic) return false
    if (status === 'Solved' && !solved.includes(p.id)) return false
    if (status === 'Unsolved' && solved.includes(p.id)) return false
    if (status === 'Bookmarked' && !bookmarks.includes(`problem:${p.id}`)) return false
    return true
  }), [diff, topic, status, solved, bookmarks])

  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="Practice" title="Coding problems" lede="Filter by topic, difficulty, company, and status. Solved problems and submissions stay in this browser as sample progress." />

        {potd && (
          <div className="card" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <strong>Problem of the Day</strong>
              <h3 style={{ margin: '6px 0' }}>{potd.title}</h3>
              <p className="course-meta">{potd.difficulty} · {potd.topic}</p>
            </div>
            <div>
              <p>Current streak: <strong>{streak} days</strong></p>
              <Link className="btn btn-green" to={`/practice/${potd.id}`}>Solve now</Link>
            </div>
          </div>
        )}

        <div className="chips" style={{ marginBottom: 12 }}>
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
            <button key={d} className={`chip${diff === d ? ' active' : ''}`} onClick={() => setDiff(d)}>{d}</button>
          ))}
        </div>
        <div className="chips" style={{ marginBottom: 12 }}>
          {topics.map((t) => (
            <button key={t} className={`chip${topic === t ? ' active' : ''}`} onClick={() => setTopic(t)}>{t}</button>
          ))}
        </div>
        <div className="chips" style={{ marginBottom: 20 }}>
          {['All', 'Solved', 'Unsolved', 'Bookmarked'].map((s) => (
            <button key={s} className={`chip${status === s ? ' active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>

        <table className="table">
          <thead>
            <tr><th>Problem</th><th>Difficulty</th><th>Topic</th><th>Accuracy</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td><Link to={`/practice/${p.id}`}>{p.title}</Link></td>
                <td className={p.difficulty.toLowerCase()}>{p.difficulty}</td>
                <td>{p.topic}</td>
                <td>{p.accuracy}%</td>
                <td>{solved.includes(p.id) ? 'Solved' : attempted.includes(p.id) ? 'Attempted' : 'Todo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function ProblemPage() {
  const { id } = useParams()
  const problem = problems.find((p) => p.id === id)
  const { user, openAuth, markAttempt, markSolved, addSubmission, toggleBookmark, bookmarks, claimPotd } = useApp()
  const [lang, setLang] = useState<string>('javascript')
  const [code, setCode] = useState(problem?.starter.javascript ?? '')
  const [output, setOutput] = useState('Output will appear here.')
  const [stdin, setStdin] = useState(problem?.examples[0]?.input ?? '')

  if (!problem) return <Missing />
  const current = problem

  function changeLang(next: string) {
    setLang(next)
    setCode(current.starter[next] ?? '')
  }

  function run() {
    if (!user) {
      openAuth('login')
      return
    }
    markAttempt(current.id)
    const result = judge(current, lang, code)
    setOutput(`${result.status}\nPassed ${result.passed}/${result.total}\n${result.runtime} · ${result.memory}\n${result.detail}`)
    addSubmission({
      id: `s-${Date.now()}`,
      problemId: current.id,
      language: lang,
      status: result.status,
      runtime: result.runtime,
      memory: result.memory,
      at: new Date().toLocaleString(),
    })
    if (result.status === 'Accepted') {
      markSolved(current.id)
      if (current.id === potdId) claimPotd()
    }
  }

  return (
    <section className="page">
      <div className="wrap workspace">
        <div className="pane">
          <div className="pane-head">
            <div>
              <strong>{problem.title}</strong>
              <div className="course-meta">
                <span className={problem.difficulty.toLowerCase()}>{problem.difficulty}</span> · {problem.topic} · {problem.companies.join(', ')}
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => toggleBookmark(`problem:${problem.id}`)}>
              {bookmarks.includes(`problem:${problem.id}`) ? 'Saved' : 'Bookmark'}
            </button>
          </div>
          <div style={{ padding: 16, overflow: 'auto' }} className="prose">
            <p>{problem.prompt}</p>
            {problem.examples.map((ex) => (
              <div key={ex.input} className="example">
                <div>Input: {ex.input}</div>
                <div>Output: {ex.output}</div>
                <div>Explanation: {ex.explanation}</div>
              </div>
            ))}
            <p><strong>Constraints</strong></p>
            <ul>{problem.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
        <div className="pane">
          <div className="pane-head">
            <select value={lang} onChange={(e) => changeLang(e.target.value)}>
              {languages.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <button className="btn btn-green btn-sm" onClick={run}>Submit</button>
          </div>
          <textarea className="editor-area" spellCheck={false} value={code} onChange={(e) => setCode(e.target.value)} />
          <div className="io">
            <textarea value={stdin} onChange={(e) => setStdin(e.target.value)} placeholder="Custom input" />
            <textarea readOnly value={output} />
          </div>
        </div>
      </div>
    </section>
  )
}
