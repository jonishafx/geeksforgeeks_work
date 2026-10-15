import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Flame, BookOpen, Code2, Star, ArrowRight, Clock, Eye } from 'lucide-react'

/* ── Mock trending data ─────────────────────────── */
const TRENDING_ARTICLES = [
  { id: 1, title: 'Top 10 Data Structures Every Programmer Must Know', views: '2.3M', time: '8 min read', tag: 'DSA', hot: true },
  { id: 2, title: 'How to Crack FAANG Interviews in 2026', views: '1.8M', time: '12 min read', tag: 'Interview', hot: true },
  { id: 3, title: 'System Design Interview Questions & Answers', views: '1.5M', time: '15 min read', tag: 'System Design', hot: false },
  { id: 4, title: 'Python vs JavaScript — Which Should You Learn First?', views: '1.2M', time: '6 min read', tag: 'Programming', hot: false },
  { id: 5, title: 'Complete Roadmap to Become a Full Stack Developer', views: '980K', time: '10 min read', tag: 'Web Dev', hot: false },
  { id: 6, title: 'Machine Learning Algorithms Cheat Sheet', views: '870K', time: '7 min read', tag: 'ML', hot: false },
  { id: 7, title: 'Dynamic Programming — From Zero to Hero', views: '760K', time: '20 min read', tag: 'DSA', hot: false },
  { id: 8, title: 'SQL vs NoSQL — When to Use What?', views: '690K', time: '5 min read', tag: 'Database', hot: false },
]

const GBLOG_POSTS = [
  { id: 1, title: '[TopTalent.in] How Tech Companies Like Their Résumés', bg: '#e8583a', pattern: true },
  { id: 2, title: 'GFact | Putting a 0 before an integer constant', bg: '#1f3b4d', pattern: true },
  { id: 3, title: 'GFact | What is an atomic operation?', bg: '#e89238', pattern: true },
  { id: 4, title: "GFact | Meaning of this equation (L = (n-1)*l + 1) in n-ary Tree", bg: '#2a9d8f', pattern: true },
  { id: 5, title: 'Why Every Developer Should Learn System Design in 2026', bg: '#6b21a8', pattern: true },
  { id: 6, title: 'Top 5 Projects to Put on Your Resume as a Fresher', bg: '#1e40af', pattern: true },
]

const TRENDING_TOPICS = [
  { label: 'DSA', color: '#3b6fd4', count: '12.4K articles' },
  { label: 'Python', color: '#3776ab', count: '8.2K articles' },
  { label: 'Machine Learning', color: '#6b5ce7', count: '6.1K articles' },
  { label: 'Web Development', color: '#d08a8a', count: '9.5K articles' },
  { label: 'System Design', color: '#264653', count: '3.8K articles' },
  { label: 'Java', color: '#e76f51', count: '7.0K articles' },
  { label: 'JavaScript', color: '#f7df1e', textColor: '#333', count: '5.3K articles' },
  { label: 'DevOps', color: '#1d4ed8', count: '2.9K articles' },
]

const TRENDING_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: '2.1M', tag: 'Array' },
  { id: 2, title: 'Longest Common Subsequence', difficulty: 'Medium', solved: '1.4M', tag: 'DP' },
  { id: 3, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', solved: '1.1M', tag: 'Tree' },
  { id: 4, title: 'N-Queens Problem', difficulty: 'Hard', solved: '540K', tag: 'Backtracking' },
  { id: 5, title: 'Kth Largest Element in an Array', difficulty: 'Medium', solved: '980K', tag: 'Heap' },
]

function diffColor(d: string) {
  return d === 'Easy' ? '#2f8d46' : d === 'Medium' ? '#f59e0b' : '#ef4444'
}

export function Trending() {
  const [gblogIdx, setGblogIdx] = useState(0)
  const visiblePosts = GBLOG_POSTS.slice(gblogIdx, gblogIdx + 4)

  return (
    <div className="trend-page">
      {/* Hero */}
      <div className="trend-hero">
        <div className="wrap">
          <h1><TrendingUp size={32} /> Trending Now On GeeksforGeeks</h1>
          <p>Explore the exciting world of tech trends and stay ahead of the curve with the latest buzz</p>
        </div>
      </div>

      <div className="wrap trend-body">
        {/* GBlog carousel */}
        <section className="trend-section">
          <div className="trend-sec-head">
            <h2>Trending in <span className="trend-gblog">GBlog</span></h2>
            <div className="trend-arrows">
              <button onClick={() => setGblogIdx(Math.max(0, gblogIdx - 1))} disabled={gblogIdx === 0}>‹</button>
              <button onClick={() => setGblogIdx(Math.min(GBLOG_POSTS.length - 4, gblogIdx + 1))} disabled={gblogIdx >= GBLOG_POSTS.length - 4}>›</button>
            </div>
          </div>
          <div className="trend-gblog-grid">
            {visiblePosts.map(post => (
              <div key={post.id} className="trend-gblog-card" style={{ background: post.bg }}>
                <div className="trend-gblog-pattern" />
                <p className="trend-gblog-title">{post.title}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="trend-cols">
          {/* Left: trending articles */}
          <div className="trend-main">
            <section className="trend-section">
              <div className="trend-sec-head">
                <h2><Flame size={20} color="#ef4444" /> Trending Articles</h2>
              </div>
              <div className="trend-articles">
                {TRENDING_ARTICLES.map((a, i) => (
                  <Link key={a.id} to="/learn" className="trend-article-row">
                    <span className="trend-rank">{String(i + 1).padStart(2, '0')}</span>
                    <div className="trend-article-info">
                      <h4>{a.title} {a.hot && <span className="trend-hot">🔥 Hot</span>}</h4>
                      <div className="trend-article-meta">
                        <span><Eye size={12} /> {a.views} views</span>
                        <span><Clock size={12} /> {a.time}</span>
                        <span className="trend-tag">{a.tag}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} className="trend-arrow" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Trending Problems */}
            <section className="trend-section">
              <div className="trend-sec-head">
                <h2><Code2 size={20} color="#3b6fd4" /> Trending Problems</h2>
                <Link to="/practice" className="trend-view-all">View All <ArrowRight size={14} /></Link>
              </div>
              <div className="trend-problems">
                {TRENDING_PROBLEMS.map((p, i) => (
                  <Link key={p.id} to="/practice" className="trend-problem-row">
                    <span className="trend-rank">{String(i + 1).padStart(2, '0')}</span>
                    <div className="trend-problem-info">
                      <span className="trend-p-title">{p.title}</span>
                      <span className="trend-p-tag">{p.tag}</span>
                    </div>
                    <span className="trend-diff" style={{ color: diffColor(p.difficulty) }}>{p.difficulty}</span>
                    <span className="trend-solved"><Star size={12} /> {p.solved}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right: topics sidebar */}
          <aside className="trend-aside">
            <section className="trend-section">
              <div className="trend-sec-head">
                <h2><BookOpen size={18} /> Trending Topics</h2>
              </div>
              <div className="trend-topics">
                {TRENDING_TOPICS.map(t => (
                  <Link key={t.label} to={`/learn?cat=${t.label}`} className="trend-topic-chip" style={{ '--topic-bg': t.color, '--topic-txt': t.textColor || '#fff' } as React.CSSProperties}>
                    <span className="trend-topic-dot" style={{ background: t.color }} />
                    <div>
                      <strong>{t.label}</strong>
                      <span>{t.count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="trend-aside-banner">
              <span className="trend-aside-icon">🚀</span>
              <h4>Ready to level up?</h4>
              <p>Enroll in our top-rated courses and start your journey today.</p>
              <Link to="/courses" className="btn btn-green btn-sm" style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>Explore Courses</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
