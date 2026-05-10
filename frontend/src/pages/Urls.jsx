import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/url'

const Urls = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copiedId, setCopiedId] = useState('')

  // ── ORIGINAL BACKEND LOGIC — untouched ──────────────────────────────────────
  const fetchUrls = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Unable to load links')
      const data = await response.json()
      setUrls(Array.isArray(data.urls) ? data.urls : [])
    } catch (err) {
      console.error('Fetch URLs error:', err)
      setError('Could not load your links. Check that the backend server is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error('Unable to load links'); return r.json() })
      .then((data) => { if (!ignore) setUrls(Array.isArray(data.urls) ? data.urls : []) })
      .catch((err) => { if (!ignore) { console.error('Fetch URLs error:', err); setError('Could not load your links. Check that the backend server is running.') } })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [])

  const copyUrl = async (shortURL, shortId) => {
    await window.navigator.clipboard.writeText(shortURL)
    setCopiedId(shortId)
    setTimeout(() => setCopiedId(''), 1800)
  }

  const markClicked = (shortId) => {
    setUrls((cur) => cur.map((u) => u.shortId === shortId ? { ...u, totalClicks: Number(u.totalClicks || 0) + 1 } : u))
    setTimeout(() => {
      fetch(API_URL).then((r) => r.json()).then((data) => { if (Array.isArray(data.urls)) setUrls(data.urls) }).catch(() => {})
    }, 800)
  }
  // ── END BACKEND LOGIC ────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        .urls-page {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          animation: fadeUp 0.4s ease both;
        }

        /* ── Header row ── */
        .urls-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .urls-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .urls-eyebrow-dash {
          width: 20px; height: 1.5px;
          background: var(--accent);
          opacity: 0.5;
        }
        .urls-title {
          font-size: clamp(1.5rem, 3.5vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--t1);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .urls-sub {
          font-size: 0.85rem;
          color: var(--t2);
          font-weight: 300;
        }

        /* Refresh btn */
        .btn-refresh {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0.55rem 1rem;
          font-family: var(--font);
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--surface);
          color: var(--t2);
          border: 1px solid var(--border-2);
          border-radius: var(--r8);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.12s;
          white-space: nowrap;
        }
        .btn-refresh:hover:not(:disabled) {
          background: var(--surface-2);
          color: var(--t1);
          border-color: var(--border-3);
        }
        .btn-refresh:active:not(:disabled) { transform: scale(0.97); }
        .btn-refresh:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-refresh svg { transition: transform 0.4s ease; }
        .btn-refresh:not(:disabled):hover svg { transform: rotate(180deg); }

        /* ── Panel ── */
        .panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r20);
          box-shadow: var(--sh-md);
          overflow: hidden;
        }

        /* ── States ── */
        .state-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.4rem;
          padding: 4rem 2rem;
        }
        .state-icon {
          width: 44px; height: 44px;
          border-radius: var(--r12);
          background: var(--bg-3);
          border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--t3);
          margin-bottom: 0.75rem;
        }
        .state-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--t1);
          font-family: var(--font);
        }
        .state-desc {
          font-size: 0.8rem;
          color: var(--t3);
          font-family: var(--font);
          font-weight: 300;
        }
        .btn-create {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 1.1rem;
          padding: 0.55rem 1.1rem;
          font-family: var(--font);
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--accent);
          color: #1c1b1f;
          border: none;
          border-radius: var(--r8);
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(125,211,176,0.18);
          transition: background 0.15s;
        }
        .btn-create:hover { background: #8fddbc; }

        .spin-ring {
          width: 22px; height: 22px;
          border: 2.5px solid var(--border-2);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-bottom: 0.75rem;
        }

        /* ── Notice ── */
        .notice-error {
          margin: 1.25rem;
          padding: 0.7rem 1rem;
          background: var(--err-dim);
          border: 1px solid rgba(248,113,113,0.15);
          border-radius: var(--r8);
          font-size: 0.8rem;
          color: var(--err);
          font-family: var(--font);
          font-weight: 500;
        }

        /* ── Table head ── */
        .tbl-head {
          display: grid;
          grid-template-columns: minmax(120px,1.2fr) minmax(140px,2fr) 90px 70px;
          padding: 0.65rem 1.25rem;
          background: var(--bg-3);
          border-bottom: 1px solid var(--border);
          gap: 1rem;
        }
        .tbl-th {
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--t3);
          font-family: var(--font);
        }
        .tbl-th.right { text-align: right; }

        /* ── URL row ── */
        .url-row {
          display: grid;
          grid-template-columns: minmax(120px,1.2fr) minmax(140px,2fr) 90px 70px;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.25rem;
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
          animation: rowIn 0.25s ease both;
        }
        .url-row:last-child { border-bottom: none; }
        .url-row:hover { background: var(--bg-3); }

        .url-short {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--mono);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--accent);
          text-decoration: none;
          transition: color 0.15s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .url-short:hover { color: #8fddbc; text-decoration: underline; text-underline-offset: 3px; }

        .url-dest {
          font-size: 0.78rem;
          color: var(--t2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: var(--font);
          font-weight: 300;
        }

        .url-clicks {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: var(--t2);
          font-family: var(--font);
        }
        .url-clicks strong {
          color: var(--t1);
          font-weight: 600;
        }

        .btn-copy {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          padding: 0.35rem 0.65rem;
          font-family: var(--font);
          font-size: 0.74rem;
          font-weight: 600;
          background: var(--surface-2);
          color: var(--t2);
          border: 1px solid var(--border-2);
          border-radius: var(--r6);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap;
          margin-left: auto;
        }
        .btn-copy:hover { background: var(--surface-3); color: var(--t1); border-color: var(--border-3); }
        .btn-copy.copied {
          background: var(--ok-dim);
          color: var(--ok);
          border-color: rgba(110,231,183,0.2);
        }
      `}</style>

      <div className="urls-page">

        {/* Header */}
        <div className="urls-header">
          <div>
            <div className="urls-eyebrow">
              <span className="urls-eyebrow-dash" />
              URL dashboard
            </div>
            <h1 className="urls-title">Saved short links</h1>
            <p className="urls-sub">Every link with its destination and live click count.</p>
          </div>
          <button className="btn-refresh" type="button" onClick={fetchUrls} disabled={loading}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" width="13" height="13">
              <path d="M13.5 8A5.5 5.5 0 112.8 5.2" strokeLinecap="round"/>
              <path d="M13.5 2.5v5.5H8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Panel */}
        <div className="panel">
          {error && <div className="notice-error">{error}</div>}

          {loading && !error && (
            <div className="state-box">
              <div className="spin-ring" />
              <div className="state-title">Loading links</div>
              <div className="state-desc">Fetching your latest URL data…</div>
            </div>
          )}

          {!loading && !error && urls.length === 0 && (
            <div className="state-box">
              <div className="state-icon">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M10 4H6a3 3 0 000 6h4a3 3 0 000-6z" strokeLinecap="round"/>
                  <path d="M6.5 7h3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="state-title">No links yet</div>
              <div className="state-desc">Create your first short URL from the home page.</div>
              <Link className="btn-create" to="/">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="12" height="12">
                  <path d="M7 2v10M2 7h10" strokeLinecap="round"/>
                </svg>
                Create link
              </Link>
            </div>
          )}

          {!loading && !error && urls.length > 0 && (
            <>
              <div className="tbl-head">
                <span className="tbl-th">Short link</span>
                <span className="tbl-th">Destination</span>
                <span className="tbl-th">Clicks</span>
                <span className="tbl-th right">Action</span>
              </div>

              {urls.map((url, index) => (
                <div
                  className="url-row"
                  key={url.id || url.shortId}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <a
                    className="url-short"
                    href={url.shortURL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => markClicked(url.shortId)}
                    title={url.shortURL}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" width="11" height="11" style={{flexShrink:0}}>
                      <path d="M8 1h3v3M11 1L5 7M4 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    /url/{url.shortId}
                  </a>

                  <p className="url-dest" title={url.redirectURL}>{url.redirectURL}</p>

                  <div className="url-clicks">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="11" height="11" style={{color:'var(--t3)'}}>
                      <circle cx="6" cy="6" r="4.5"/>
                      <path d="M6 4v2l1.5 1" strokeLinecap="round"/>
                    </svg>
                    <strong>{url.totalClicks ?? 0}</strong>
                    <span style={{color:'var(--t3)',fontSize:'0.7rem'}}>clicks</span>
                  </div>

                  <button
                    className={`btn-copy${copiedId === url.shortId ? ' copied' : ''}`}
                    type="button"
                    onClick={() => copyUrl(url.shortURL, url.shortId)}
                  >
                    {copiedId === url.shortId
                      ? <><svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10"><path fillRule="evenodd" d="M10.707 2.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L4 7.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Copied</>
                      : <><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" width="10" height="10"><rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><path d="M2.5 8V2.5a1 1 0 011-1H8" strokeLinecap="round"/></svg>Copy</>
                    }
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </>
  )
}

export default Urls