import { NavLink } from 'react-router'

const Header = () => (
  <>
    <style>{`
      .nav {
        position: sticky; top: 0; z-index: 200;
        background: rgba(24,23,28,0.82);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        height: 62px;
        display: flex; align-items: center;
        padding: 0 2rem;
      }
      .nav-inner {
        width: 100%; max-width: 1200px; margin: 0 auto;
        display: flex; align-items: center; justify-content: space-between;
      }
      .nav-brand {
        display: flex; align-items: center; gap: 10px;
        text-decoration: none;
      }
      .nav-logo {
        width: 32px; height: 32px;
        background: var(--accent);
        border-radius: var(--r8);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 18px var(--accent-glow);
        flex-shrink: 0;
      }
      .nav-name {
        font-size: 1rem; font-weight: 800;
        letter-spacing: -0.03em;
        color: var(--t1);
      }
      .nav-name span { color: var(--accent); }
      .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
      .nav-links a {
        font-size: 0.83rem; font-weight: 500;
        text-decoration: none; color: var(--t2);
        padding: 6px 13px; border-radius: var(--r8);
        transition: background 0.15s, color 0.15s;
      }
      .nav-links a:hover { background: var(--surface-2); color: var(--t1); }
      .nav-links a.active { background: var(--accent-dim); color: var(--accent); font-weight: 600; }
    `}</style>
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand">
          <span className="nav-logo">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="#18171c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="nav-name">Short<span>ify</span></span>
        </NavLink>
        <ul className="nav-links">
          {[['/', 'Home'], ['/urls', 'Links']].map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </>
)

export default Header