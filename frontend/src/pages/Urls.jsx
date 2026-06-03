import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL

const Urls = () => {
  const [urls, setUrls]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [copiedId, setCopiedId] = useState('')

  // ── BACKEND LOGIC — untouched ────────────────────────────────────────────────
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

  const totalClicks = urls.reduce((s, u) => s + Number(u.totalClicks || 0), 0)
  const topUrl = urls.length ? [...urls].sort((a, b) => Number(b.totalClicks || 0) - Number(a.totalClicks || 0))[0] : null

  return (
    <>
      <style>{`
        /* ── Page shell ── */
        .urls-page {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 260px;
          grid-template-rows: auto 1fr;
          column-gap: 2rem;
          row-gap: 1.75rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .urls-page { grid-template-columns: 1fr; }
          .urls-sidebar { display: none; }
        }

        /* Header spans full width */
        .urls-header {
          grid-column: 1 / -1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          animation: fadeUp 0.4s ease both;
        }
        .urls-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 0.65rem;
        }
        .urls-eyebrow-dash { width: 22px; height: 1.5px; background: var(--accent); opacity: 0.5; }
        .urls-title {
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 800; letter-spacing: -0.04em; color: var(--t1); line-height: 1.1; margin-bottom: 0.35rem;
        }
        .urls-sub { font-size: 0.88rem; color: var(--t2); font-weight: 300; }

        /* Refresh button */
        .btn-refresh {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0.6rem 1.1rem; font-family: var(--font); font-size: 0.82rem; font-weight: 600;
          background: var(--surface); color: var(--t2);
          border: 1px solid var(--border-2); border-radius: var(--r8);
          cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.12s;
          white-space: nowrap;
        }
        .btn-refresh:hover:not(:disabled) { background: var(--surface-2); color: var(--t1); border-color: var(--border-3); }
        .btn-refresh:active:not(:disabled) { transform: scale(0.97); }
        .btn-refresh:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-refresh svg { transition: transform 0.4s ease; }
        .btn-refresh:not(:disabled):hover svg { transform: rotate(180deg); }

        /* ── Main panel ── */
        .urls-panel {
          background: var(--surface);
          border: 1px solid var(--border-2);
          border-radius: var(--r20);
          box-shadow: var(--sh-md);
          overflow: hidden;
          animation: fadeUp 0.4s 0.05s ease both;
        }

        /* State boxes */
        .state-box {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; gap: 0.4rem; padding: 4.5rem 2rem;
        }
        .state-icon {
          width: 48px; height: 48px; border-radius: var(--r12);
          background: var(--bg-3); border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--t3); margin-bottom: 0.85rem;
        }
        .state-title { font-size: 0.95rem; font-weight: 700; color: var(--t1); font-family: var(--font); }
        .state-desc  { font-size: 0.82rem; color: var(--t3); font-weight: 300; }
        .btn-create {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 1.2rem;
          padding: 0.6rem 1.2rem; font-family: var(--font); font-size: 0.83rem; font-weight: 600;
          background: var(--accent); color: #18171c; border: none; border-radius: var(--r8);
          text-decoration: none; box-shadow: 0 2px 12px rgba(125,211,176,0.2);
          transition: background 0.15s, box-shadow 0.15s;
        }
        .btn-create:hover { background: #8fddbc; box-shadow: 0 4px 18px rgba(125,211,176,0.3); }

        .spin-ring {
          width: 24px; height: 24px;
          border: 2.5px solid var(--border-2); border-top-color: var(--accent);
          border-radius: 50%; animation: spin 0.7s linear infinite; margin-bottom: 0.85rem;
        }

        /* Error */
        .notice-error {
          margin: 1.25rem; padding: 0.75rem 1rem;
          background: var(--err-dim); border: 1px solid rgba(248,113,113,0.18);
          border-radius: var(--r8); font-size: 0.82rem; color: var(--err); font-weight: 500;
        }

        /* Scroll wrapper — horizontal and vertical scroll on small screens */
        .tbl-scroll {
          overflow-x: auto;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 760px) {
          .tbl-scroll {
            max-height: 62vh;
            min-height: 220px;
          }
        }
        /* Subtle scrollbar for the table on mobile */
        .tbl-scroll::-webkit-scrollbar { height: 4px; }
        .tbl-scroll::-webkit-scrollbar-track { background: var(--bg-3); }
        .tbl-scroll::-webkit-scrollbar-thumb { background: var(--surface-3); border-radius: 2px; }

        /* Scroll hint — only visible on touch/small screens when content overflows */
        .tbl-scroll-hint {
          display: none;
          align-items: center;
          gap: 5px;
          padding: 0.45rem 1.4rem;
          font-size: 0.68rem;
          color: var(--t3);
          font-family: var(--font);
          background: var(--bg-3);
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 600px) {
          .tbl-scroll-hint { display: flex; }
        }

        /* Table head */
        .tbl-head {
          display: grid;
          grid-template-columns: minmax(130px,1.3fr) minmax(160px,2.2fr) 100px 72px;
          padding: 0.7rem 1.4rem;
          background: var(--bg-3);
          border-bottom: 1px solid var(--border);
          gap: 1rem;
          min-width: 560px;
        }
        .tbl-th {
          font-size: 0.63rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--t3); font-family: var(--font);
        }
        .tbl-th.r { text-align: right; }

        /* URL row */
        .url-row {
          display: grid;
          grid-template-columns: minmax(130px,1.3fr) minmax(160px,2.2fr) 100px 72px;
          align-items: center; gap: 1rem;
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
          animation: rowIn 0.25s ease both;
          min-width: 560px;
        }
        .url-row:last-child { border-bottom: none; }
        .url-row:hover { background: var(--bg-3); }

        .url-short {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 0.8rem; font-weight: 500;
          color: var(--accent); text-decoration: none;
          transition: color 0.15s; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .url-short:hover { color: #8fddbc; text-decoration: underline; text-underline-offset: 3px; }

        .url-dest {
          font-size: 0.8rem; color: var(--t2); font-weight: 300;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .url-clicks {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.8rem; color: var(--t2);
        }
        .url-clicks strong { color: var(--t1); font-weight: 600; font-family: var(--mono); }

        .btn-copy {
          display: inline-flex; align-items: center; justify-content: flex-end; gap: 5px;
          padding: 0.38rem 0.7rem; font-family: var(--font); font-size: 0.74rem; font-weight: 600;
          background: var(--surface-2); color: var(--t2);
          border: 1px solid var(--border-2); border-radius: var(--r6);
          cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap; margin-left: auto;
        }
        .btn-copy:hover { background: var(--surface-3); color: var(--t1); border-color: var(--border-3); }
        .btn-copy.copied { background: var(--ok-dim); color: var(--ok); border-color: rgba(110,231,183,0.22); }

        /* ── Sidebar ── */
        .urls-sidebar {
          display: flex; flex-direction: column; gap: 1rem;
          animation: fadeUp 0.4s 0.1s ease both;
          position: sticky; top: 90px;
        }

        .side-card {
          background: var(--surface); border: 1px solid var(--border-2);
          border-radius: var(--r16); padding: 1.1rem 1.2rem;
          box-shadow: var(--sh-sm);
        }
        .side-card-title {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--t3);
          margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;
        }
        .side-card-title::after { content:''; flex:1; height:1px; background: var(--border); }

        /* Stat rows */
        .side-stat {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.55rem 0; border-bottom: 1px solid var(--border);
        }
        .side-stat:last-child { border-bottom: none; }
        .side-stat-label { font-size: 0.78rem; color: var(--t2); font-weight: 400; }
        .side-stat-val {
          font-family: var(--mono); font-size: 0.85rem;
          font-weight: 600; color: var(--t1);
        }
        .side-stat-val.accent { color: var(--accent); }

        /* Top URL card */
        .top-url-box {
          margin-top: 0.25rem;
          background: var(--bg-3); border: 1px solid var(--border);
          border-radius: var(--r8); padding: 0.7rem 0.9rem;
        }
        .top-url-id {
          font-family: var(--mono); font-size: 0.78rem; font-weight: 600;
          color: var(--accent); display: block; margin-bottom: 4px;
        }
        .top-url-dest {
          font-size: 0.73rem; color: var(--t3); font-weight: 300;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
        }
        .top-url-clicks {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 6px; font-size: 0.72rem; color: var(--ok);
          font-family: var(--mono); font-weight: 600;
        }

        /* Quick nav */
        .side-nav { display: flex; flex-direction: column; gap: 4px; }
        .side-nav-link {
          display: flex; align-items: center; gap: 8px;
          padding: 0.55rem 0.7rem; border-radius: var(--r8);
          font-size: 0.81rem; font-weight: 500; color: var(--t2);
          text-decoration: none; transition: background 0.15s, color 0.15s;
        }
        .side-nav-link:hover { background: var(--surface-2); color: var(--t1); }
        .side-nav-link svg { color: var(--t3); flex-shrink: 0; }
      `}</style>

      <div className="urls-page">

        {/* Header — full width */}
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
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
              <path d="M13.5 8A5.5 5.5 0 112.8 5.2" strokeLinecap="round"/>
              <path d="M13.5 2.5v5.5H8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Main panel */}
        <div className="urls-panel">
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
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M11 5H7a3 3 0 000 6h4a3 3 0 000-6z" strokeLinecap="round"/>
                  <path d="M7.5 8h3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="state-title">No links yet</div>
              <div className="state-desc">Create your first short URL from the home page.</div>
              <Link className="btn-create" to="/">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                  <path d="M6 1v10M1 6h10" strokeLinecap="round"/>
                </svg>
                Create link
              </Link>
            </div>
          )}

          {!loading && !error && urls.length > 0 && (
            <>
              {/* Scroll hint — only shown on mobile */}
              <div className="tbl-scroll-hint">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" width="12" height="12">
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Scroll to see more
              </div>

              {/* Horizontally scrollable table wrapper */}
              <div className="tbl-scroll">
                <div className="tbl-head">
                  <span className="tbl-th">Short link</span>
                  <span className="tbl-th">Destination</span>
                  <span className="tbl-th">Clicks</span>
                  <span className="tbl-th r">Action</span>
                </div>

              {urls.map((url, index) => (
                <div className="url-row" key={url.id || url.shortId} style={{ animationDelay:`${index * 38}ms` }}>
                  <a className="url-short"
                    href={url.shortURL} target="_blank" rel="noreferrer"
                    onClick={() => markClicked(url.shortId)} title={url.shortURL}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" width="10" height="10" style={{flexShrink:0}}>
                      <path d="M7.5 1h3v3M10.5 1L5 6.5M4 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {url.shortId}
                  </a>

                  <p className="url-dest" title={url.redirectURL}>{url.redirectURL}</p>

                  <div className="url-clicks">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="11" height="11" style={{color:'var(--t3)', flexShrink:0}}>
                      <circle cx="6" cy="6" r="4.5"/>
                      <path d="M6 4v2l1.5 1" strokeLinecap="round"/>
                    </svg>
                    <strong>{url.totalClicks ?? 0}</strong>
                    <span style={{color:'var(--t3)', fontSize:'0.71rem'}}>clicks</span>
                  </div>

                  <button className={`btn-copy${copiedId === url.shortId ? ' copied' : ''}`}
                    type="button" onClick={() => copyUrl(url.shortURL, url.shortId)}
                  >
                    {copiedId === url.shortId
                      ? <><svg viewBox="0 0 10 10" fill="currentColor" width="9" height="9"><path fillRule="evenodd" d="M9.3 2.3a1 1 0 010 1.4l-5 5a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4L3.8 6.6l4.1-4.3a1 1 0 011.4 0z" clipRule="evenodd"/></svg>Copied</>
                      : <><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" width="9" height="9"><rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1"/><path d="M2 6.5V2a1 1 0 011-1h4.5" strokeLinecap="round"/></svg>Copy</>
                    }
                  </button>
                </div>
              ))}
              </div>{/* end .tbl-scroll */}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="urls-sidebar">

          {/* Summary stats */}
          <div className="side-card">
            <div className="side-card-title">Summary</div>
            <div className="side-stat">
              <span className="side-stat-label">Total links</span>
              <span className="side-stat-val accent">{urls.length}</span>
            </div>
            <div className="side-stat">
              <span className="side-stat-label">Total clicks</span>
              <span className="side-stat-val accent">{totalClicks}</span>
            </div>
            <div className="side-stat">
              <span className="side-stat-label">Avg. clicks</span>
              <span className="side-stat-val">
                {urls.length ? (totalClicks / urls.length).toFixed(1) : '—'}
              </span>
            </div>
          </div>

          {/* Top link */}
          {topUrl && (
            <div className="side-card">
              <div className="side-card-title">Top link</div>
              <div className="top-url-box">
                <span className="top-url-id">{topUrl.shortId}</span>
                <span className="top-url-dest">{topUrl.redirectURL}</span>
                <div className="top-url-clicks">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="10" height="10">
                    <circle cx="6" cy="6" r="4.5"/><path d="M6 4v2l1.5 1" strokeLinecap="round"/>
                  </svg>
                  {topUrl.totalClicks ?? 0} clicks
                </div>
              </div>
            </div>
          )}

          {/* Quick nav */}
          <div className="side-card">
            <div className="side-card-title">Navigate</div>
            <nav className="side-nav">
              <Link className="side-nav-link" to="/">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" width="13" height="13">
                  <path d="M10 4H4a3 3 0 000 6h6a3 3 0 000-6z" strokeLinecap="round"/>
                  <path d="M5.5 7h3" strokeLinecap="round"/>
                </svg>
                Create new link
              </Link>
            </nav>
          </div>

        </aside>

      </div>
    </>
  )
}

export default Urls