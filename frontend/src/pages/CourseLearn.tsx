import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Award, CheckCircle2, ChevronRight, Circle, Clock,
  GraduationCap, BookOpen, Zap, AlertCircle,
} from 'lucide-react'
import { findCourse } from '../data/catalog'
import { completeRead, loadLearn, submitQuiz, type LearnPayload, type LessonItem } from '../data/classroom'
import { useApp } from '../context/AppContext'

export function CourseLearn() {
  const { id, lessonId } = useParams()
  const navigate = useNavigate()
  const { user, openAuth } = useApp()
  const catalogCourse = findCourse(id)
  const [data, setData] = useState<LearnPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [picked, setPicked] = useState<number[]>([])
  const [quizResult, setQuizResult] = useState<{
    score: number; passed: boolean; attemptNumber: number; correct: number; total: number
  } | null>(null)

  const items = useMemo(() => data?.modules.flatMap((m) => m.lessons) ?? [], [data])
  const activeId = lessonId ? decodeURIComponent(lessonId) : items[0]?.id
  const active = items.find((item) => item.id === activeId) ?? items[0]

  function load() {
    if (!id) return
    const payload = loadLearn(id)
    if (!payload) {
      setError('This sample course is not in the catalog.')
      setData(null)
      return
    }
    setData(payload)
    setError(null)
  }

  useEffect(() => { if (user) load() }, [user, id])
  useEffect(() => { setPicked([]); setQuizResult(null) }, [active?.id])
  useEffect(() => {
    if (!data || lessonId || !items[0]) return
    navigate(`/courses/${id}/learn/${encodeURIComponent(items[0].id)}`, { replace: true })
  }, [data, lessonId, items, id, navigate])

  if (!user) {
    return (
      <div className="cl-gate">
        <div className="cl-gate-card">
          <BookOpen size={40} strokeWidth={1.5} />
          <h2>Sign in to start learning</h2>
          <p>Track your lessons, take quizzes, and earn a certificate when you finish.</p>
          <button className="btn btn-green" onClick={() => openAuth('login')}>Sign In</button>
          <Link className="btn btn-ghost" to="/courses">Browse courses</Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cl-gate">
        <div className="cl-gate-card">
          <AlertCircle size={40} strokeWidth={1.5} style={{ color: '#dc2626' }} />
          <h2>Could not load course</h2>
          <p>{error}</p>
          <Link className="btn btn-green" to="/courses">Browse courses</Link>
        </div>
      </div>
    )
  }

  if (!data || !active) {
    return (
      <div className="cl-loading">
        <div className="cl-spinner" />
        <p>Loading your classroom…</p>
      </div>
    )
  }

  const done = new Set(data.completedIds)
  const currentIndex = items.findIndex((item) => item.id === active.id)
  const next = items[currentIndex + 1]
  const title = catalogCourse?.title ?? data.course.title
  const totalModules = data.modules.length
  const completedModules = data.modules.filter((mod) =>
    mod.lessons.every((lesson) => done.has(lesson.id))
  ).length

  function go(item: LessonItem) {
    navigate(`/courses/${id}/learn/${encodeURIComponent(item.id)}`)
  }

  function completeLesson() {
    if (!active || active.type !== 'read' || saving || !id) return
    setSaving(true)
    try {
      const result = completeRead(id, active.id, user?.name || 'Johnson Mugisha')
      setData(result)
      if (next) go(next)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not save progress.')
    } finally {
      setSaving(false)
    }
  }

  function submitQuizForm() {
    if (!active || active.type !== 'quiz' || saving || !id) return
    setSaving(true)
    try {
      const result = submitQuiz(id, active.id, picked, user?.name || 'Johnson Mugisha')
      setQuizResult({ score: result.score, passed: result.passed, attemptNumber: result.attemptNumber, correct: result.correct, total: result.total })
      setData((prev) => prev ? {
        ...prev,
        progress: result.progress,
        completedIds: result.completedIds,
        certificateId: result.certificateId,
        status: result.status,
      } : prev)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not submit the quiz.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="classroom">
      {/* ── SIDEBAR ── */}
      <aside className="cls-side">
        <div className="cls-side-inner">
          <Link className="cls-back" to={catalogCourse ? `/courses/${catalogCourse.slug}` : '/courses'}>
            ‹ Back to course
          </Link>
          <h2 className="cls-title">{title}</h2>

          <div className="cls-progress-block">
            <div className="cls-progress-row">
              <span>{data.progress}% complete</span>
              <span>{data.completed}/{data.total}</span>
            </div>
            <div className="cls-progress-bar">
              <div className="cls-progress-fill" style={{ width: `${data.progress}%` }} />
            </div>
            <div className="cls-progress-meta">
              <span><BookOpen size={12} /> {completedModules}/{totalModules} modules</span>
              {data.certificateId && (
                <Link to={`/certificates/${data.certificateId}`} className="cls-cert-link">
                  <Award size={12} /> Certificate ready
                </Link>
              )}
            </div>
          </div>

          <nav className="cls-nav" aria-label="Course lessons">
            {data.modules.map((mod, mi) => {
              const modDone = mod.lessons.every((l) => done.has(l.id))
              return (
                <div key={mod.id} className="cls-module">
                  <div className={`cls-mod-head${modDone ? ' cls-mod-done' : ''}`}>
                    <span className="cls-mod-num">{String(mi + 1).padStart(2, '0')}</span>
                    <span>{mod.title}</span>
                    {modDone && <CheckCircle2 size={14} />}
                  </div>
                  {mod.lessons.map((item) => {
                    const isActive = item.id === active.id
                    const isDone = done.has(item.id)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`cls-lesson${isActive ? ' cls-active' : ''}${isDone ? ' cls-done' : ''}`}
                        onClick={() => go(item)}
                      >
                        <span className="cls-lesson-icon">
                          {isDone
                            ? <CheckCircle2 size={15} />
                            : item.type === 'quiz'
                              ? <Zap size={15} />
                              : <Circle size={15} />}
                        </span>
                        <span className="cls-lesson-text">
                          <span className="cls-lesson-title">{item.title}</span>
                          <span className="cls-lesson-meta">
                            {item.type === 'quiz' ? `Quiz · ${item.passScore ?? 70}% to pass` : `Lesson · ${item.minutes ?? 6} min`}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="cls-main">
        {/* top bar */}
        <div className="cls-topbar">
          <div className="cls-breadcrumb">
            <span>{active.moduleTitle}</span>
            <ChevronRight size={14} />
            <span>{active.title}</span>
          </div>
          <div className="cls-topbar-right">
            {active.type === 'read' && (
              <span className="cls-time"><Clock size={13} /> {active.minutes ?? 6} min read</span>
            )}
            {active.type === 'quiz' && (
              <span className="cls-quiz-tag"><Zap size={13} /> Quiz</span>
            )}
          </div>
        </div>

        <div className="cls-content">
          <h1 className="cls-lesson-h1">{active.title}</h1>

          {/* LESSON */}
          {active.type === 'read' && (
            <>
              <div className="cls-prose">
                {(active.body ?? []).map((para, i) => <p key={i}>{para}</p>)}
              </div>

              {data.status === 'completed' && data.certificateId && (
                <div className="cls-completed-banner">
                  <GraduationCap size={24} />
                  <div>
                    <strong>Course completed!</strong>
                    <p>Your certificate of completion is ready to download.</p>
                  </div>
                  <Link className="btn btn-green" to={`/certificates/${data.certificateId}`}>
                    <Award size={16} /> Get certificate
                  </Link>
                </div>
              )}

              <div className="cls-lesson-footer">
                <div className="cls-lesson-nav">
                  {currentIndex > 0 && (
                    <button type="button" className="btn btn-ghost" onClick={() => go(items[currentIndex - 1])}>
                      ‹ Previous
                    </button>
                  )}
                  {done.has(active.id) ? (
                    next ? (
                      <button type="button" className="btn btn-green" onClick={() => go(next)}>
                        Next lesson <ChevronRight size={16} />
                      </button>
                    ) : (
                      <span className="cls-lesson-complete-badge">
                        <CheckCircle2 size={16} /> All lessons done!
                      </span>
                    )
                  ) : (
                    <button type="button" className="btn btn-green" onClick={completeLesson} disabled={saving}>
                      {saving ? 'Saving…' : 'Mark as complete'}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* QUIZ */}
          {active.type === 'quiz' && (
            <div className="cls-quiz">
              <div className="cls-quiz-intro">
                <Zap size={20} />
                <div>
                  <strong>Module assessment</strong>
                  <p>Score at least {active.passScore ?? 70}% to unlock the next module. You can retry as many times as needed.</p>
                </div>
              </div>

              {quizResult && (
                <div className={`cls-quiz-result ${quizResult.passed ? 'cls-quiz-pass' : 'cls-quiz-fail'}`}>
                  <span className="cls-quiz-score">{quizResult.score}%</span>
                  <div>
                    <strong>{quizResult.passed ? 'Passed!' : 'Not quite — try again'}</strong>
                    <p>Attempt {quizResult.attemptNumber} · {quizResult.correct}/{quizResult.total} correct</p>
                  </div>
                  {quizResult.passed && next && (
                    <button className="btn btn-green" type="button" onClick={() => go(next)}>
                      Continue <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); submitQuizForm() }} className="cls-quiz-form">
                {(active.questions ?? []).map((q, qi) => (
                  <fieldset key={q.id} className="cls-qfield">
                    <legend className="cls-qlegend">
                      <span className="cls-qnum">Q{qi + 1}</span>
                      {q.prompt}
                    </legend>
                    <div className="cls-options">
                      {q.options.map((opt, oi) => {
                        const sel = picked[qi] === oi
                        return (
                          <label key={opt} className={`cls-option${sel ? ' cls-option-sel' : ''}`}>
                            <input
                              type="radio"
                              name={q.id}
                              checked={sel}
                              onChange={() => setPicked((prev) => {
                                const next2 = [...prev]
                                next2[qi] = oi
                                return next2
                              })}
                            />
                            <span className="cls-option-letter">{String.fromCharCode(65 + oi)}</span>
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                ))}

                <div className="cls-quiz-footer">
                  <button
                    type="submit"
                    className="btn btn-green"
                    disabled={saving || !(active.questions ?? []).every((_, i) => Number.isInteger(picked[i]))}
                  >
                    {saving ? 'Checking…' : done.has(active.id) ? 'Retake quiz' : 'Submit answers'}
                  </button>
                  {done.has(active.id) && next && (
                    <button type="button" className="btn btn-ghost" onClick={() => go(next)}>
                      Skip to next <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
