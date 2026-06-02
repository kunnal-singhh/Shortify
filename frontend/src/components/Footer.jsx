import { Link } from 'react-router'

const Footer = () => (
  <>
    <style>{`
      .footer {
        background: var(--bg-2);
        border-top: 1px solid var(--border);
        padding: 3rem 2rem 2rem;
        font-family: var(--font);
      }
      .footer-inner {
        max-width: 1200px; margin: 0 auto;
        display: flex; flex-direction: column; gap: 2.5rem;
      }

      /* Top row */
      .footer-top {
        display: grid;
        grid-template-columns: 1.4fr repeat(3, 1fr);
        gap: 2rem;
      }
      @media (max-width: 720px) {
        .footer-top { grid-template-columns: 1fr 1fr; }
        .footer-brand-col { grid-column: 1 / -1; }
      }

      /* Brand */
      .footer-brand-col { display: flex; flex-direction: column; gap: 0.75rem; }
      .footer-brand {
        display: inline-flex; align-items: center; gap: 10px;
        text-decoration: none; width: fit-content;
      }
      .footer-logo {
        width: 32px; height: 32px; background: var(--accent);
        border-radius: var(--r8); display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 16px var(--accent-glow); flex-shrink: 0;
      }
      .footer-brand-name {
        font-size: 1rem; font-weight: 800; letter-spacing: -0.03em; color: var(--t1);
      }
      .footer-brand-name span { color: var(--accent); }
      .footer-tagline {
        font-size: 0.8rem; color: var(--t3); line-height: 1.65; max-width: 220px; font-weight: 300;
      }
      .footer-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.25rem; }
      .footer-chip {
        display: inline-flex; align-items: center; gap: 5px;
        font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
        color: var(--t2); background: var(--surface); border: 1px solid var(--border-2);
        border-radius: var(--r6); padding: 3px 8px;
      }
      .footer-chip-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

      /* Nav columns */
      .footer-col { display: flex; flex-direction: column; gap: 0.55rem; }
      .footer-col-head {
        font-size: 0.63rem; font-weight: 700; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--t3); margin-bottom: 0.3rem;
      }
      .footer-link {
        font-size: 0.81rem; font-weight: 500; color: var(--t2);
        text-decoration: none; transition: color 0.15s; width: fit-content;
      }
      .footer-link:hover { color: var(--accent); }

      /* Divider */
      .footer-hr { height: 1px; background: var(--border); }

      /* Bottom */
      .footer-bottom {
        display: flex; align-items: center; justify-content: space-between;
        flex-wrap: wrap; gap: 0.75rem;
      }
      .footer-copy { font-size: 0.74rem; color: var(--t3); font-family: var(--mono); }
      .footer-status {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 0.72rem; font-weight: 600; color: var(--ok);
        background: var(--ok-dim); border: 1px solid rgba(110,231,183,0.15);
        border-radius: 99px; padding: 4px 11px;
      }
      .status-pulse {
        width: 6px; height: 6px; border-radius: 50%; background: var(--ok);
        animation: pulse 2.2s ease-in-out infinite; flex-shrink: 0;
      }
    `}</style>

    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <span className="footer-logo">
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="#18171c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="footer-brand-name">Short<span>ify</span></span>
            </Link>
            <p className="footer-tagline">Create short URLs, review all links, and track click activity in one lightweight interface.</p>
          </div>

          <div className="footer-col">
            <span className="footer-col-head">Pages</span>
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/urls">All links</Link>
          </div>

          <div className="footer-col">
            <span className="footer-col-head">What you can do</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Create a new short link</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Copy shareable short URLs</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Track clicks per link</span>
          </div>
        </div>

        <div className="footer-hr" />

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Shortify — made by Kunal Singh</span>
        </div>

      </div>
    </footer>
  </>
)

export default Footer