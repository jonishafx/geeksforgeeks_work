export type Role = 'student' | 'instructor' | 'admin'

export type Theme = 'light' | 'dark'

export type AuthView =
  | 'login'
  | 'register'
  | 'forgot'
  | 'otp'
  | 'reset'
  | 'verify'
  | 'twoFactor'
  | 'setup'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemStatus = 'Todo' | 'Solved' | 'Attempted'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  bio: string
  country: string
  university: string
  education: string
  skillLevel: string
  interests: string[]
  github: string
  linkedin: string
  website: string
  twoFactor: boolean
  emailVerified: boolean
  phone?: string
  whatsappOptIn?: boolean
  createdAt: string
}

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  rating: number
  level: string
  interested: string
  tag: string
  live: boolean
  color: string
  accent: string
  icon: string
  modules: CourseModule[]
  description: string
  blurb: string
  price: string
  oldPrice: string
  seats?: string
  weeks: string
  offerPercent: number
}

export interface CourseModule {
  id: string
  title: string
  lessons: string[]
  caseStudy?: string
}

export interface ExploreTopic {
  slug: string
  title: string
  color: string
}

export interface Article {
  slug: string
  title: string
  category: string
  tags: string[]
  difficulty: Difficulty
  minutes: number
  published: string
  updated: string
  excerpt: string
  body: string[]
}

export interface Problem {
  id: string
  title: string
  difficulty: Difficulty
  topic: string
  companies: string[]
  accuracy: number
  submissions: number
  prompt: string
  examples: { input: string; output: string; explanation: string }[]
  constraints: string[]
  starter: Record<string, string>
  tests: { input: string; expected: string }[]
}

export interface Roadmap {
  id: string
  title: string
  audience: string
  steps: { title: string; detail: string }[]
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  level: string
  salary: string
  skills: string[]
  remote: boolean
}

export interface Contest {
  id: string
  title: string
  starts: string
  duration: string
  problems: number
  registered: number
  status: 'Upcoming' | 'Live' | 'Ended'
}

export interface InterviewCompany {
  slug: string
  name: string
  roles: string[]
  topics: string[]
  questions: string[]
}

export interface Submission {
  id: string
  problemId: string
  language: string
  status: string
  runtime: string
  memory: string
  at: string
}
