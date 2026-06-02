import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const Layout = () => (
  <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)' }}>
    <Header />
    <main style={{ flex:1, display:'flex', justifyContent:'center', padding:'3.5rem 2rem 6rem' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout