import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Github, X } from 'lucide-react'
import { GoogleButton } from './GoogleButton'
import { useApp } from '../context/AppContext'

function SocialRow() {
  return (
    <div className="oauth-row">
      <button className="oauth-dot fb" type="button" aria-label="Facebook">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M14.5 8.5V6.8c0-.9.6-1.1 1-1.1h1.4V3.1h-2.4C11.7 3.1 11 5 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.3-2.8h-2.6z" />
        </svg>
      </button>
      <button className="oauth-dot li" type="button" aria-label="LinkedIn">in</button>
      <button className="oauth-dot gh" type="button" aria-label="GitHub"><Github size={14} /></button>
      <button className="oauth-dot ms" type="button" aria-label="Microsoft">
        <svg width="13" height="13" viewBox="0 0 23 23" aria-hidden="true">
          <path fill="#f25022" d="M1 1h10v10H1z" />
          <path fill="#7fba00" d="M12 1h10v10H12z" />
          <path fill="#00a4ef" d="M1 12h10v10H1z" />
          <path fill="#ffb900" d="M12 12h10v10H12z" />
        </svg>
      </button>
    </div>
  )
}

export function AuthModal() {
  const {
    authOpen, authView, setAuthView, closeAuth,
    login, loginWithGoogle, register, startReset, confirmOtp, resendOtp, resetPassword, finishTwoFactor, pendingEmail, otpPurpose,
  } = useApp()
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    university: '',
    skillLevel: 'Beginner',
    otp: '',
  })

  if (!authOpen) return null

  function onChange(key: keyof typeof form, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }))
    setError(null)
  }

  function switchView(view: 'login' | 'register' | 'forgot') {
    setError(null)
    setNotice(null)
    setAuthView(view)
  }

  async function onGoogle(payload: { accessToken?: string; credential?: string }) {
    setError(await loginWithGoogle(payload))
  }

  async function submitLogin(e: FormEvent) {
    e.preventDefault()
    setError(await login(form.email, form.password))
  }

  async function submitRegister(e: FormEvent) {
    e.preventDefault()
    const identity = form.email.trim()
    const name = identity.includes('@') ? identity.split('@')[0] : identity
    const email = identity.includes('@') ? identity : `${identity.replace(/\s+/g, '').toLowerCase()}@users.local`
    setError(await register({
      name,
      email,
      password: form.password,
      university: form.university,
    }))
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="modal modal-gfg">
        <button className="icon-btn modal-close" onClick={closeAuth} aria-label="Close"><X size={16} /></button>

        {authView === 'login' && (
          <div className="auth-pane auth-login">
            <h2 id="auth-title">Log in</h2>
            <p className="modal-sub">New user ? <button type="button" className="auth-text-link" onClick={() => switchView('register')}>Register Now</button></p>
            <p className="modal-sub">Demo account: student@geekpath.dev / password123. Codes use 123456.</p>
            <GoogleButton onSuccess={onGoogle} onError={setError} />
            <SocialRow />
            <div className="or-line">or</div>
            {error && <div className="alert alert-err">{error}</div>}
            {notice && <div className="alert">{notice}</div>}
            <form onSubmit={submitLogin}>
              <div className="field">
                <label htmlFor="login-email">Username or Email</label>
                <input id="login-email" autoComplete="username" placeholder="Username or Email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="login-password">Password</label>
                <div className="pass-wrap">
                  <input id="login-password" type={showPass ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required />
                  <button type="button" className="icon-btn pass-toggle" onClick={() => setShowPass((v) => !v)} aria-label="Toggle password">
                    {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
              <button type="button" className="auth-text-link forgot-link" onClick={() => switchView('forgot')}>Forgot password</button>
              <button type="submit" className="btn btn-wide auth-green">Sign In</button>
            </form>
            <p className="fine">By creating this account, you agree to our <b>Privacy Policy</b> &amp; <b>Cookie Policy</b>.</p>
          </div>
        )}

        {authView === 'register' && (
          <form className="auth-pane auth-register" onSubmit={submitRegister}>
            <h2 id="auth-title">Create Account</h2>
            <p className="modal-sub">Already have an account ? <button type="button" className="auth-text-link" onClick={() => switchView('login')}>Log in</button></p>
            {error && <div className="alert alert-err">{error}</div>}
            <div className="field">
              <label htmlFor="reg-email">Username or Email</label>
              <input id="reg-email" name="email" autoComplete="username" placeholder="Username or Email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="reg-password">Password</label>
              <div className="pass-wrap">
                <input id="reg-password" name="password" type={showPass ? 'text' : 'password'} autoComplete="new-password" placeholder="Enter password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required />
                <button type="button" className="icon-btn pass-toggle" onClick={() => setShowPass((v) => !v)} aria-label="Toggle password">
                  {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className="field">
              <label htmlFor="reg-org">Institution / Organization</label>
              <input id="reg-org" name="university" autoComplete="organization" placeholder="Enter Institution / Organization name" value={form.university} onChange={(e) => onChange('university', e.target.value)} />
            </div>
            <button type="submit" className="btn btn-wide auth-green">Sign Up</button>
            <div className="or-line">or</div>
            <GoogleButton onSuccess={onGoogle} onError={setError} />
            <SocialRow />
          </form>
        )}

        {authView === 'forgot' && (
          <form onSubmit={async (e) => { e.preventDefault(); setError(await startReset(form.email)) }}>
            <h2 id="auth-title">Forgot password</h2>
            <p className="modal-sub">We’ll email a 6-digit code to reset your password.</p>
            {error && <div className="alert alert-err">{error}</div>}
            <div className="field">
              <label htmlFor="forgot-email">Email</label>
              <input id="forgot-email" type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required />
            </div>
            <button className="btn btn-wide auth-green">Send code</button>
            <button type="button" className="auth-text-link auth-back" onClick={() => switchView('login')}>Back to log in</button>
          </form>
        )}

        {authView === 'otp' && (
          <form onSubmit={async (e) => { e.preventDefault(); setError(await confirmOtp(form.otp)) }}>
            <h2 id="auth-title">{otpPurpose === 'reset' ? 'Reset code' : otpPurpose === '2fa' ? 'Sign-in code' : 'Verify email'}</h2>
            <p className="modal-sub">Demo code for {pendingEmail} is 123456. It is not emailed.</p>
            {error && <div className="alert alert-err">{error}</div>}
            {notice && <div className="alert">{notice}</div>}
            <div className="field">
              <label htmlFor="otp">OTP</label>
              <input id="otp" value={form.otp} onChange={(e) => onChange('otp', e.target.value)} placeholder="Enter code" required />
            </div>
            <button className="btn btn-wide auth-green">Verify</button>
            <button
              type="button"
              className="auth-text-link auth-back"
              onClick={async () => {
                const msg = await resendOtp()
                if (msg) setError(msg)
                else setNotice('A new code was sent.')
              }}
            >
              Resend code
            </button>
          </form>
        )}

        {authView === 'reset' && (
          <form onSubmit={async (e) => { e.preventDefault(); if (form.password !== form.confirm) { setError('Passwords do not match.'); return } await resetPassword(form.password); setNotice('Password updated. Sign in.') }}>
            <h2 id="auth-title">New password</h2>
            {error && <div className="alert alert-err">{error}</div>}
            {notice && <div className="alert">{notice}</div>}
            <div className="field"><label>Password</label><input type="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required /></div>
            <div className="field"><label>Confirm</label><input type="password" value={form.confirm} onChange={(e) => onChange('confirm', e.target.value)} required /></div>
            <button className="btn btn-wide auth-green">Save password</button>
          </form>
        )}

        {authView === 'twoFactor' && (
          <form onSubmit={async (e) => { e.preventDefault(); setError(await finishTwoFactor(form.otp) ? null : 'Incorrect or expired OTP.') }}>
            <h2 id="auth-title">Sign-in code</h2>
            <p className="modal-sub">Demo code for {pendingEmail} is 123456.</p>
            {error && <div className="alert alert-err">{error}</div>}
            <div className="field"><label>OTP</label><input value={form.otp} onChange={(e) => onChange('otp', e.target.value)} placeholder="Enter code" required /></div>
            <button className="btn btn-wide auth-green">Continue</button>
          </form>
        )}

        {authView === 'setup' && (
          <form onSubmit={(e) => { e.preventDefault(); closeAuth() }}>
            <h2 id="auth-title">You’re in</h2>
            <p className="modal-sub">What do you want to learn first?</p>
            <div className="field">
              <label>Interest</label>
              <select value={form.skillLevel} onChange={(e) => onChange('skillLevel', e.target.value)}>
                <option>DSA</option><option>Web Development</option><option>AI / ML</option><option>Cloud</option>
              </select>
            </div>
            <button className="btn btn-wide auth-green">Go to dashboard</button>
          </form>
        )}
      </div>
    </div>
  )
}
