import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
