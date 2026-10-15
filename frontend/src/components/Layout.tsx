import { Outlet } from 'react-router-dom'
import { AuthModal } from './AuthModal'
import { Footer } from './Footer'
import { Header } from './Header'
import { HelpTip } from './HelpTip'
import { StudyCoach } from './StudyCoach'

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
      <HelpTip />
      <StudyCoach />
    </>
  )
}
