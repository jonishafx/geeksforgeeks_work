import { Link } from 'react-router-dom'
import { Github, Linkedin, MapPin } from 'lucide-react'
import { STUDENT_GITHUB, STUDENT_NAME, STUDENT_REG } from '../data/classroom'
import { Logo } from './Logo'

const columns = [
  {
    title: 'Company',
    links: [
      ['/learn', 'About Us'],
      ['/learn', 'Legal'],
      ['/learn', 'Privacy Policy'],
      ['/jobs', 'Careers'],
      ['/learn', 'Contact Us'],
      ['/jobs', 'Corporate Solution'],
      ['/courses', 'Campus Training Program'],
    ],
  },
  {
    title: 'Explore',
    links: [
      ['/practice', 'POTD'],
      ['/practice', 'Practice Problems'],
      ['/learn', 'Blogs'],
      ['/courses', 'Upskill Courses'],
      ['/community', 'Connect'],
    ],
  },
  {
    title: 'Tutorials',
    links: [
      ['/learn?cat=Programming Languages', 'Programming Languages'],
      ['/learn?cat=DSA', 'DSA'],
      ['/learn?cat=Web Development', 'Web Technology'],
      ['/learn?cat=AI', 'AI, ML & Data Science'],
      ['/learn?cat=DevOps', 'DevOps'],
      ['/learn?cat=CS', 'CS Core Subjects'],
      ['/learn?cat=Tools', 'Software and Tools'],
    ],
  },
  {
    title: 'Courses',
    links: [
      ['/courses/category/data-science', 'ML and Data Science'],
      ['/courses/category/dsa-placements', 'DSA and Placements'],
      ['/courses/category/development', 'Web Development'],
      ['/learn?cat=Programming Languages', 'Programming Languages'],
      ['/courses/category/development', 'DevOps & Cloud'],
      ['/courses', 'GATE'],
      ['/courses/category/mongodb', 'MongoDB'],
    ],
  },
  {
    title: 'Preparation',
    links: [
      ['/interview', 'Interview Corner'],
      ['/practice', 'Aptitude'],
      ['/practice', 'Puzzles'],
      ['/courses/placement-360', 'GfG 160'],
      ['/courses/system-design-training-program', 'System Design'],
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid five">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <Logo full size={40} />
          </Link>
          <div className="addr">
            <MapPin size={16} />
            <div>
              <b>Student project</b>
              {STUDENT_NAME} · Registration {STUDENT_REG}
              <br />
              Kigali, Rwanda · ITLSE801 Software Engineering
            </div>
          </div>
          <div className="addr">
            <Github size={16} />
            <div>
              <b>GitHub</b>
              <a href={STUDENT_GITHUB} target="_blank" rel="noreferrer">{STUDENT_GITHUB}</a>
            </div>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(([to, label]) => (
                <li key={col.title + label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap social-row">
        <div className="socials">
          <a className="soc" href={STUDENT_GITHUB} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={16} /></a>
          <a className="soc" href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={16} /></a>
        </div>
        <div className="stores">
          <a className="store-badge play" href="https://play.google.com/store" aria-label="Get it on Google Play">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="#34A853" d="M3.6 2.6 13.7 12 3.6 21.4c-.7-.3-1.1-.9-1.1-1.7V4.3c0-.8.4-1.4 1.1-1.7z"/>
              <path fill="#FBBC04" d="M17 14.7 13.7 12 17 9.3l4.1 2.3c1.1.6 1.1 1.7 0 2.4L17 14.7z"/>
              <path fill="#4285F4" d="M3.6 21.4 13.7 12 17 14.7 5.1 22.2c-.6.4-1.3.1-1.5-.8z"/>
              <path fill="#EA4335" d="M17 9.3 5.1 1.8c.6-.4 1.3-.1 1.5.8L17 9.3z"/>
            </svg>
            <span>
              <em>GET IT ON</em>
              <strong>Google Play</strong>
            </span>
          </a>
          <a className="store-badge apple" href="https://www.apple.com/app-store/" aria-label="Download on the App Store">
            <svg viewBox="0 0 14 17" width="16" height="20" fill="#fff" aria-hidden="true">
              <path d="M11.4 9.1c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8C1.9 3.9.2 5.1.2 7.6c0 1.6.6 3.3 1.5 4.4.8 1 1.7 2.1 3 2.1 1.2 0 1.6-.8 3-.8s1.8.8 3 .8c1.3 0 2.1-1.1 2.9-2.1.6-.8 1-1.8 1-1.8s-2.2-.8-2.2-3.1zM9.4 2.3C10 1.5 10.4.5 10.3 0c-.9 0-1.9.6-2.5 1.3-.6.7-1 1.6-1 2.5.9.1 1.9-.5 2.6-1.5z"/>
            </svg>
            <span>
              <em>Download on the</em>
              <strong>App Store</strong>
            </span>
          </a>
        </div>
      </div>
      <div className="wrap copy">GeekPath UI demo · {STUDENT_NAME} · {STUDENT_REG}</div>
    </footer>
  )
}
