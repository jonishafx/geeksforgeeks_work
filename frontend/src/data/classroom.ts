import { findCourse } from './catalog'
import type { Course } from '../types'

export const STUDENT_NAME = 'Johnson Mugisha'
export const STUDENT_REG = '26RP02147'
export const STUDENT_GITHUB = 'https://github.com/jonishafx'

const STORE_KEY = 'geekpath-classroom-v1'

export type LessonItem = {
  id: string
  moduleId: string
  moduleTitle: string
  title: string
  type: 'read' | 'quiz'
  minutes?: number
  body?: string[]
  passScore?: number
  questions?: { id: string; prompt: string; options: string[]; answer: number }[]
}

export type ModuleGroup = { id: string; title: string; lessons: LessonItem[] }

export type LearnPayload = {
  course: { id: string; slug: string; title: string; tag: string }
  progress: number
  completed: number
  total: number
  status: string
  completedIds: string[]
  certificateId: string | null
  modules: ModuleGroup[]
}

export type CertData = {
  id: string
  studentName: string
  courseTitle: string
  issuedAt: string
}

type Store = {
  completed: Record<string, string[]>
  certificates: CertData[]
  attempts: Record<string, number>
}

function emptyStore(): Store {
  return {
    completed: {
      'dsa-system-design': ['m1-r0', 'm1-r1'],
    },
    certificates: [
      {
        id: 'GP-26RP02147',
        studentName: STUDENT_NAME,
        courseTitle: 'DSA & System Design Course - SDE Interview Prep',
        issuedAt: '2026-10-01',
      },
    ],
    attempts: {},
  }
}

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw) as Store
    return {
      completed: parsed.completed ?? {},
      certificates: parsed.certificates?.length ? parsed.certificates : emptyStore().certificates,
      attempts: parsed.attempts ?? {},
    }
  } catch {
    return emptyStore()
  }
}

function writeStore(store: Store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store))
}

function buildModules(course: Course): ModuleGroup[] {
  return course.modules.map((mod) => {
    const reads: LessonItem[] = mod.lessons.map((title, index) => ({
      id: `${mod.id}-r${index}`,
      moduleId: mod.id,
      moduleTitle: mod.title,
      title,
      type: 'read',
      minutes: 8,
      body: [
        `${title} is a sample lesson from ${course.title}. The text is dummy content stored in the browser, so this classroom runs without a backend.`,
        course.blurb,
        'Read the idea, mark the lesson complete, and your progress stays on this device.',
      ],
    }))
    const quiz: LessonItem = {
      id: `${mod.id}-quiz`,
      moduleId: mod.id,
      moduleTitle: mod.title,
      title: `${mod.title} check`,
      type: 'quiz',
      passScore: 70,
      questions: [
        {
          id: `${mod.id}-q1`,
          prompt: `Which topic is part of ${mod.title}?`,
          options: [mod.lessons[0] || mod.title, 'Cooking temperatures', 'Hardware repair only'],
          answer: 0,
        },
        {
          id: `${mod.id}-q2`,
          prompt: 'Which course is this module from?',
          options: [course.title, 'A bookkeeping evening class', 'An unrelated sports drill'],
          answer: 0,
        },
      ],
    }
    return { id: mod.id, title: mod.title, lessons: [...reads, quiz] }
  })
}

function allLessons(modules: ModuleGroup[]) {
  return modules.flatMap((mod) => mod.lessons)
}

function issueCertificate(store: Store, course: Course, studentName: string) {
  const id = `GP-${course.id}`
  if (!store.certificates.some((cert) => cert.id === id)) {
    store.certificates.unshift({
      id,
      studentName,
      courseTitle: course.title,
      issuedAt: new Date().toISOString(),
    })
  }
  return id
}

export function loadLearn(courseKey: string | undefined): LearnPayload | null {
  const course = findCourse(courseKey)
  if (!course) return null
  const modules = buildModules(course)
  const items = allLessons(modules)
  const store = readStore()
  const completedIds = store.completed[course.id] ?? []
  const completed = items.filter((item) => completedIds.includes(item.id)).length
  const progress = items.length ? Math.round((completed / items.length) * 100) : 0
  const done = progress === 100
  return {
    course: { id: course.id, slug: course.slug, title: course.title, tag: course.tag },
    progress,
    completed,
    total: items.length,
    status: done ? 'completed' : 'in_progress',
    completedIds,
    certificateId: done ? `GP-${course.id}` : null,
    modules,
  }
}

export function completeRead(courseKey: string, lessonId: string, studentName = STUDENT_NAME) {
  const course = findCourse(courseKey)
  if (!course) throw new Error('Course not found.')
  const store = readStore()
  const current = new Set(store.completed[course.id] ?? [])
  current.add(lessonId)
  store.completed[course.id] = [...current]
  writeStore(store)
  const snapshot = loadLearn(course.id)
  if (snapshot?.progress === 100) {
    issueCertificate(store, course, studentName)
    writeStore(store)
  }
  return loadLearn(course.id)!
}

export function submitQuiz(courseKey: string, lessonId: string, answers: number[], studentName = STUDENT_NAME) {
  const course = findCourse(courseKey)
  if (!course) throw new Error('Course not found.')
  const lesson = buildModules(course).flatMap((mod) => mod.lessons).find((item) => item.id === lessonId)
  if (!lesson || lesson.type !== 'quiz' || !lesson.questions) throw new Error('Quiz not found.')
  const correct = lesson.questions.filter((question, index) => answers[index] === question.answer).length
  const total = lesson.questions.length
  const score = total ? Math.round((correct / total) * 100) : 0
  const passed = score >= (lesson.passScore ?? 70)
  const store = readStore()
  const attemptKey = `${course.id}:${lessonId}`
  store.attempts[attemptKey] = (store.attempts[attemptKey] ?? 0) + 1
  const attemptNumber = store.attempts[attemptKey]
  if (passed) {
    const current = new Set(store.completed[course.id] ?? [])
    current.add(lessonId)
    store.completed[course.id] = [...current]
  }
  writeStore(store)
  const snapshot = passed && loadLearn(course.id)?.progress === 100
    ? (issueCertificate(store, course, studentName), writeStore(store), loadLearn(course.id)!)
    : loadLearn(course.id)!
  return {
    score,
    passed,
    attemptNumber,
    correct,
    total,
    progress: snapshot.progress,
    completedIds: snapshot.completedIds,
    certificateId: snapshot.certificateId,
    status: snapshot.status,
  }
}

export type MyCourse = {
  id: string
  slug: string
  title: string
  tag?: string
  status: string
  progress: number
  certificateId: string | null
}

export function listMyCourses(enrollments: string[]): MyCourse[] {
  return enrollments.flatMap((id) => {
    const course = findCourse(id)
    const learn = loadLearn(id)
    if (!course || !learn) return []
    return [{
      id: course.id,
      slug: course.slug,
      title: course.title,
      tag: course.tag,
      status: learn.status,
      progress: learn.progress,
      certificateId: learn.certificateId,
    }]
  })
}

export function listCertificates(): CertData[] {
  return readStore().certificates
}

export function findCertificate(id: string | undefined): CertData | null {
  if (!id) return null
  return readStore().certificates.find((cert) => cert.id === id) ?? null
}
