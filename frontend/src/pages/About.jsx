const About = () => {
  return (
    <div className="about-layout page-enter">
      <section className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Project flow
          </span>
          <h1 className="page-title">How the shortener works</h1>
          <p className="page-copy">A compact view of the real backend flow powering the app.</p>
        </div>
      </section>

      <section className="process-grid">
        <article className="process-card">
          <span className="process-number">01</span>
          <h2>Create</h2>
          <p>The frontend posts the destination URL to the Express route.</p>
        </article>
        <article className="process-card">
          <span className="process-number">02</span>
          <h2>Store</h2>
          <p>MongoDB saves the generated short ID, destination, and visit history.</p>
        </article>
        <article className="process-card">
          <span className="process-number">03</span>
          <h2>Track</h2>
          <p>Opening a short link redirects the visitor and records a click timestamp.</p>
        </article>
      </section>
    </div>
  )
}

export default About
