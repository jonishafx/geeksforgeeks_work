import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthView, Submission, Theme, User } from '../types'
import { STUDENT_GITHUB, STUDENT_NAME, STUDENT_REG } from '../data/classroom'

const STORAGE = 'geekpath-state-v2'
const DEMO_OTP = '123456'

interface Persisted {
  users: User[]
  sessionId: string | null
  theme: Theme
  bookmarks: string[]
  solved: string[]
  attempted: string[]
  enrollments: string[]
  xp: number
  streak: number
  lastPotd: string | null
  submissions: Submission[]
  pendingEmail: string | null
}

const seedUsers: User[] = [
  {
    id: 'u-admin',
    name: 'Amina Admin',
    email: 'admin@geekpath.dev',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform operator for the dummy catalog.',
    country: 'Rwanda',
    university: 'GeekPath',
    education: 'Staff',
    skillLevel: 'Advanced',
    interests: ['Platform'],
    github: '',
    linkedin: '',
    website: '',
    twoFactor: false,
    emailVerified: true,
    phone: '',
    whatsappOptIn: false,
    createdAt: '2025-01-01',
  },
  {
    id: 'u-student',
    name: STUDENT_NAME,
    email: 'student@geekpath.dev',
    password: 'password123',
    role: 'student',
    bio: `BTech IT student. Registration ${STUDENT_REG}.`,
    country: 'Rwanda',
    university: 'BTech Information Technology',
    education: 'Undergraduate',
    skillLevel: 'Intermediate',
    interests: ['DSA', 'React'],
    github: STUDENT_GITHUB,
    linkedin: '',
    website: '',
    twoFactor: false,
    emailVerified: true,
    phone: '',
    whatsappOptIn: false,
    createdAt: '2026-02-10',
  },
  {
    id: 'u-instructor',
    name: 'Coach Maya',
    email: 'instructor@geekpath.dev',
    password: 'teach123',
    role: 'instructor',
    bio: 'Sample course mentor. No live classes are connected.',
    country: 'Rwanda',
    university: 'GeekPath',
    education: 'Mentor',
    skillLevel: 'Advanced',
    interests: ['Teaching', 'DSA'],
    github: '',
    linkedin: '',
    website: '',
    twoFactor: false,
    emailVerified: true,
    phone: '',
    whatsappOptIn: false,
    createdAt: '2025-06-01',
  },
]

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE)
    if (raw) {
      const parsed = JSON.parse(raw) as Persisted
      if (!parsed.users?.length) parsed.users = seedUsers
      return parsed
    }
  } catch {
    /* ignore */
  }
  return {
    users: seedUsers,
    sessionId: 'u-student',
    theme: 'light',
    bookmarks: ['two-sum'],
    solved: ['two-sum'],
    attempted: ['two-sum'],
    enrollments: ['dsa-system-design', 'ai-engineering'],
    xp: 180,
    streak: 4,
    lastPotd: null,
    submissions: [],
    pendingEmail: null,
  }
}

interface AppContextValue {
  theme: Theme
  toggleTheme: () => void
  user: User | null
  users: User[]
  authOpen: boolean
  authView: AuthView
  openAuth: (view?: AuthView) => void
  closeAuth: () => void
  setAuthView: (view: AuthView) => void
  login: (email: string, password: string) => Promise<string | null>
  loginWithGoogle: (payload: { accessToken?: string; credential?: string }) => Promise<string | null>
  register: (input: Partial<User> & { email: string; password: string; name: string }) => Promise<string | null>
  logout: () => void
  updateUser: (patch: Partial<User>) => void
  startReset: (email: string) => Promise<string | null>
  confirmOtp: (code: string) => Promise<string | null>
  resendOtp: () => Promise<string | null>
  resetPassword: (password: string) => Promise<boolean>
  verifyEmail: () => Promise<void>
  finishTwoFactor: (code: string) => Promise<boolean>
  otpPurpose: 'verify' | 'reset' | '2fa'
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  solved: string[]
  attempted: string[]
  markAttempt: (id: string) => void
  markSolved: (id: string) => void
  enrollments: string[]
  enroll: (id: string, extra?: {
    phone?: string
    whatsappOptIn?: boolean
    amount?: string
    paymentMethod?: string
    cardLast4?: string
  }) => void
  xp: number
  addXp: (n: number) => void
  streak: number
  claimPotd: () => void
  submissions: Submission[]
  addSubmission: (row: Submission) => void
  pendingEmail: string | null
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => load())
  const [authOpen, setAuthOpen] = useState(false)
  const [authView, setAuthView] = useState<AuthView>('login')
  const [otpPurpose, setOtpPurpose] = useState<'verify' | 'reset' | '2fa'>('verify')
  const [verifiedOtp, setVerifiedOtp] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state))
    document.documentElement.dataset.theme = state.theme
  }, [state])

  const user = state.users.find((u) => u.id === state.sessionId) ?? null
  const patch = (fn: (prev: Persisted) => Persisted) => setState((prev) => fn({ ...prev }))

  const value = useMemo<AppContextValue>(() => ({
    theme: state.theme,
    toggleTheme: () => patch((p) => ({ ...p, theme: p.theme === 'light' ? 'dark' : 'light' })),
    user,
    users: state.users,
    authOpen,
    authView,
    openAuth: (view = 'login') => {
      setAuthView(view)
      setAuthOpen(true)
    },
    closeAuth: () => setAuthOpen(false),
    setAuthView,
    login: async (email, password) => {
      const found = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
      if (!found) return 'Invalid email or password. Try student@geekpath.dev / password123.'
      if (found.twoFactor) {
        patch((p) => ({ ...p, pendingEmail: found.email }))
        setAuthView('twoFactor')
        return null
      }
      patch((p) => ({ ...p, sessionId: found.id }))
      setAuthOpen(false)
      return null
    },
    loginWithGoogle: async () => {
      const student = state.users.find((u) => u.id === 'u-student') ?? state.users.find((u) => u.role === 'student')
      if (!student) return 'Demo sign-in is unavailable.'
      patch((p) => ({ ...p, sessionId: student.id }))
      setAuthOpen(false)
      return null
    },
    register: async (input) => {
      if (state.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
        return 'An account with that email already exists.'
      }
      const next: User = {
        id: `u-${Date.now()}`,
        name: input.name,
        email: input.email,
        password: input.password,
        role: 'student',
        bio: '',
        country: 'Rwanda',
        university: input.university || '',
        education: '',
        skillLevel: 'Beginner',
        interests: [],
        github: '',
        linkedin: '',
        website: '',
        twoFactor: false,
        emailVerified: false,
        phone: input.phone || '',
        whatsappOptIn: Boolean(input.whatsappOptIn),
        createdAt: new Date().toISOString().slice(0, 10),
      }
      patch((p) => ({ ...p, users: [...p.users, next], pendingEmail: input.email }))
      setOtpPurpose('verify')
      setAuthView('otp')
      return null
    },
    logout: () => {
      patch((p) => ({ ...p, sessionId: null }))
    },
    updateUser: (userPatch) => {
      patch((p) => ({
        ...p,
        users: p.users.map((u) => (u.id === p.sessionId ? { ...u, ...userPatch } : u)),
      }))
    },
    startReset: async (email) => {
      const found = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!found) return 'No demo account uses that email.'
      patch((p) => ({ ...p, pendingEmail: found.email }))
      setOtpPurpose('reset')
      setAuthView('otp')
      return null
    },
    confirmOtp: async (code) => {
      if (code.trim() !== DEMO_OTP) return 'Incorrect code. This demo accepts 123456.'
      const found = state.users.find((u) => u.email === state.pendingEmail)
      if (!found) return 'No pending account for that code.'
      if (otpPurpose === 'reset') {
        setVerifiedOtp(code.trim())
        setAuthView('reset')
        return null
      }
      const verified = { ...found, emailVerified: true }
      patch((p) => ({
        ...p,
        users: p.users.map((u) => (u.id === found.id ? verified : u)),
        sessionId: found.id,
        pendingEmail: null,
      }))
      if (otpPurpose === 'verify') setAuthView('setup')
      else setAuthOpen(false)
      return null
    },
    resendOtp: async () => {
      if (!state.pendingEmail) return 'No email to send to.'
      return null
    },
    resetPassword: async (password) => {
      if (!state.pendingEmail || verifiedOtp !== DEMO_OTP) return false
      patch((p) => ({
        ...p,
        users: p.users.map((u) => (u.email === p.pendingEmail ? { ...u, password } : u)),
        pendingEmail: null,
      }))
      setVerifiedOtp('')
      setAuthView('login')
      return true
    },
    verifyEmail: async () => undefined,
    finishTwoFactor: async (code) => {
      if (code.trim() !== DEMO_OTP) return false
      const found = state.users.find((u) => u.email === state.pendingEmail)
      if (!found) return false
      patch((p) => ({ ...p, sessionId: found.id, pendingEmail: null }))
      setAuthOpen(false)
      return true
    },
    bookmarks: state.bookmarks,
    toggleBookmark: (id) => {
      patch((p) => ({
        ...p,
        bookmarks: p.bookmarks.includes(id) ? p.bookmarks.filter((x) => x !== id) : [...p.bookmarks, id],
      }))
    },
    solved: state.solved,
    attempted: state.attempted,
    markAttempt: (id) => {
      patch((p) => ({ ...p, attempted: p.attempted.includes(id) ? p.attempted : [...p.attempted, id] }))
    },
    markSolved: (id) => {
      patch((p) => ({
        ...p,
        solved: p.solved.includes(id) ? p.solved : [...p.solved, id],
        xp: p.xp + (p.solved.includes(id) ? 0 : 25),
      }))
    },
    enrollments: state.enrollments,
    enroll: (id, extra) => {
      patch((p) => ({
        ...p,
        enrollments: p.enrollments.includes(id) ? p.enrollments : [...p.enrollments, id],
        users: extra?.phone == null
          ? p.users
          : p.users.map((u) => (u.id === p.sessionId ? { ...u, phone: extra.phone || '', whatsappOptIn: extra.whatsappOptIn !== false } : u)),
      }))
    },
    xp: state.xp,
    addXp: (n) => {
      patch((p) => ({ ...p, xp: p.xp + n }))
    },
    streak: state.streak,
    claimPotd: () => {
      const today = new Date().toISOString().slice(0, 10)
      patch((p) => ({
        ...p,
        lastPotd: today,
        streak: p.lastPotd === today ? p.streak : p.streak + 1,
        xp: p.xp + 15,
      }))
    },
    submissions: state.submissions,
    addSubmission: (row) => {
      patch((p) => ({ ...p, submissions: [row, ...p.submissions].slice(0, 40) }))
    },
    pendingEmail: state.pendingEmail,
    otpPurpose,
  }), [state, user, authOpen, authView, otpPurpose, verifiedOtp])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
