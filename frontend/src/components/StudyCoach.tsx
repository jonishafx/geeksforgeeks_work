import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const SAMPLE = {
  id: 'demo-coach',
  title: 'Sample study reminder',
  body: 'This note is dummy data. Open your DSA course and continue the next lesson. Nothing is sent to a server.',
}

export function StudyCoach() {
  const { user } = useApp()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'student') {
      setOpen(false)
      return
    }
    if (sessionStorage.getItem('geekpath-coach') === '1') return
    const timer = window.setTimeout(() => setOpen(true), 1200)
    return () => window.clearTimeout(timer)
  }, [user])

  if (!open) return null

  return (
    <aside className="wa-toast" role="status">
      <div className="wa-toast-head">
        <span className="wa-dot" />
        <strong>Study coach</strong>
        <button
          type="button"
          className="wa-toast-x"
          onClick={() => {
            sessionStorage.setItem('geekpath-coach', '1')
            setOpen(false)
          }}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
      <h4>{SAMPLE.title}</h4>
      <p>{SAMPLE.body}</p>
      <Link className="btn btn-green btn-sm" to="/courses/dsa-system-design-live/learn" onClick={() => setOpen(false)}>
        <BookOpen size={14} /> Open course
      </Link>
    </aside>
  )
}
