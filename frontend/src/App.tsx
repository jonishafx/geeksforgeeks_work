import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Admin } from './pages/Admin'
import { AITutor } from './pages/AITutor'
import { Advertise } from './pages/Advertise'
import { Certificate, CertificateVerify } from './pages/Certificate'
import { CodingContest } from './pages/CodingContest'
import { CourseLearn } from './pages/CourseLearn'
import { CourseDetail, Courses } from './pages/Courses'
import { Dashboard, Profile } from './pages/Dashboard'
import { Home } from './pages/Home'
import { ArticlePage, Learn } from './pages/Learn'
import {
  Community,
  CompanyPrep,
  Contests,
  Interview,
  Jobs,
  RoadmapDetail,
  Roadmaps,
  SearchPage,
} from './pages/More'
import { Practice, ProblemPage } from './pages/Practice'
import { Trending } from './pages/Trending'
import { Videos } from './pages/Videos'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:slug" element={<ArticlePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/category/:slug" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="courses/:id/learn" element={<CourseLearn />} />
          <Route path="courses/:id/learn/:lessonId" element={<CourseLearn />} />
          <Route path="certificates/:id" element={<Certificate />} />
          <Route path="verify/:id" element={<CertificateVerify />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:id" element={<ProblemPage />} />
          <Route path="roadmaps" element={<Roadmaps />} />
          <Route path="roadmaps/:id" element={<RoadmapDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/setup" element={<Profile />} />
          <Route path="ai" element={<AITutor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="interview" element={<Interview />} />
          <Route path="interview/:slug" element={<CompanyPrep />} />
          <Route path="contests" element={<Contests />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="community" element={<Community />} />
          <Route path="trending" element={<Trending />} />
          <Route path="videos" element={<Videos />} />
          <Route path="coding-contest" element={<CodingContest />} />
          <Route path="advertise" element={<Advertise />} />
          <Route path="forgot-password" element={<Navigate to="/" />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
