import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL

const Urls = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copiedId, setCopiedId] = useState('')

  const fetchUrls = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Unable to load links')
      }

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load links')
        }

        return response.json()
      })
      .then((data) => {
        if (!ignore) {
          setUrls(Array.isArray(data.urls) ? data.urls : [])
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Fetch URLs error:', err)
          setError('Could not load your links. Check that the backend server is running.')
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const copyUrl = async (shortURL, shortId) => {
    await window.navigator.clipboard.writeText(shortURL)
    setCopiedId(shortId)
    setTimeout(() => setCopiedId(''), 1800)
  }

  const markClicked = (shortId) => {
    setUrls((currentUrls) =>
      currentUrls.map((url) =>
        url.shortId === shortId
          ? { ...url, totalClicks: Number(url.totalClicks || 0) + 1 }
          : url,
      ),
    )
  }

  return (
    <div className="page-stack page-enter">
      <section className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            URL dashboard
          </span>
          <h1 className="page-title">Saved short links</h1>
          <p className="page-copy">Each row shows its matching destination and click count.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={fetchUrls} disabled={loading}>
          Refresh
        </button>
      </section>

      <section className="panel">
        <div className="panel-body">
          {error && <div className="notice notice-error">{error}</div>}

          {loading && !error && (
            <div className="empty-state">
              <div>
                <strong>Loading links</strong>
                <span>Fetching your latest URL data.</span>
              </div>
            </div>
          )}

          {!loading && !error && urls.length === 0 && (
            <div className="empty-state">
              <div>
                <strong>No links yet</strong>
                <span>Create your first short URL from the home page.</span>
                <div className="btn-row">
                  <Link className="button button-primary" to="/">Create link</Link>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && urls.length > 0 && (
            <div className="url-table">
              {urls.map((url, index) => (
                <article className="url-row" key={url.id || url.shortId} style={{ animationDelay: `${index * 45}ms` }}>
                  <div className="url-main">
                    <div className="url-title-line">
                      <a
                        className="url-short"
                        href={url.shortURL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => markClicked(url.shortId)}
                      >
                        /url/{url.shortId}
                      </a>
                      <span className="click-count" title="Clicks for this URL">
                        {url.totalClicks} clicks
                      </span>
                    </div>
                    <p className="url-destination">{url.redirectURL}</p>
                  </div>

                  <div className="row-actions">
                    <button
                      className="text-action"
                      type="button"
                      onClick={() => copyUrl(url.shortURL, url.shortId)}
                    >
                      {copiedId === url.shortId ? 'Copied' : 'Copy'}
                    </button>
                  
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Urls
