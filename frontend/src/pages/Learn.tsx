import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { articles } from '../data/catalog'
import { useApp } from '../context/AppContext'

export function Learn() {
  const [params] = useSearchParams()
  const cat = params.get('cat') || ''
  const filtered = articles.filter((a) =>
    !cat || a.category.toLowerCase().includes(cat.toLowerCase()) || a.tags.some((t) => t.toLowerCase().includes(cat.toLowerCase())) || a.title.toLowerCase().includes(cat.toLowerCase()),
  )
  const list = filtered.length ? filtered : articles

  return (
    <section className="page">
      <div className="wrap">
        <PageHeader
          eyebrow="Learn"
          title="Knowledge base"
          lede={cat ? `Showing topics related to ${cat}.` : 'Original tutorials across DSA, web, databases, and cloud.'}
        />
        <div className="chips" style={{ marginBottom: 20 }}>
          {['DSA', 'Web Development', 'Databases', 'DevOps', 'Python', 'Java'].map((c) => (
            <Link key={c} className={`chip${cat === c ? ' active' : ''}`} to={`/learn?cat=${encodeURIComponent(c)}`}>{c}</Link>
          ))}
        </div>
        <div className="grid-2">
          {list.map((article) => (
            <Link key={article.slug} to={`/learn/${article.slug}`} className="card">
              <span className="tag">{article.category}</span>
              <h3>{article.title}</h3>
              <p className="lede" style={{ marginBottom: 0 }}>{article.excerpt}</p>
              <p className="course-meta">{article.difficulty} · {article.minutes} min · {article.published}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)
  const { bookmarks, toggleBookmark } = useApp()
  if (!article) return <Missing />
  const id = `article:${article.slug}`

  return (
    <section className="page">
      <div className="wrap grid-2">
        <article className="prose">
          <p className="course-meta">{article.category} · {article.difficulty} · {article.minutes} min read</p>
          <h1 className="page-title">{article.title}</h1>
          <p className="lede">Published {article.published} · Updated {article.updated}</p>
          <button className="btn btn-ghost btn-sm" onClick={() => toggleBookmark(id)}>
            <Bookmark size={14} /> {bookmarks.includes(id) ? 'Saved' : 'Bookmark'}
          </button>
          <h3>Table of contents</h3>
          <ol>
            {article.body.map((_, i) => <li key={i}>Section {i + 1}</li>)}
          </ol>
          {article.body.map((p) => <p key={p}>{p}</p>)}
          <div className="example">
            {`// Example\nfunction demo() {\n  return "try this in the practice editor";\n}`}
          </div>
        </article>
        <aside className="card">
          <h3>Related</h3>
          <div className="chips">
            {article.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <ul>
            {articles.filter((a) => a.slug !== article.slug).slice(0, 4).map((a) => (
              <li key={a.slug}><Link to={`/learn/${a.slug}`}>{a.title}</Link></li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export function Missing() {
  return (
    <section className="page">
      <div className="wrap">
        <h1 className="page-title">Not found</h1>
        <p className="lede">That page is not in the Phase 1 catalog yet.</p>
        <Link className="btn btn-green" to="/">Back home</Link>
      </div>
    </section>
  )
}
