import { useEffect, useState, type FormEvent } from 'react'
import { Headphones, Phone, X } from 'lucide-react'
const countries = ['Rwanda', 'Kenya', 'Uganda', 'Nigeria', 'India', 'United States', 'United Kingdom', 'Other']
const years = Array.from({ length: 12 }, (_, i) => String(2028 - i))

export function HelpTip() {
  const [panel, setPanel] = useState<'closed' | 'teaser' | 'form'>('closed')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    country: '',
    phone: '',
    email: '',
    year: '',
  })

  useEffect(() => {
    if (panel !== 'closed') return
    const timer = window.setTimeout(() => setPanel('teaser'), 20_000)
    return () => window.clearTimeout(timer)
  }, [panel])

  const ready = Boolean(form.name && form.country && form.phone && form.email && form.year)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!ready) return
    setSent(true)
  }

  function close() {
    setPanel('closed')
    setSent(false)
  }

  return (
    <div className="help-dock">
      {panel === 'teaser' && (
        <div className="help-bubble" role="dialog" aria-label="SkillUp help">
          <button className="help-close" type="button" aria-label="Close" onClick={close}>
            <X size={14} strokeWidth={2.6} />
          </button>
          <p>Let Us Help You In Your SkillUp Journey!</p>
          <a className="help-phone" href="tel:+250780000000">
            <Phone size={16} />
            +250 780 000 000
          </a>
        </div>
      )}

      {panel === 'form' && (
        <div className="help-form" role="dialog" aria-labelledby="help-form-title">
          <button className="help-close" type="button" aria-label="Close" onClick={close}>
            <X size={14} strokeWidth={2.6} />
          </button>
          <div className="help-form-head">
            <h3 id="help-form-title">Let Us Help You In Your SkillUp Journey!</h3>
            <a className="help-call" href="tel:+250780000000">
              <Phone size={14} />
              +250 780 000 000
            </a>
          </div>

          {sent ? (
            <p className="help-thanks">Saved on this device. This form does not send anything to a server.</p>
          ) : (
            <form onSubmit={onSubmit}>
              <label className="help-field">
                <span>Name <i>*</i></span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </label>
              <div className="help-split">
                <label className="help-field">
                  <span>Country</span>
                  <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                    <option value="">Select</option>
                    {countries.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="help-field">
                  <span>Phone No. <i>*</i></span>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </label>
              </div>
              <label className="help-field">
                <span>Email <i>*</i></span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </label>
              <label className="help-field help-year">
                <span>Graduation Year <i>*</i></span>
                <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required>
                  <option value="">Select</option>
                  {years.map((year) => <option key={year}>{year}</option>)}
                </select>
              </label>
              <button className="help-submit" type="submit" disabled={!ready}>Submit</button>
            </form>
          )}
        </div>
      )}

      <button
        className={`help-fab${panel === 'form' ? ' on' : ''}`}
        type="button"
        aria-label="Help"
        onClick={() => setPanel((value) => (value === 'form' ? 'closed' : 'form'))}
      >
        {panel === 'form' ? <X size={22} /> : <Headphones size={22} />}
      </button>
    </div>
  )
}
