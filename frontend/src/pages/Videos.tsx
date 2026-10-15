import { useState, useMemo } from 'react'
import { Search, Play, Eye, Tag, ChevronRight } from 'lucide-react'

/* ── Mock video data ─────────────────────────────── */
const ALL_VIDEOS = [
  // Popular
  { id: 'v1', title: 'Introduction To Data Science', thumb: 'https://placehold.co/320x180/1a3a5c/fff?text=Data+Science', duration: '56:08', views: '899.5K', date: '02/07/2024', tags: ['Python', 'Data Science'], category: 'Popular' },
  { id: 'v2', title: 'Merge Sort — Visual Explanation', thumb: 'https://placehold.co/320x180/1a2a3c/fff?text=Merge+Sort', duration: '15:54', views: '684.1K', date: '18/07/2024', tags: ['Sorting', 'DSA'], category: 'Popular' },
  { id: 'v3', title: 'MongoDB CRUD Operations | Compass', thumb: 'https://placehold.co/320x180/1a3c1a/fff?text=MongoDB', duration: '56:54', views: '664.3K', date: '25/04/2024', tags: ['Java', 'Database'], category: 'Popular' },
  // Recent
  { id: 'v4', title: 'test_mamta_321', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=GeeksforGeeks', duration: '00:31', views: '30', date: '07/09/2026', tags: ['Pandas', 'Data Structures'], category: 'Recent' },
  { id: 'v5', title: 'Introduction to Cyber Security', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=Cyber+Security', duration: '01:13', views: '1.7K', date: '05/09/2026', tags: ['Cybersecurity'], category: 'Recent' },
  { id: 'v6', title: 'Python Applications, Advantages and Disadvantages', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=Python', duration: '12:17', views: '10.2K', date: '26/08/2026', tags: ['Python'], category: 'Recent' },
  // Course Videos
  { id: 'v7', title: 'Introduction to XGBoost', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=XGBoost', duration: '12:00', views: '11.1K', date: '09/05/2026', tags: ['ML', 'Python'], category: 'Course' },
  { id: 'v8', title: 'Python NumPy Array', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=NumPy', duration: '06:39', views: '14.9K', date: '09/05/2026', tags: ['Python'], category: 'Course' },
  { id: 'v9', title: 'Reduce in Python', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=Python', duration: '01:08', views: '2.1K', date: '07/05/2026', tags: ['Python'], category: 'Course' },
  { id: 'v10', title: 'Plotly for Data Visualization', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=Plotly', duration: '01:03', views: '1.0K', date: '01/08/2026', tags: ['Python', 'Data Analysis'], category: 'Course' },
  { id: 'v11', title: 'Data Visualization with Seaborn', thumb: 'https://placehold.co/320x180/2f8d46/fff?text=Seaborn', duration: '00:51', views: '820', date: '01/08/2026', tags: ['Python', 'Data Analysis'], category: 'Course' },
  // Strings
  { id: 'v12', title: "Print Concatenation of Zig-Zag String in 'n' Rows", thumb: 'https://placehold.co/320x180/3c1a6c/fff?text=Strings', duration: '14:00', views: '5.5K', date: '16/01/2025', tags: ['Strings', 'matrix'], category: 'Strings' },
  { id: 'v13', title: 'Return maximum occurring character in an input string', thumb: 'https://placehold.co/320x180/3c1a6c/fff?text=Strings', duration: '06:10', views: '201.2K', date: '11/01/2025', tags: ['Strings', 'hash'], category: 'Strings' },
  { id: 'v14', title: 'Write a program to print all permutations of a given string', thumb: 'https://placehold.co/320x180/3c1a6c/fff?text=Permutations', duration: '17:16', views: '216.8K', date: '10/01/2025', tags: ['Strings', 'C++', 'recursion'], category: 'Strings' },
  // Miscellaneous
  { id: 'v15', title: 'Top 8 Reasons to Learn C++ in 2022', thumb: 'https://placehold.co/320x180/1a3c4c/fff?text=C%2B%2B', duration: '05:30', views: '8.2K', date: '11/09/2022', tags: ['CPP', 'Miscellaneous'], category: 'Miscellaneous' },
  { id: 'v16', title: '5 Tips to Get Job as a Java Fresher', thumb: 'https://placehold.co/320x180/3c2a1a/fff?text=Java+Career', duration: '07:57', views: '13.8K', date: '03/09/2022', tags: ['Miscellaneous', 'Java'], category: 'Miscellaneous' },
  { id: 'v17', title: 'Accenture Previous Year Coding Questions & Answers', thumb: 'https://placehold.co/320x180/1a1a3c/fff?text=Interview', duration: '27:39', views: '47.9K', date: '05/05/2022', tags: ['Miscellaneous', 'Interview'], category: 'Miscellaneous' },
  // Java
  { id: 'v18', title: 'Java Collections Framework Explained', thumb: 'https://placehold.co/320x180/e76f51/fff?text=Java', duration: '38:22', views: '320K', date: '12/03/2024', tags: ['Java'], category: 'Java' },
  { id: 'v19', title: 'Spring Boot REST API Full Tutorial', thumb: 'https://placehold.co/320x180/e76f51/fff?text=Spring+Boot', duration: '1:12:05', views: '540K', date: '05/02/2024', tags: ['Java', 'Spring'], category: 'Java' },
  { id: 'v20', title: 'Multithreading in Java', thumb: 'https://placehold.co/320x180/e76f51/fff?text=Threads', duration: '44:10', views: '212K', date: '18/01/2024', tags: ['Java'], category: 'Java' },
  // JavaScript
  { id: 'v21', title: 'JavaScript Promises & Async/Await', thumb: 'https://placehold.co/320x180/f7df1e/333?text=JS', duration: '28:40', views: '450K', date: '20/06/2024', tags: ['JavaScript'], category: 'JavaScript' },
  { id: 'v22', title: 'React Hooks Deep Dive', thumb: 'https://placehold.co/320x180/61dafb/333?text=React', duration: '52:15', views: '380K', date: '14/05/2024', tags: ['JavaScript', 'React'], category: 'JavaScript' },
  { id: 'v23', title: 'Node.js Crash Course', thumb: 'https://placehold.co/320x180/3c873a/fff?text=Node.js', duration: '1:05:00', views: '620K', date: '08/04/2024', tags: ['JavaScript', 'Node'], category: 'JavaScript' },
  // Database
  { id: 'v24', title: 'SQL Joins Explained Visually', thumb: 'https://placehold.co/320x180/334155/fff?text=SQL', duration: '22:18', views: '290K', date: '01/03/2024', tags: ['Database', 'SQL'], category: 'Database' },
  { id: 'v25', title: 'PostgreSQL Full Course', thumb: 'https://placehold.co/320x180/336791/fff?text=PostgreSQL', duration: '2:10:00', views: '175K', date: '15/02/2024', tags: ['Database', 'PostgreSQL'], category: 'Database' },
]

const CATS = ['All', 'Java', 'Python', 'JavaScript', 'Miscellaneous', 'Database', 'Strings', 'Course', 'Recent', 'Popular']
const SECTIONS = ['Popular', 'Recent', 'Course', 'Strings', 'Miscellaneous', 'Java', 'JavaScript', 'Database']

function VideoCard({ v }: { v: typeof ALL_VIDEOS[0] }) {
  return (
    <div className="vid-card">
      <div className="vid-thumb">
        <img src={v.thumb} alt={v.title} loading="lazy" />
        <span className="vid-dur">{v.duration}</span>
        <div className="vid-play-overlay"><Play size={28} fill="#fff" /></div>
      </div>
      <div className="vid-meta">
        <span className="vid-stats"><Eye size={12} /> {v.views} Views | {v.date}</span>
        <h4 className="vid-title">{v.title}</h4>
        <div className="vid-tags">
          {v.tags.map(t => <span key={t} className="vid-tag"><Tag size={10} /> {t}</span>)}
        </div>
      </div>
    </div>
  )
}

function SectionRow({ title, videos }: { title: string; videos: typeof ALL_VIDEOS }) {
  if (!videos.length) return null
  return (
    <section className="vid-section">
      <div className="vid-sec-head">
        <h2>{title === 'Course' ? 'Course Videos' : title === 'Recent' ? 'Recent Videos' : title === 'Popular' ? 'Popular Videos' : title}</h2>
        <a href="#" className="vid-view-all">View All <ChevronRight size={14} /></a>
      </div>
      <div className="vid-grid">
        {videos.slice(0, 3).map(v => <VideoCard key={v.id} v={v} />)}
      </div>
    </section>
  )
}

export function Videos() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() => {
    return ALL_VIDEOS.filter(v => {
      const matchCat = cat === 'All' || v.category === cat || v.tags.some(t => t.toLowerCase() === cat.toLowerCase())
      const matchQ = !query || v.title.toLowerCase().includes(query.toLowerCase()) || v.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      return matchCat && matchQ
    })
  }, [query, cat])

  const isSearching = query || cat !== 'All'

  return (
    <div className="vid-page">
      {/* Hero */}
      <div className="vid-hero">
        <h1>Hello, What Do You Want to Learn?</h1>
        <div className="vid-hero-search">
          <div className="vid-select-wrap">
            <select value={cat} onChange={e => setCat(e.target.value)}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="vid-search-input">
            <Search size={16} />
            <input
              placeholder="Search your Video here"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="vid-pills">
          {['Java', 'Python', 'JavaScript', 'Miscellaneous', 'Database'].map(p => (
            <button
              key={p}
              className={`vid-pill${cat === p ? ' active' : ''}`}
              onClick={() => setCat(cat === p ? 'All' : p)}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="wrap vid-body">
        {isSearching ? (
          <section className="vid-section">
            <div className="vid-sec-head">
              <h2>{filtered.length} result{filtered.length !== 1 ? 's' : ''} {query ? `for "${query}"` : `in ${cat}`}</h2>
            </div>
            {filtered.length ? (
              <div className="vid-grid vid-grid-all">
                {filtered.map(v => <VideoCard key={v.id} v={v} />)}
              </div>
            ) : (
              <div className="vid-empty">
                <Play size={48} strokeWidth={1} />
                <p>No videos found. Try a different search.</p>
              </div>
            )}
          </section>
        ) : (
          SECTIONS.map(sec => (
            <SectionRow key={sec} title={sec} videos={ALL_VIDEOS.filter(v => v.category === sec)} />
          ))
        )}
      </div>
    </div>
  )
}
