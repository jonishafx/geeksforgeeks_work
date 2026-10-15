import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Clock, Code2, CreditCard, Database, Globe, Layers, Network, Phone, Play,
  Search, Server, Shield, Signal, Star, Ticket, TrendingUp, X, Zap,
} from 'lucide-react'
import { CourseCover } from '../components/CourseCover'
import { coursePath, courses, findCourse } from '../data/catalog'
import { courseExtras } from '../data/courseExtra'
import { useApp } from '../context/AppContext'
import { Missing } from './Learn'
import type { Course } from '../types'

// Map tech name → simple icon
const techIconMap: Record<string, React.ReactNode> = {
  'PostgreSQL': <Database size={16} />, 'Redis': <Server size={16} />,
  'REST APIs': <Globe size={16} />, 'GraphQL': <Code2 size={16} />,
  'gRPC': <Network size={16} />, 'WebSockets': <Zap size={16} />,
  'Apache Kafka': <Layers size={16} />, 'Kafka': <Layers size={16} />,
  'Microservices': <Network size={16} />, 'AWS Cloud': <Globe size={16} />,
  'AWS': <Globe size={16} />, 'GitHub Actions': <Code2 size={16} />,
  'Prometheus': <Signal size={16} />, 'Grafana': <Signal size={16} />,
  'JWT': <Shield size={16} />, 'Docker': <Layers size={16} />,
  'Kubernetes': <Network size={16} />, 'Terraform': <Server size={16} />,
  'React': <Code2 size={16} />, 'Node.js': <Server size={16} />,
  'MongoDB': <Database size={16} />, 'TypeScript': <Code2 size={16} />,
  default: <Code2 size={16} />,
}
function getTechIcon(name: string) {
  return techIconMap[name] ?? techIconMap['default']
}

// Map skill → icon
const skillIcons = [
  <Signal size={15} />, <TrendingUp size={15} />, <Database size={15} />,
  <Server size={15} />, <Globe size={15} />, <Shield size={15} />,
  <Zap size={15} />, <Layers size={15} />, <Network size={15} />,
  <Code2 size={15} />,
]

const tracks = [
  { id: 'dsa-placements', label: 'DSA / Placements' },
  { id: 'data-science', label: 'Data Analytics / Data Science' },
  { id: 'development', label: 'Development' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'snowflake', label: 'Snowflake' },
] as const

const courseTrack: Record<string, string[]> = {
  'system-design': ['dsa-placements'],
  'dsa-system-design': ['dsa-placements'],
  'placement-360': ['dsa-placements'],
  'ai-engineering': ['data-science'],
  mern: ['development', 'mongodb'],
  'java-backend': ['development'],
  'devops-cloud': ['development'],
}

const dsaOrder = ['system-design', 'dsa-system-design', 'placement-360']

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="offer-card">
      <Link to={coursePath(course)} className="offer-cover-link" aria-label={course.title}>
        <CourseCover course={course} />
      </Link>
      <div className="offer-body">
        <div className="offer-stats">
          <span className="offer-geeks">
            <TrendingUp size={15} strokeWidth={2.4} />
            {course.interested} interested Geeks
          </span>
          <span className="offer-rating">
            <Star size={13} fill="#f5b301" color="#f5b301" />
            {course.rating.toFixed(1)}
          </span>
        </div>
        <h3><Link to={coursePath(course)}>{course.title}</Link></h3>
        <p className="offer-level"><Signal size={14} /> {course.level}</p>
        {course.seats && (
          <p className="offer-seats"><Ticket size={14} /> {course.seats}</p>
        )}
        <div className="offer-price">
          <b>{course.price}</b>
          <s>{course.oldPrice}</s>
        </div>
        <Link className="btn-explore" to={coursePath(course)}>Explore</Link>
      </div>
    </article>
  )
}

export function Courses() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const track = slug || params.get('track') || 'dsa-placements'
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const list = courses.filter((course) => {
      const tags = courseTrack[course.id] || []
      if (track !== 'all' && !tags.includes(track)) return false
      if (type === 'Live' && !course.live) return false
      if (query && !course.title.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
    return [...list].sort((a, b) => {
      const ai = dsaOrder.indexOf(a.id)
      const bi = dsaOrder.indexOf(b.id)
      if (ai === -1 && bi === -1) return 0
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })
  }, [track, type, query])

  return (
    <section className="catalogue">
      <div className="catalogue-hero">
        <div className="wrap">
          <div className="catalogue-head">
            <div className="catalogue-copy">
              <h1>Course Catalogue</h1>
              <p>
                Interactive LIVE & Self-Paced Courses with Individual Attention by
                Industry Leading Gurus to Encourage Out-of-the-box thinking,
                leading to Clarity in Concepts, Creativity and Innovative Ideas.
              </p>
              <a className="catalogue-phone" href="tel:08069289001">
                <Phone size={16} strokeWidth={2.2} />
                08069289001
              </a>
            </div>
            <form className="catalogue-search" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="What do you want to learn today?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search courses"
              />
              <button className="search-go" type="submit" aria-label="Search">
                <Search size={18} strokeWidth={2.4} />
              </button>
            </form>
          </div>

          <label className="course-type">
            <span>COURSE TYPE</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>All</option>
              <option>Live</option>
              <option>Self-Paced</option>
            </select>
          </label>
        </div>
      </div>

      <div className="catalogue-panel">
        <div className="wrap courses-wrap">
          <div className="ibm-row">
            <span className="ibm-badge" aria-label="IBM">
              <svg viewBox="0 0 60 24" width="40" height="16" aria-hidden="true">
                <g fill="#3F65B5">
                  <rect x="0" y="0" width="22" height="2.1" />
                  <rect x="0" y="3.1" width="22" height="2.1" />
                  <rect x="0" y="6.2" width="8" height="2.1" />
                  <rect x="14" y="6.2" width="8" height="2.1" />
                  <rect x="0" y="9.3" width="8" height="2.1" />
                  <rect x="14" y="9.3" width="8" height="2.1" />
                  <rect x="0" y="12.4" width="8" height="2.1" />
                  <rect x="14" y="12.4" width="8" height="2.1" />
                  <rect x="0" y="15.5" width="22" height="2.1" />
                  <rect x="0" y="18.6" width="22" height="2.1" />
                  <rect x="25" y="0" width="10" height="2.1" />
                  <rect x="26.6" y="3.1" width="6.8" height="2.1" />
                  <rect x="27.8" y="6.2" width="4.4" height="2.1" />
                  <rect x="28.6" y="9.3" width="2.8" height="5.2" />
                  <rect x="27.8" y="15.5" width="4.4" height="2.1" />
                  <rect x="26.6" y="18.6" width="6.8" height="2.1" />
                  <rect x="38" y="0" width="22" height="2.1" />
                  <rect x="38" y="3.1" width="22" height="2.1" />
                  <rect x="38" y="6.2" width="8" height="2.1" />
                  <rect x="52" y="6.2" width="8" height="2.1" />
                  <rect x="38" y="9.3" width="8" height="2.1" />
                  <rect x="52" y="9.3" width="8" height="2.1" />
                  <rect x="38" y="12.4" width="8" height="2.1" />
                  <rect x="52" y="12.4" width="8" height="2.1" />
                  <rect x="38" y="15.5" width="22" height="2.1" />
                  <rect x="38" y="18.6" width="22" height="2.1" />
                </g>
              </svg>
            </span>
          </div>

          <div className="course-tabs" role="tablist" aria-label="Course categories">
            {tracks.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={track === item.id}
                className={track === item.id ? 'on' : ''}
                onClick={() => navigate(`/courses/category/${item.id}`)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="offer-grid">
            {rows.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
          {rows.length === 0 && <p className="lede">No courses in this category yet.</p>}
        </div>
      </div>
    </section>
  )
}

export function CourseDetail() {
  const { id } = useParams()
  const course = findCourse(id)
  const navigate = useNavigate()
  const { user, enrollments, enroll, openAuth, updateUser } = useApp()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [sylTab, setSylTab] = useState(0)  // 0 = main course, 1 = AI Toolkit
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [enrollStep, setEnrollStep] = useState<'register' | 'payment'>('register')
  const [enrollPhone, setEnrollPhone] = useState('')
  const [enrollWhatsApp, setEnrollWhatsApp] = useState(true)
  const [enrollError, setEnrollError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [payForm, setPayForm] = useState({
    method: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    momoPhone: '',
  })
  const _offerEnd = useMemo(() => new Date('2026-11-01T15:00:00'), [])
  void useCountdown(_offerEnd) // timer reserved for future use

  useEffect(() => {
    if (user?.phone) setEnrollPhone(user.phone)
  }, [user?.phone])

  useEffect(() => {
    if (!course) return
    const pending = sessionStorage.getItem('pendingEnroll')
    if (user && pending === course.id && !enrollments.includes(course.id)) {
      sessionStorage.removeItem('pendingEnroll')
      setEnrollStep('register')
      setEnrollOpen(true)
    }
  }, [user, course, enrollments])

  if (!course) return <Missing />

  const extra = courseExtras[course.id]
  const enrolled = enrollments.includes(course.id)
  const stars = Math.round(course.rating)
  const courseId = course.id
  const courseSlug = course.slug
  const coursePrice = course.price

  function playVideo() {
    const el = videoRef.current
    if (!el) return
    setPlaying(true)
    el.play().catch(() => undefined)
  }

  function onCta() {
    if (enrolled) {
      navigate(`/courses/${courseSlug}/learn`)
      return
    }
    if (!user) {
      sessionStorage.setItem('pendingEnroll', courseId)
      openAuth('login')
      return
    }
    setEnrollError(null)
    setEnrollStep('register')
    setEnrollOpen(true)
  }

  function submitRegister(e: React.FormEvent) {
    e.preventDefault()
    const phone = enrollPhone.trim()
    if (enrollWhatsApp && phone.length < 9) {
      setEnrollError('Enter your WhatsApp number to register for this course.')
      return
    }
    updateUser({ phone, whatsappOptIn: enrollWhatsApp })
    setEnrollError(null)
    setPayForm((f) => ({ ...f, cardName: user?.name || f.cardName, momoPhone: phone || f.momoPhone }))
    setEnrollStep('payment')
  }

  function submitPayment(e: React.FormEvent) {
    e.preventDefault()
    const digits = payForm.cardNumber.replace(/\D/g, '')
    if (payForm.method === 'card') {
      if (!payForm.cardName.trim()) { setEnrollError('Enter the name on the card.'); return }
      if (digits.length < 13) { setEnrollError('Enter a valid card number.'); return }
      if (!/^\d{2}\/\d{2}$/.test(payForm.expiry.trim())) { setEnrollError('Enter expiry as MM/YY.'); return }
      if (payForm.cvv.replace(/\D/g, '').length < 3) { setEnrollError('Enter a valid CVV.'); return }
    } else if (payForm.method === 'momo') {
      if (payForm.momoPhone.trim().length < 9) { setEnrollError('Enter your Mobile Money number.'); return }
    }

    setPaying(true)
    setEnrollError(null)
    enroll(courseId, {
      phone: enrollPhone.trim(),
      whatsappOptIn: enrollWhatsApp,
      amount: coursePrice,
      paymentMethod: payForm.method,
      cardLast4: digits.slice(-4),
    })
    window.setTimeout(() => {
      setPaying(false)
      setEnrollOpen(false)
      setEnrollStep('register')
      navigate(`/courses/${courseSlug}/learn`)
    }, 700)
  }

  const allSkills = extra ? extra.skillGroups.flatMap((g) => g.skills) : []

  return (
    <div className="cd-page">
      {/* ══ HERO ══ */}
      <div className="cd-hero">
        <div className="wrap">
          {/* Breadcrumb + Title — full width */}
          <nav className="cd-crumb">
            <Link to="/courses">All Courses</Link>
            <span>›</span>
            <span>{course.live ? 'Live' : 'Self-Paced'}</span>
          </nav>
          <h1 className="cd-h1">{course.title}</h1>
          <div className="cd-hero-meta">
            <span className="cd-live-badge">Live Course</span>
            <span className="cd-meta-sep">|</span>
            <div className="cd-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} fill={i < stars ? '#f5b301' : 'none'} color="#f5b301" />
              ))}
              <a href="#reviews">{course.rating.toFixed(0)}/5 ratings</a>
            </div>
          </div>

          {/* Two-column: video (left) | panel (right) */}
          <div className="cd-hero-cols">
            <div className="cd-video-col">
              <video
                ref={videoRef}
                poster="/course-media/coding-hero.jpg"
                src="/course-media/coding-hero.mp4"
                playsInline controls={playing}
                onPlay={() => setPlaying(true)}
                onEnded={() => setPlaying(false)}
              />
              {!playing && (
                <button type="button" className="cd-play-btn" onClick={playVideo} aria-label="Play course video">
                  <Play size={28} fill="#fff" />
                </button>
              )}
            </div>

            <aside className="cd-info-panel">
              <p className="cd-interested-line">
                <TrendingUp size={15} />
                {course.interested} interested Geeks
              </p>
              <p className="cd-panel-desc">{course.description}</p>
              <ul className="cd-panel-facts">
                <li>
                  <Signal size={14} />
                  <span>{course.level}</span>
                </li>
                <li>
                  <Clock size={14} />
                  <span>{course.weeks}</span>
                </li>
                {course.seats && (
                  <li className="cd-seats-item">
                    <Ticket size={14} />
                    <span>{course.seats}</span>
                  </li>
                )}
              </ul>
              <button className="btn btn-green cd-panel-cta" onClick={onCta}>
                {enrolled ? 'Continue Learning' : user ? 'Register' : 'Login to Register'}
              </button>
            </aside>
          </div>

          {/* Urgency bar */}
          <div className="cd-urgency-bar">
            ℹ️ Hurry! Batch Closing This Sunday — Enroll Now! Need guidance?
            <a href="tel:+919217990450">Call +91-9217990450</a>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="wrap cd-content">

        {/* Overview */}
        {extra && (
          <section className="cd-overview-section">
            <h2 className="cd-center-h2">Course Overview</h2>
            <div className="cd-ov-row">
              {extra.overview.map((item) => (
                <div key={item.title} className="cd-ov-card">
                  <span className="cd-ov-icon">{item.emoji}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {extra && allSkills.length > 0 && (
          <div className="cd-bordered-card">
            <div className="cd-bc-head">
              <div className="cd-bc-icon"><Signal size={18} /></div>
              <div>
                <h3>Skills You'll Gain</h3>
                <p>Key {course.tag} concepts you'll learn and master.</p>
              </div>
            </div>
            <div className="cd-skills-table">
              {allSkills.map((skill, i) => (
                <div key={skill} className="cd-skill-row">
                  <span className="cd-skill-ico">{skillIcons[i % skillIcons.length]}</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {extra && extra.techStack.length > 0 && (
          <div className="cd-bordered-card">
            <div className="cd-bc-head">
              <div className="cd-bc-icon"><Code2 size={18} /></div>
              <div>
                <h3>Tech Stack You'll Learn</h3>
                <p>Tools and technologies you'll work with</p>
              </div>
            </div>
            <div className="cd-tech-table">
              {extra.techStack.map((tech) => (
                <div key={tech.name} className="cd-tech-row">
                  <span className="cd-tech-ico">{getTechIcon(tech.name)}</span>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {extra && extra.projects.length > 0 && (
          <div className="cd-bordered-card">
            <div className="cd-bc-head">
              <div className="cd-bc-icon"><Layers size={18} /></div>
              <div>
                <h3>Projects You'll Build{course.tag === 'DESIGN' ? ' in System Design' : ''}</h3>
                <p>Build real-world projects to apply your skills</p>
              </div>
            </div>
            <div className="cd-projects-table">
              {extra.projects.map((proj, i) => (
                <div key={proj.title} className="cd-proj-item">
                  <div className="cd-proj-ico">{skillIcons[i % skillIcons.length]}</div>
                  <div className="cd-proj-body">
                    <h4>{proj.title}</h4>
                    <p>{proj.desc}</p>
                    <div className="cd-proj-tags">
                      {proj.tags.map((t) => <span key={t} className="cd-proj-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certification */}
        <div className="cd-cert-card">
          <div className="cd-cert-left">
            <h2>Gain Recognised Certification!</h2>
            <p className="cd-cert-sub">Add value to your learnings</p>
            <ul className="cd-cert-ul">
              <li><strong>Boost Your Resume</strong><br /><span>Stand out from the crowd.</span></li>
              <li><strong>Add credibility</strong><br /><span>Earn certification from a trusted brand.</span></li>
              <li><strong>Great for placements</strong><br /><span>Makes you a stronger candidate in interviews.</span></li>
            </ul>
          </div>
          <div className="cd-cert-right">
            <div className="cd-cert-visual">
              <div className="cd-cert-vis-head">
                <span className="cd-cert-vis-badge">CERTIFICATE</span>
                <span className="cd-cert-vis-sub">OF COMPLETION</span>
              </div>
              <p className="cd-cert-vis-we">WE ARE HAPPY TO ACKNOWLEDGE THAT</p>
              <h3 className="cd-cert-vis-name">{user?.name || 'John Doe'}</h3>
              <p className="cd-cert-vis-msg">Has successfully completed the live course on<br /><b>{course.title}</b></p>
              <div className="cd-cert-vis-foot">
                <div className="cd-cert-vis-logo">
                  <svg width="20" height="20" viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#2f8f4e" /><text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">G</text></svg>
                  <span>GeeksforGeeks</span>
                </div>
                <div className="cd-cert-vis-sig">
                  <div className="cd-cert-vis-sig-line" />
                  <span>MR. SANDEEP JAIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus */}
        <section className="cd-syllabus-section" id="curriculum">
          <h2 className="cd-center-h2">Course Syllabus</h2>
          <div className="cd-syl-tabs">
            <button
              type="button"
              className={`cd-syl-tab${sylTab === 0 ? ' cd-syl-active' : ''}`}
              onClick={() => setSylTab(0)}
            >
              {course.title}
            </button>
            <button
              type="button"
              className={`cd-syl-tab${sylTab === 1 ? ' cd-syl-active' : ''}`}
              onClick={() => setSylTab(1)}
            >
              AI Toolkit for Developers
            </button>
          </div>

          <div className="cd-syl-mod-card">
            {sylTab === 0 ? course.modules.map((mod, mi) => (
              <div key={mod.id} className="cd-syl-mod">
                <h4>Module {mi + 1}: {mod.title}</h4>
                <ul className="cd-syl-lessons">
                  {mod.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
                </ul>
                {mod.caseStudy && (
                  <p className="cd-syl-case"><strong>Case Study:</strong> {mod.caseStudy}</p>
                )}
              </div>
            )) : (
              <div className="cd-syl-mod">
                <h4>Module 1: Introduction to AI Tools for Developers</h4>
                <ul className="cd-syl-lessons">
                  <li>AI-assisted coding with GitHub Copilot & Cursor</li>
                  <li>Using ChatGPT & Claude for problem-solving</li>
                  <li>Prompt engineering for technical workflows</li>
                  <li>AI-powered code review and debugging</li>
                  <li>Integrating AI APIs in your projects</li>
                </ul>
              </div>
            )}
          </div>

          <button className="btn btn-outline cd-syl-brochure" onClick={onCta}>
            Login to View Brochure
          </button>
        </section>

        {/* Mentors */}
        {extra && extra.mentors.length > 0 && (
          <section className="cd-mentors-section">
            <h2 className="cd-center-h2">Meet Your Mentors</h2>
            <div className="cd-mentors-list">
              {extra.mentors.map((mentor) => (
                <div key={mentor.name} className="cd-mentor2">
                  <div className="cd-mentor2-top">
                    <div className="cd-mentor2-avatar">
                      {mentor.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="cd-mentor2-info">
                      <h4>{mentor.name}</h4>
                      <p>{mentor.role}</p>
                    </div>
                    <div className="cd-mentor2-socials">
                      <span title="Video sessions">🎥</span>
                      <span title="LinkedIn">in</span>
                    </div>
                  </div>
                  <hr className="cd-mentor2-sep" />
                  <ul className="cd-mentor2-ach">
                    {mentor.achievements.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Batches */}
        {extra && extra.batches.length > 0 && (
          <section className="cd-batches-section">
            <h2 className="cd-center-h2">Upcoming Batches</h2>
            <div className="cd-batches-list">
              {extra.batches.map((batch) => (
                <div key={batch.name} className="cd-batch2">
                  <div className="cd-batch2-header">
                    <div className="cd-batch2-col">
                      <small>BATCH</small>
                      <strong>{batch.name}</strong>
                    </div>
                    {batch.mentor && (
                      <div className="cd-batch2-col cd-batch2-right">
                        <small>MENTOR</small>
                        <a className="cd-batch2-mentor">{batch.mentor}</a>
                      </div>
                    )}
                  </div>
                  <div className="cd-batch2-row">
                    <div className="cd-batch2-col">
                      <small>STARTING FROM</small>
                      <strong>{batch.start}</strong>
                    </div>
                    <div className="cd-batch2-col cd-batch2-right">
                      <small>TIMINGS</small>
                      <strong>{batch.timing}</strong>
                    </div>
                  </div>
                  <div className="cd-batch2-cta">
                    <button className="btn btn-green btn-wide" onClick={onCta}>Login to Register</button>
                  </div>
                  <div className="cd-batch2-price">
                    <s>{batch.oldPrice}</s>
                    <b>{batch.price}</b>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {extra && extra.testimonials.length > 0 && (
          <section className="cd-testi-section" id="reviews">
            <h2 className="cd-center-h2">Testimonials</h2>
            <div className="cd-testi-grid2">
              {extra.testimonials.map((t) => (
                <div key={t.name} className="cd-testi2">
                  <span className="cd-testi2-quote">"</span>
                  <p>{t.quote}</p>
                  <div className="cd-testi2-who">
                    <span className="cd-testi2-avatar">{t.name[0]}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.placement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {extra && extra.faq.length > 0 && (
          <section className="cd-faq-section">
            <h2 className="cd-center-h2">Frequently Asked Questions</h2>
            <div className="cd-faq2-list">
              {extra.faq.map((item, i) => (
                <div key={i} className={`cd-faq2-item${openFaq === i ? ' cd-faq2-open' : ''}`}>
                  <button
                    type="button"
                    className="cd-faq2-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="cd-faq2-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cd-faq2-text">{item.q}</span>
                    <span className="cd-faq2-chevron">{openFaq === i ? '▲' : '▼'}</span>
                  </button>
                  {openFaq === i && <div className="cd-faq2-a">{item.a}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {enrollOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="enroll-title">
          <div className="modal modal-gfg enroll-modal enroll-modal-wide">
            <button type="button" className="icon-btn modal-close" onClick={() => { setEnrollOpen(false); setEnrollStep('register') }} aria-label="Close">
              <X size={16} />
            </button>

            <div className="enroll-steps">
              <span className={enrollStep === 'register' ? 'on' : 'done'}>1. Register</span>
              <span className="enroll-steps-line" />
              <span className={enrollStep === 'payment' ? 'on' : ''}>2. Payment</span>
            </div>

            {enrollStep === 'register' ? (
              <form onSubmit={submitRegister}>
                <h2 id="enroll-title">Register for this course</h2>
                <p className="modal-sub">{course.title}</p>
                {enrollError && <div className="alert alert-err">{enrollError}</div>}
                <div className="field">
                  <label>Name</label>
                  <input value={user?.name || ''} readOnly />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={user?.email || ''} readOnly />
                </div>
                <div className="field">
                  <label htmlFor="enroll-phone">WhatsApp / Phone</label>
                  <input
                    id="enroll-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+250 7xx xxx xxx"
                    value={enrollPhone}
                    onChange={(e) => { setEnrollPhone(e.target.value); setEnrollError(null) }}
                    required={enrollWhatsApp}
                  />
                </div>
                <label className="auth-check">
                  <input type="checkbox" checked={enrollWhatsApp} onChange={(e) => setEnrollWhatsApp(e.target.checked)} />
                  Send me this course plan and new courses on WhatsApp
                </label>
                <button type="submit" className="btn btn-wide auth-green">Continue to Payment</button>
              </form>
            ) : (
              <form onSubmit={submitPayment}>
                <h2 id="enroll-title"><CreditCard size={20} style={{ marginRight: 8, verticalAlign: -4 }} />Complete payment</h2>
                <p className="modal-sub">Pay to unlock full access to this course.</p>

                <div className="pay-summary">
                  <div>
                    <strong>{course.title}</strong>
                    <span>{course.weeks || 'Live course'} · {course.level}</span>
                  </div>
                  <div className="pay-amounts">
                    {course.oldPrice && <s>{course.oldPrice}</s>}
                    <b>{course.price}</b>
                  </div>
                </div>

                {enrollError && <div className="alert alert-err">{enrollError}</div>}

                <div className="pay-methods">
                  {[
                    ['card', 'Card'],
                    ['momo', 'Mobile Money'],
                    ['paypal', 'PayPal'],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      className={`pay-method${payForm.method === id ? ' on' : ''}`}
                      onClick={() => { setPayForm((f) => ({ ...f, method: id })); setEnrollError(null) }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {payForm.method === 'card' && (
                  <>
                    <div className="field">
                      <label htmlFor="card-name">Name on card</label>
                      <input
                        id="card-name"
                        value={payForm.cardName}
                        onChange={(e) => setPayForm((f) => ({ ...f, cardName: e.target.value }))}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="card-number">Card number</label>
                      <input
                        id="card-number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={payForm.cardNumber}
                        onChange={(e) => setPayForm((f) => ({ ...f, cardNumber: e.target.value.replace(/[^\d ]/g, '').slice(0, 19) }))}
                        placeholder="ACCT-000015"
                        required
                      />
                    </div>
                    <div className="pay-row">
                      <div className="field">
                        <label htmlFor="card-exp">Expiry</label>
                        <input
                          id="card-exp"
                          value={payForm.expiry}
                          onChange={(e) => setPayForm((f) => ({ ...f, expiry: e.target.value.slice(0, 5) }))}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="card-cvv">CVV</label>
                        <input
                          id="card-cvv"
                          inputMode="numeric"
                          value={payForm.cvv}
                          onChange={(e) => setPayForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {payForm.method === 'momo' && (
                  <div className="field">
                    <label htmlFor="momo-phone">Mobile Money number</label>
                    <input
                      id="momo-phone"
                      type="tel"
                      value={payForm.momoPhone}
                      onChange={(e) => setPayForm((f) => ({ ...f, momoPhone: e.target.value }))}
                      placeholder="+250 7xx xxx xxx"
                      required
                    />
                  </div>
                )}

                {payForm.method === 'paypal' && (
                  <p className="pay-note">You will confirm PayPal on the next step. For this demo, click Pay &amp; Enroll to continue.</p>
                )}

                <div className="pay-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => { setEnrollStep('register'); setEnrollError(null) }}>Back</button>
                  <button type="submit" className="btn btn-wide auth-green" disabled={paying}>
                    {paying ? 'Processing…' : `Pay ${course.price} & Enroll`}
                  </button>
                </div>
                <p className="fine">Secure checkout · Demo payment (no real charge)</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function _pad(n: number) { return String(n).padStart(2, '0') }
void _pad // reserved

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const diff = Math.max(0, target.getTime() - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}
