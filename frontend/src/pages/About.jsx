const steps = [
  {
    num: '01',
    title: 'Create',
    desc: 'The frontend POSTs the destination URL to the Express route, which validates and processes it.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M8 2v12M2 8h12" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Store',
    desc: 'MongoDB persists the generated short ID, the destination URL, and a visit history array.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <ellipse cx="8" cy="5" rx="5" ry="2"/>
        <path d="M3 5v3c0 1.1 2.24 2 5 2s5-.9 5-2V5" strokeLinecap="round"/>
        <path d="M3 8v3c0 1.1 2.24 2 5 2s5-.9 5-2V8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Redirect',
    desc: 'Visiting a short link hits the Express redirect handler, which resolves the ID and 301-redirects the visitor.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Track',
    desc: 'Each redirect appends a timestamp to the visit history and increments the totalClicks counter in MongoDB.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <circle cx="8" cy="8" r="5.5"/>
        <path d="M8 5v3l2 1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const stack = [
  { name: 'React 18',      role: 'UI framework',       dot: '#61dafb' },
  { name: 'React Router',  role: 'Client routing',     dot: '#ca4245' },
  { name: 'Express',       role: 'REST API server',    dot: '#68a063' },
  { name: 'MongoDB',       role: 'Persistence layer',  dot: '#47a248' },
]

const About = () => (
  <>
    <style>{`
      .about-page {
        width: 100%;
        max-width: 760px;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        animation: fadeUp 0.4s ease both;
      }

      /* ── Hero ── */
      .about-hero {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
      }
      .about-eyebrow {
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
      .about-eyebrow-dash {
        width: 20px; height: 1.5px;
        background: var(--accent);
        opacity: 0.5;
      }
      .about-title {
        font-size: clamp(1.7rem, 4vw, 2.4rem);
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 1.1;
        color: var(--t1);
      }
      .about-title em {
        font-style: normal;
        color: var(--accent);
      }
      .about-lead {
        font-size: 0.9rem;
        color: var(--t2);
        line-height: 1.7;
        font-weight: 300;
        max-width: 520px;
      }

      /* ── Section label ── */
      .section-label {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--t3);
        margin-bottom: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .section-label::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--border);
      }

      /* ── Process grid ── */
      .process-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.75rem;
      }
      .process-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--r16);
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        box-shadow: var(--sh-sm);
        transition: border-color 0.2s, box-shadow 0.2s, transform 0.18s;
        animation: fadeUp 0.4s ease both;
        cursor: default;
      }
      .process-card:hover {
        border-color: var(--border-3);
        box-shadow: var(--sh-md);
        transform: translateY(-2px);
      }
      .process-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .process-icon {
        width: 36px; height: 36px;
        border-radius: var(--r8);
        background: var(--accent-dim);
        display: flex; align-items: center; justify-content: center;
        color: var(--accent);
        flex-shrink: 0;
      }
      .process-num {
        font-family: var(--mono);
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--t3);
        letter-spacing: 0.04em;
      }
      .process-title {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.02em;
      }
      .process-desc {
        font-size: 0.78rem;
        color: var(--t2);
        line-height: 1.65;
        font-weight: 300;
      }

      /* ── Stack table ── */
      .stack-panel {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--r16);
        overflow: hidden;
        box-shadow: var(--sh-sm);
      }
      .stack-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1.25rem;
        border-bottom: 1px solid var(--border);
        transition: background 0.15s;
        gap: 1rem;
      }
      .stack-row:last-child { border-bottom: none; }
      .stack-row:hover { background: var(--bg-3); }
      .stack-name-wrap {
        display: flex;
        align-items: center;
        gap: 9px;
      }
      .stack-dot-large {
        width: 8px; height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .stack-name {
        font-family: var(--mono);
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--t1);
      }
      .stack-role {
        font-size: 0.76rem;
        color: var(--t3);
        font-weight: 300;
        font-family: var(--font);
      }
    `}</style>

    <div className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <div className="about-eyebrow">
          <span className="about-eyebrow-dash" />
          Project flow
        </div>
        <h1 className="about-title">How the<br /><em>shortener</em> works.</h1>
        <p className="about-lead">
          A compact view of the real backend flow — from paste to redirect, every step explained.
        </p>
      </div>

      {/* Process steps */}
      <div>
        <div className="section-label">Backend flow</div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="process-card" key={s.num} style={{ animationDelay: `${i * 70}ms` }}>
              <div className="process-card-top">
                <span className="process-icon">{s.icon}</span>
                <span className="process-num">{s.num}</span>
              </div>
              <div className="process-title">{s.title}</div>
              <p className="process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div>
        <div className="section-label">Tech stack</div>
        <div className="stack-panel">
          {stack.map(({ name, role, dot }) => (
            <div className="stack-row" key={name}>
              <div className="stack-name-wrap">
                <span className="stack-dot-large" style={{ background: dot }} />
                <span className="stack-name">{name}</span>
              </div>
              <span className="stack-role">{role}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </>
)

export default About