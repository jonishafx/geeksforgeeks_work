import { Link } from 'react-router-dom'
import { ArrowRight, Signal, TrendingUp } from 'lucide-react'
import { CourseCover } from '../components/CourseCover'
import { coursePath, courses, exploreTopics } from '../data/catalog'
import { STUDENT_GITHUB, STUDENT_NAME, STUDENT_REG } from '../data/classroom'
import type { Course } from '../types'

const must = [
  { to: '/trending', label: 'Trending Now' },
  { to: '/videos', label: 'Watch Videos' },
  { to: '/coding-contest', label: 'Coding Contest' },
  { to: '/advertise', label: 'Advertise with Us' },
]

const featuredIds = [
  'dsa-system-design',
  'ai-engineering',
  'devops-cloud',
  'java-backend',
  'mern',
  'system-design',
] as const

const featuredCourses = featuredIds
  .map((id) => courses.find((item) => item.id === id))
  .filter((item): item is Course => Boolean(item))

function cardTitle(title: string) {
  const parts = title.match(/^(.*?)\s[-–]\s(.*)$/)
  if (!parts) return title
  return (
    <>
      {parts[1]} -<br />
      {parts[2]}
    </>
  )
}

export function Home() {
  return (
    <>
      <section className="demo-band">
        <div className="wrap">
          <p>
            <strong>Sample classroom.</strong> Courses, articles, and progress on this site are dummy data kept in the browser.
            {' '}{STUDENT_NAME} · {STUDENT_REG}
          </p>
          <a href={STUDENT_GITHUB} target="_blank" rel="noreferrer">View GitHub</a>
        </div>
      </section>

      <section className="hero">
        <div className="wrap">
          <h1>Start Your Learning Today!</h1>
          <div className="hero-pills">
            <Link className="btn btn-green" to="/courses/dsa-system-design-live">Placement 360</Link>
            <Link className="btn btn-ghost" to="/courses/ai-engineering-live">Data Science 360</Link>
            <Link className="btn btn-ghost" to="/courses/mern-full-stack">Full Stack Dev</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap explore-wrap">
          <h2>Explore</h2>
          <div className="explore-grid">
            {exploreTopics.slice(0, 6).map((topic) => (
              <Link
                key={topic.slug}
                to={
                  topic.slug === 'practice' ? '/practice'
                  : topic.slug === 'interview' ? '/interview'
                  : `/learn?cat=${encodeURIComponent(topic.title)}`
                }
                className="explore-card"
                style={{ background: topic.color }}
              >
                <h3>{topic.title}</h3>
                <span className="btn btn-outline-white btn-sm">View more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="advertise">
        <div className="wrap">
          <div className="ad-banner">
            <h3>Interested in advertising with us?</h3>
            <a className="btn btn-ghost" href="mailto:hello@geekpath.dev">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap courses-wrap">
          <div className="section-head">
            <h2>Courses</h2>
            <Link className="btn-view-all" to="/courses">View All</Link>
          </div>
          <div className="home-course-grid">
            {featuredCourses.map((course) => (
              <article key={course.id} className="home-course">
                <Link to={coursePath(course)} className="home-course-cover" aria-label={course.title}>
                  <CourseCover course={course} showRating />
                </Link>
                <div className="home-course-body">
                  <h3><Link to={coursePath(course)}>{cardTitle(course.title)}</Link></h3>
                  <p className="offer-level"><Signal size={14} /> {course.level}</p>
                  <div className="home-course-foot">
                    <span className="offer-geeks">
                      <TrendingUp size={15} strokeWidth={2.4} />
                      {course.interested} interested Geeks
                    </span>
                    <Link className="explore-now" to={coursePath(course)}>Explore now</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Must Explore</h2>
          <div className="must-grid">
            {must.map((item) => (
              <Link key={item.label} to={item.to} className="must-card">
                {item.label}
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
