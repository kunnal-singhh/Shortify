import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL// || 'http://localhost:8001/url'

const Home = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const urlRef = useRef(null)

  // ── ORIGINAL BACKEND LOGIC — untouched ──────────────────────────────────────
  async function shortenUrl(event) {
    event.preventDefault()
    if (!longUrl.trim()) { setError('Enter a URL before shortening.'); return }
    setLoading(true); setError(''); setCopied(false)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl.trim() }),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      setShortUrl(`${API_URL}/${data.id}`)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Could not shorten the URL. Check that the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const copyShortUrl = useCallback(async () => {
    if (!shortUrl) return
    urlRef.current?.select()
    await window.navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }, [shortUrl])
  // ── END BACKEND LOGIC ────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        .home {
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── Hero ── */
        .hero {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          padding-bottom: 0.5rem;
          animation: fadeUp 0.5s ease both;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          width: fit-content;
        }
        .hero-eyebrow-line {
          width: 24px;
          height: 1.5px;
          background: var(--accent);
          opacity: 0.5;
        }
        .hero-title {
          font-size: clamp(1.8rem, 4.5vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--t1);
        }
        .hero-title em {
          font-style: normal;
          color: var(--accent);
        }
        .hero-copy {
          font-size: 0.9rem;
          color: var(--t2);
          line-height: 1.7;
          max-width: 440px;
          font-weight: 300;
        }
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--t2);
          text-decoration: none;
          border: 1px solid var(--border-2);
          border-radius: var(--r8);
          padding: 6px 12px;
          background: var(--surface);
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          width: fit-content;
        }
        .hero-link:hover {
          border-color: var(--border-3);
          color: var(--t1);
          background: var(--surface-2);
        }

        /* ── Card ── */
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r20);
          overflow: hidden;
          box-shadow: var(--sh-md);
          animation: fadeUp 0.5s ease both;
        }
        .card.delay-1 { animation-delay: 0.08s; }
        .card.delay-2 { animation-delay: 0.16s; }

        .card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.4rem 0.9rem;
          border-bottom: 1px solid var(--border);
          background: var(--bg-3);
        }
        .card-head-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-head-icon {
          width: 28px; height: 28px;
          border-radius: var(--r6);
          background: var(--accent-dim);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--accent);
        }
        .card-head-title {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--t1);
          letter-spacing: -0.01em;
        }
        .card-head-sub {
          font-size: 0.72rem;
          color: var(--t3);
          font-weight: 400;
        }
        .card-body {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ── Form field ── */
        .field { display: flex; flex-direction: column; gap: 5px; }
        .field-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--t3);
        }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          color: var(--t3);
          display: flex;
          pointer-events: none;
        }
        .field-input {
          width: 100%;
          padding: 0.72rem 0.9rem 0.72rem 2.4rem;
          font-family: var(--font);
          font-size: 0.88rem;
          color: var(--t1);
          background: var(--bg-3);
          border: 1.5px solid var(--border-2);
          border-radius: var(--r12);
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          caret-color: var(--accent);
        }
        .field-input::placeholder { color: var(--t3); font-weight: 300; }
        .field-input:focus {
          border-color: var(--accent-dark);
          box-shadow: 0 0 0 3px rgba(125,211,176,0.1);
          background: var(--bg-2);
        }

        /* Result input */
        .field-input.result {
          font-family: var(--mono);
          font-size: 0.82rem;
          background: var(--accent-dim2);
          border-color: rgba(125,211,176,0.2);
          color: var(--accent);
          cursor: default;
          padding-right: 2.5rem;
        }
        .field-input.result:focus { box-shadow: none; }
        .field-input.result.empty {
          font-family: var(--font);
          font-size: 0.88rem;
          background: var(--bg-3);
          border-color: var(--border-2);
          color: var(--t3);
          font-weight: 300;
        }
        .field-open-btn {
          position: absolute;
          right: 9px; top: 50%;
          transform: translateY(-50%);
          width: 26px; height: 26px;
          border-radius: var(--r6);
          border: none;
          background: transparent;
          color: var(--accent-text);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          padding: 0;
        }
        .field-open-btn:hover { background: var(--accent-dim); }
        .field-open-btn:disabled { color: var(--t3); pointer-events: none; }

        /* ── Buttons ── */
        .btn-row { display: flex; gap: 0.6rem; }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0.72rem 1.1rem;
          font-family: var(--font);
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          border-radius: var(--r12);
          cursor: pointer;
          transition: background 0.18s, transform 0.12s, box-shadow 0.18s, color 0.15s;
          letter-spacing: -0.01em;
          text-decoration: none;
          white-space: nowrap;
        }
        .btn-grow { flex: 1; }
        .btn:active:not(:disabled) { transform: scale(0.98); }

        .btn-primary {
          background: var(--accent);
          color: #1c1b1f;
          box-shadow: 0 2px 12px rgba(125,211,176,0.2);
        }
        .btn-primary:hover:not(:disabled) {
          background: #8fddbc;
          box-shadow: 0 4px 18px rgba(125,211,176,0.3);
        }
        .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }

        .btn-ghost {
          background: var(--surface-2);
          color: var(--t1);
          border: 1px solid var(--border-2);
        }
        .btn-ghost:hover:not(:disabled) { background: var(--surface-3); border-color: var(--border-3); }

        .btn-ok {
          background: var(--ok-dim);
          color: var(--ok);
          border: 1px solid rgba(110,231,183,0.18);
        }

        /* ── Spinner ── */
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(28,27,31,0.25);
          border-top-color: #1c1b1f;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        /* ── Error / notice ── */
        .notice-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--err-dim);
          border: 1px solid rgba(248,113,113,0.15);
          border-radius: var(--r8);
          padding: 0.65rem 0.9rem;
          font-size: 0.8rem;
          color: var(--err);
          font-weight: 500;
        }

        /* ── Result card tag ── */
        .result-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--ok-dim);
          color: var(--ok);
          border: 1px solid rgba(110,231,183,0.18);
          border-radius: 99px;
          padding: 2px 9px;
        }
        .result-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--ok);
          animation: pulse 2s ease infinite;
        }
      `}</style>

      <div className="home">

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Shortify workspace
          </div>
          <h1 className="hero-title">Create <em>clean</em><br />short links.</h1>
          <p className="hero-copy">
            Paste a long URL, generate a short one instantly. Every link and its click count lives in the dashboard.
          </p>
          <Link className="hero-link" to="/urls">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="13" height="13">
              <rect x="2" y="2" width="12" height="12" rx="2.5"/>
              <path d="M5 8h6M8 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Open URL dashboard
          </Link>
        </div>

        {/* Shorten card */}
        <div className="card delay-1">
          <div className="card-head">
            <div className="card-head-left">
              <span className="card-head-icon">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
                  <path d="M10 4H6a3 3 0 000 6h4a3 3 0 000-6z" strokeLinecap="round"/>
                  <path d="M6.5 7h3" strokeLinecap="round"/>
                </svg>
              </span>
              <div>
                <div className="card-head-title">New short URL</div>
                <div className="card-head-sub">Stores destination & returns a short ID</div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={shortenUrl} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div className="field">
                <label className="field-label" htmlFor="long-url">Destination URL</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="14" height="14">
                      <path d="M10 4H6a3 3 0 000 6h4a3 3 0 000-6z" strokeLinecap="round"/>
                      <path d="M6.5 7h3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    id="long-url"
                    className="field-input"
                    type="url"
                    placeholder="https://example.com/articles/long-url-here"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-grow" type="submit" disabled={loading || !longUrl.trim()}>
                {loading ? <><span className="spinner" />Creating…</> : 'Create short link'}
              </button>
            </form>

            {error && (
              <div className="notice-error">
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13" style={{flexShrink:0}}>
                  <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4.25a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.5a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Result card — always visible */}
        <div className="card delay-2">
          <div className="card-head">
            <div className="card-head-left">
              <span className="card-head-icon">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
                  <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <div className="card-head-title">Short link</div>
                <div className="card-head-sub">Ready to copy or open</div>
              </div>
            </div>
            {shortUrl && (
              <span className="result-tag">
                <span className="result-tag-dot" />
                Saved
              </span>
            )}
          </div>

          <div className="card-body">
            <div className="field">
              <label className="field-label">Short URL</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="14" height="14">
                    <circle cx="8" cy="8" r="6"/>
                    <path d="M8 5v3l2 1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  ref={urlRef}
                  className={`field-input result${shortUrl ? '' : ' empty'}`}
                  type="text"
                  readOnly
                  value={shortUrl}
                  placeholder="Your short URL will appear here…"
                />
                <button
                  className="field-open-btn"
                  onClick={() => window.open(shortUrl, '_blank', 'noopener,noreferrer')}
                  disabled={!shortUrl}
                  title="Open in new tab"
                  type="button"
                >
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" width="12" height="12">
                    <path d="M9 2h3v3M12 2l-6 6M5 3H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="btn-row">
              <button
                className={`btn btn-grow ${copied ? 'btn-ok' : 'btn-ghost'}`}
                type="button"
                onClick={copyShortUrl}
                disabled={!shortUrl}
              >
                {copied
                  ? <><svg viewBox="0 0 14 14" fill="currentColor" width="12" height="12"><path fillRule="evenodd" d="M12.707 3.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L5 9.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Copied!</>
                  : <><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" width="12" height="12"><rect x="5" y="5" width="7" height="7" rx="1.5"/><path d="M3 9V3a1 1 0 011-1h6" strokeLinecap="round"/></svg>Copy link</>
                }
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home