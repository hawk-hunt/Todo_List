export default function About(){
  return (
    <div className="container" style={{marginTop:18}}>
      <section className="card">
        <h1>About Listful</h1>
        <p className="muted">Mission: Simple, private, fast productivity for everyone.</p>
      </section>

      <section style={{marginTop:12}}>
        <div className="card">
          <p className="muted small">Built with care, lightweight, and privacy-first. Listful emphasizes local-first features and clear, distraction-free design. Future optional cloud features will be opt-in and encrypted.</p>
        </div>
      </section>
    </div>
  )
}
