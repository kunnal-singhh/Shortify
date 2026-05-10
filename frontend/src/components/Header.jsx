import { NavLink } from 'react-router'

const Header = () => {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-text">
            <span className="brand-name">Shortify</span>
            <span className="brand-caption">URL management</span>
          </span>
        </NavLink>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/urls" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                URLs
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
