import { Link } from 'react-router-dom'
import { BarChart2, Target, Users, Globe, Mail, Phone, TrendingUp, CheckCircle2, Star } from 'lucide-react'

const STATS = [
  { value: '100M+', label: 'Monthly Page Views', icon: <Globe size={28} color="#3b82f6" /> },
  { value: '30M+', label: 'Registered Users', icon: <Users size={28} color="#2f8d46" /> },
  { value: '190+', label: 'Countries Reached', icon: <Target size={28} color="#a855f7" /> },
  { value: '8M+', label: 'Daily Active Learners', icon: <TrendingUp size={28} color="#f59e0b" /> },
]

const AD_FORMATS = [
  {
    icon: '🖥️',
    title: 'Display Ads',
    desc: 'Banner placements across our homepage, article pages, and courses — high visibility, targeted by topic.',
    badge: 'Most Popular',
    badgeColor: '#2f8d46',
    features: ['Header & Sidebar banners', 'Topic-specific targeting', 'Desktop & Mobile optimized', 'Guaranteed impressions'],
  },
  {
    icon: '📧',
    title: 'Email Campaigns',
    desc: 'Reach our engaged newsletter subscribers with sponsored content and product spotlights.',
    badge: 'High ROI',
    badgeColor: '#3b82f6',
    features: ['30M+ subscriber base', 'Segmented by skill level', 'Custom HTML templates', 'Open rate reports'],
  },
  {
    icon: '🎯',
    title: 'Sponsored Content',
    desc: "Native articles and tutorials written by our editorial team that seamlessly blend into GfG's content.",
    badge: 'Premium',
    badgeColor: '#a855f7',
    features: ['Editorial team written', 'SEO optimized', 'Long-term visibility', 'Social amplification'],
  },
  {
    icon: '🏆',
    title: 'Contest Sponsorship',
    desc: 'Sponsor our weekly and monthly coding contests to get massive brand exposure among top developers.',
    badge: 'High Engagement',
    badgeColor: '#f59e0b',
    features: ['2M+ contest participants', 'Logo on all materials', 'Leaderboard branding', 'Prize co-sponsorship'],
  },
  {
    icon: '📱',
    title: 'App Ads',
    desc: 'Reach learners directly on our highly-rated Android & iOS apps with native in-app placements.',
    badge: 'Growing Fast',
    badgeColor: '#ef4444',
    features: ['10M+ app installs', 'In-feed native format', 'Push notification ads', 'Geo & skill targeting'],
  },
  {
    icon: '🎓',
    title: 'Course Co-branding',
    desc: "Partner your brand with our certification courses for deep integration into students' learning journey.",
    badge: 'Strategic',
    badgeColor: '#0891b2',
    features: ['Certificate co-branding', 'Course content mention', 'Placement support tie-in', 'Long-term partnership'],
  },
]

const AUDIENCES = [
  { pct: 68, label: 'Software Developers', color: '#2f8d46' },
  { pct: 18, label: 'Students & Freshers', color: '#3b82f6' },
  { pct: 9, label: 'Data Scientists', color: '#a855f7' },
  { pct: 5, label: 'DevOps & Cloud', color: '#f59e0b' },
]

const FAQS = [
  { q: 'What is the minimum budget to advertise?', a: 'We offer flexible plans starting from ₹50,000/month for display ads. Enterprise campaigns are custom priced based on your goals.' },
  { q: 'How do I measure campaign performance?', a: "You'll get access to a live dashboard with impressions, clicks, CTR, and conversion metrics. Weekly PDF reports are also available." },
  { q: 'Can I target a specific audience segment?', a: 'Yes! You can target by skill level (beginner / intermediate / expert), topic (DSA, Python, System Design…), country, device type, and more.' },
  { q: 'How long does it take to go live?', a: 'Standard display ads go live within 24–48 hours of approval. Sponsored content takes 5–7 business days for editorial review.' },
]

export function Advertise() {
  return (
    <div className="adv-page">
      {/* Hero */}
      <div className="adv-hero">
        <div className="wrap adv-hero-inner">
          <div className="adv-hero-copy">
            <span className="adv-eyebrow">🚀 Advertise with Us</span>
            <h1>Reach 30 Million+ Tech Learners &amp; Developers</h1>
            <p>GeeksforGeeks is India's largest computer science learning platform. Put your brand in front of the most engaged developer community in the world.</p>
            <div className="adv-hero-btns">
              <a href="mailto:advertise@geeksforgeeks.org" className="btn btn-green">Get in Touch</a>
              <a href="#formats" className="btn btn-ghost">View Ad Formats</a>
            </div>
          </div>
          <div className="adv-hero-visual">
            <BarChart2 size={140} strokeWidth={1} color="#2f8d46" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="adv-stats-bar">
        <div className="wrap adv-stats-row">
          {STATS.map(s => (
            <div key={s.label} className="adv-stat">
              {s.icon}
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap adv-body">
        {/* Ad formats */}
        <section id="formats" className="adv-section">
          <h2>Advertising Formats</h2>
          <p className="adv-sec-sub">Multiple touchpoints to connect with developers at every stage of their learning journey.</p>
          <div className="adv-formats-grid">
            {AD_FORMATS.map(f => (
              <div key={f.title} className="adv-format-card">
                <div className="adv-format-top">
                  <span className="adv-format-icon">{f.icon}</span>
                  <span className="adv-format-badge" style={{ background: f.badgeColor }}>{f.badge}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul className="adv-features">
                  {f.features.map(feat => (
                    <li key={feat}><CheckCircle2 size={14} color="#2f8d46" /> {feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="adv-section adv-audience">
          <div className="adv-aud-copy">
            <h2>Our Audience</h2>
            <p>We reach the brightest technical minds — from college students to senior engineers at top companies.</p>
            <div className="adv-aud-bars">
              {AUDIENCES.map(a => (
                <div key={a.label} className="adv-aud-row">
                  <span className="adv-aud-label">{a.label}</span>
                  <div className="adv-aud-bar-wrap">
                    <div className="adv-aud-bar-fill" style={{ width: `${a.pct}%`, background: a.color }} />
                  </div>
                  <span className="adv-aud-pct">{a.pct}%</span>
                </div>
              ))}
            </div>
            <div className="adv-aud-tags">
              {['India', 'USA', 'UK', 'Germany', 'Canada', 'Singapore', '+184 more'].map(t => (
                <span key={t} className="adv-aud-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="adv-aud-cards">
            <div className="adv-aud-card">
              <Star size={18} color="#f59e0b" fill="#f59e0b" />
              <blockquote>"Advertising on GfG doubled our developer sign-ups in just 3 months."</blockquote>
              <strong>— Head of Marketing, CloudTech India</strong>
            </div>
            <div className="adv-aud-card">
              <Star size={18} color="#f59e0b" fill="#f59e0b" />
              <blockquote>"The quality of leads from GfG contest sponsorship was unmatched by any other channel."</blockquote>
              <strong>— Talent Acquisition Lead, FinServ Corp</strong>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="adv-section">
          <h2>Frequently Asked Questions</h2>
          <div className="adv-faqs">
            {FAQS.map(f => (
              <details key={f.q} className="adv-faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="adv-cta">
          <h2>Ready to Reach Millions of Developers?</h2>
          <p>Our team will help you craft the perfect campaign for your goals and budget.</p>
          <div className="adv-cta-contacts">
            <a href="mailto:advertise@geeksforgeeks.org" className="adv-contact-btn">
              <Mail size={18} /> advertise@geeksforgeeks.org
            </a>
            <a href="tel:+911234567890" className="adv-contact-btn">
              <Phone size={18} /> +91 12345 67890
            </a>
          </div>
          <Link to="/" className="btn btn-green adv-cta-main">Start Your Campaign Today</Link>
        </section>
      </div>
    </div>
  )
}
