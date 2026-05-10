import { Link } from 'react-router'

const Footer = () => (
  <>
    <style>{`
      .footer {
        background: var(--bg-2);
        border-top: 1px solid var(--border);
        padding: 2.75rem 1.5rem 2rem;
        font-family: var(--font);
      }
      .footer-inner {
        max-width: 960px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2.25rem;
      }
      .footer-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
        flex-wrap: wrap;
      }
      .footer-brand-col {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        max-width: 220px;
      }
      .footer-brand {
        display: flex;
        align-items: center;
        gap: 9px;
        text-decoration: none;
      }
      .footer-logo {
        width: 28px; height: 28px;
        background: var(--accent);
        border-radius: var(--r8);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .footer-name {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.02em;
      }
      .footer-desc {
        font-size: 0.77rem;
        color: var(--t3);
        line-height: 1.6;
      }

      /* Nav cols */
      .footer-nav-wrap {
        display: flex;
        gap: 3rem;
        flex-wrap: wrap;
      }
      .footer-col { display: flex; flex-direction: column; gap: 0.5rem; }
      .footer-col-head {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--t3);
        margin-bottom: 0.2rem;
      }
      .footer-link {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--t2);
        text-decoration: none;
        transition: color 0.15s;
        width: fit-content;
      }
      .footer-link:hover { color: var(--accent); }

      /* Stack chips */
      .footer-stack {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.45rem;
      }
      .footer-stack-label {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--t3);
        margin-right: 0.25rem;
      }
      .stack-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--t2);
        background: var(--surface);
        border: 1px solid var(--border-2);
        border-radius: var(--r6);
        padding: 3px 9px;
        font-family: var(--mono);
      }
      .chip-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* Divider */
      .footer-hr { height: 1px; background: var(--border); }

      /* Bottom */
      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .footer-copy {
        font-size: 0.74rem;
        color: var(--t3);
        font-family: var(--mono);
      }
      .footer-status {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--ok);
        background: var(--ok-dim);
        border: 1px solid rgba(110,231,183,0.15);
        border-radius: 99px;
        padding: 3px 10px;
        font-family: var(--font);
      }
      .status-pulse {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--ok);
        animation: pulse 2.2s ease-in-out infinite;
      }
    `}</style>

    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <span className="footer-logo">
                <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="#1c1b1f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="footer-name">Shortify</span>
            </Link>
            <p className="footer-desc">Local URL shortener. React frontend, Express backend, MongoDB storage.</p>
          </div>

          <nav className="footer-nav-wrap">
            <div className="footer-col">
              <span className="footer-col-head">Pages</span>
              <Link className="footer-link" to="/">Home</Link>
              <Link className="footer-link" to="/urls">All links</Link>
              <Link className="footer-link" to="/about">About</Link>
            </div>
            {/* <div className="footer-col">
              <span className="footer-col-head">API</span>
              <a className="footer-link" href="http://localhost:8001/url" target="_blank" rel="noreferrer">GET /url</a>
              <a className="footer-link" href="http://localhost:8001" target="_blank" rel="noreferrer">Health</a>
            </div> */}
          </nav>
        </div>

        <div className="footer-stack">
          <span className="footer-stack-label">Stack</span>
          {[
            { label: 'React',        color: '#61dafb' },
            { label: 'React Router', color: '#ca4245' },
            { label: 'Express',      color: '#68a063' },
            { label: 'MongoDB',      color: '#47a248' },
          ].map(({ label, color }) => (
            <span className="stack-chip" key={label}>
              <span className="chip-dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="footer-hr" />

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Shortify — localhost</span>
          <span className="footer-status">
            <span className="status-pulse" />
            Running locally
          </span>
        </div>
      </div>
    </footer>
  </>
)

export default Footer