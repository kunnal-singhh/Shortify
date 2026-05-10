import { NavLink } from 'react-router'

const Header = () => (
  <>
    <style>{`
      .nav {
        position: sticky;
        top: 0;
        z-index: 200;
        background: rgba(28,27,31,0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--border);
        height: 58px;
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
      }
      .nav-inner {
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-brand {
        display: flex;
        align-items: center;
        gap: 9px;
        text-decoration: none;
        color: var(--t1);
      }
      .nav-logo {
        width: 30px;
        height: 30px;
        background: var(--accent);
        border-radius: var(--r8);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .nav-logo svg { display: block; }
      .nav-name {
        font-family: var(--font);
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--t1);
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 2px;
        list-style: none;
      }
      .nav-links a {
        font-family: var(--font);
        font-size: 0.82rem;
        font-weight: 500;
        text-decoration: none;
        color: var(--t2);
        padding: 6px 12px;
        border-radius: var(--r8);
        transition: background 0.15s, color 0.15s;
        display: block;
      }
      .nav-links a:hover {
        background: var(--surface-2);
        color: var(--t1);
      }
      .nav-links a.active {
        background: var(--accent-dim);
        color: var(--accent);
        font-weight: 600;
      }
    `}</style>

    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand">
          <span className="nav-logo">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="#1c1b1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="nav-name">Shortify</span>
        </NavLink>
        <ul className="nav-links">
          {[['/', 'Home'], ['/urls', 'Links'], ['/about', 'About']].map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </>
)

export default Header