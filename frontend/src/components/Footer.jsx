const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          background: var(--surface);
          padding: 1.1rem 1.5rem;
        }
        .footer-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--t1);
          font-family: var(--font);
        }
        .footer-brand-icon {
          width: 22px;
          height: 22px;
          background: var(--accent);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .footer-sub {
          font-size: 0.76rem;
          color: var(--t3);
          font-family: var(--font);
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-icon">↗</span>
            Shortify
          </div>
          <span className="footer-sub">Local React, Express &amp; MongoDB URL shortener</span>
        </div>
      </footer>
    </>
  )
}

export default Footer