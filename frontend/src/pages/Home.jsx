import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL

const Home = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const urlRef = useRef(null)

  async function shortenUrl(event) {
    event.preventDefault()

    if (!longUrl.trim()) {
      setError('Enter a URL before shortening.')
      return
    }

    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl.trim() }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

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

  return (
    <div className="home-layout">
      <section className="hero-panel page-enter">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          Shortify workspace
        </span>
        <h1 className="hero-title">Create clean short links in one focused place.</h1>
        <p className="hero-copy">
          Paste a destination, generate a local short URL, then review every link and its click count from the dashboard.
        </p>
        <div className="hero-actions">
          <Link className="button button-secondary" to="/urls">Open URL dashboard</Link>
        </div>
      </section>

      <section className="panel create-panel page-enter delay-1">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">New short URL</h2>
            <p className="panel-subtitle">The backend stores the destination and returns a short ID.</p>
          </div>
        </div>

        <div className="panel-body">
          <form onSubmit={shortenUrl}>
            <div className="form-row">
              <label className="label" htmlFor="long-url">Destination URL</label>
              <input
                id="long-url"
                className="input"
                type="url"
                placeholder="https://example.com/articles/product-launch"
                value={longUrl}
                onChange={(event) => setLongUrl(event.target.value)}
              />
            </div>

            <div className="btn-row">
              <button className="button button-primary button-grow" type="submit" disabled={loading || !longUrl.trim()}>
                {loading && <span className="spinner" />}
                {loading ? 'Creating link' : 'Create short link'}
              </button>
            </div>
          </form>

          {error && <div className="notice notice-error">{error}</div>}

          {shortUrl && (
            <div className="result-card">
              <div className="result-heading">
                <span>Short link ready</span>
                <span className="status-pill">Saved</span>
              </div>
              <input
                ref={urlRef}
                className="input result-input"
                type="text"
                readOnly
                value={shortUrl}
              />
              <div className="btn-row">
                <button className="button button-secondary button-grow" type="button" onClick={copyShortUrl}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <a className="button button-secondary button-grow" href={shortUrl} target="_blank" rel="noreferrer">
                  Open
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
