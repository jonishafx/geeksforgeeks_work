import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Award, Download, Share2, Shield, CheckCircle2 } from 'lucide-react'
import { findCertificate } from '../data/classroom'

type CertData = {
  id: string
  studentName: string
  courseTitle: string
  issuedAt: string
  verifyUrl?: string
}

function CertCard({ cert, verified = false }: { cert: CertData; verified?: boolean }) {
  const date = new Date(cert.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  function handlePrint() {
    window.print()
  }

  function handleShare() {
    const url = `${window.location.origin}/verify/${cert.id}`
    navigator.clipboard?.writeText(url)
    alert('Verification link copied to clipboard!')
  }

  return (
    <div className="cert-page">
      {/* Action bar — hidden on print */}
      <div className="cert-actions no-print">
        <div className="cert-actions-left">
          <Link to="/dashboard" className="btn btn-ghost">‹ Dashboard</Link>
        </div>
        <div className="cert-actions-right">
          <button className="btn btn-ghost" onClick={handleShare}>
            <Share2 size={16} /> Share link
          </button>
          <button className="btn btn-green" onClick={handlePrint}>
            <Download size={16} /> Download / Print
          </button>
        </div>
      </div>

      {verified && (
        <div className="cert-verified-banner no-print">
          <Shield size={18} />
          <span>This certificate has been verified as authentic</span>
          <CheckCircle2 size={18} style={{ color: '#0d7a56' }} />
        </div>
      )}

      {/* Actual certificate sheet */}
      <div className="cert-sheet" id="cert-print">
        <div className="cert-bg-lines" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} />)}
        </div>

        <header className="cert-header">
          <div className="cert-brand">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="#2f8f4e" />
              <path d="M10 20 L20 10 L30 20 L20 30 Z" fill="white" opacity="0.3" />
              <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">G</text>
            </svg>
            <div>
              <span className="cert-brand-name">GeekPath</span>
              <span className="cert-brand-sub">Sample certificate</span>
            </div>
          </div>
        </header>

        <div className="cert-body">
          <p className="cert-this-is">This certifies that</p>
          <h1 className="cert-student">{cert.studentName}</h1>
          <p className="cert-completed">has successfully completed the</p>
          <h2 className="cert-course">{cert.courseTitle}</h2>
          <p className="cert-desc">
            demonstrating proficiency through lessons, practical exercises, and module assessments.
          </p>
        </div>

        <div className="cert-ribbon">
          <Award size={28} />
        </div>

        <footer className="cert-footer">
          <div className="cert-footer-col">
            <span className="cert-label">Date of Completion</span>
            <strong>{date}</strong>
          </div>
          <div className="cert-footer-divider" />
          <div className="cert-footer-col cert-footer-mid">
            <div className="cert-seal">
              <Shield size={20} />
              <span>Verified</span>
            </div>
            <span className="cert-id">ID: {cert.id}</span>
          </div>
          <div className="cert-footer-divider" />
          <div className="cert-footer-col">
            <span className="cert-label">Verify at</span>
            <span className="cert-verify-url">/verify/{cert.id}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export function Certificate() {
  const { id } = useParams<{ id: string }>()
  const [cert, setCert] = useState<CertData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const found = findCertificate(id)
    if (found) setCert(found)
    else setError('Certificate not found in the sample records.')
  }, [id])

  if (error) {
    return (
      <div className="cert-page">
        <div className="cert-error">
          <Award size={40} strokeWidth={1.5} />
          <h2>Certificate Not Found</h2>
          <p>{error}</p>
          <Link className="btn btn-green" to="/dashboard">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  if (!cert) {
    return (
      <div className="cert-page">
        <div className="cert-loading">
          <div className="cl-spinner" />
          <p>Loading certificate…</p>
        </div>
      </div>
    )
  }

  return <CertCard cert={cert} />
}

export function CertificateVerify() {
  const { id } = useParams<{ id: string }>()
  const [cert, setCert] = useState<CertData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const found = findCertificate(id)
    if (found) setCert(found)
    else setError('Certificate not found in the sample records.')
  }, [id])

  if (error) {
    return (
      <div className="cert-page">
        <div className="cert-error">
          <Shield size={40} strokeWidth={1.5} style={{ color: '#dc2626' }} />
          <h2>Invalid Certificate</h2>
          <p>{error}</p>
          <Link className="btn btn-green" to="/">Go Home</Link>
        </div>
      </div>
    )
  }

  if (!cert) {
    return (
      <div className="cert-page">
        <div className="cert-loading">
          <div className="cl-spinner" />
          <p>Verifying certificate…</p>
        </div>
      </div>
    )
  }

  return <CertCard cert={cert} verified={true} />
}
