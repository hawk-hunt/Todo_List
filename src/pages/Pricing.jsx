export default function Pricing(){
  return (
    <div className="container mt-18">
      <section className="card">
        <h1>Pricing</h1>
        <p className="muted">Simple pricing that starts free — privacy-first by design.</p>
      </section>

      <section className="mt-12">
        <div className="flex-gap-12">
          <div className="card flex-1">
            <h3>Free</h3>
            <p className="muted small">Full local functionality. No tracking. Local data only.</p>
            <div className="mt-12"><button className="primary">Start Free</button></div>
          </div>
          <div className="card flex-1">
            <h3>Paid (future)</h3>
            <p className="muted small">Cloud sync, advanced alerts, cross-device history (coming soon).</p>
            <div className="mt-12"><button className="secondary">Learn more</button></div>
          </div>
        </div>
      </section>
    </div>
  )
}
