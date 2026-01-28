import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="container">
      <section id="hero" className="card hero" style={{marginTop:18}}>
        <div style={{flex:1}}>
          <h1>Listful — Your Privacy-First Task Manager</h1>
          <p className="muted">Manage tasks, subtasks, alerts, and timers locally. Fast, minimal, and focused.</p>
          <div className="cta-row" style={{marginTop:18}}>
            <Link to="/register"><button className="primary">Get Started — Free</button></Link>
            <Link to="/login"><button className="secondary">Sign In</button></Link>
          </div>
        </div>
        <div style={{width:420}}>
          <div className="card" style={{padding:14, borderRadius:12}}>
            <div style={{fontWeight:700, fontSize:16}}>Desktop + Mobile</div>
            <div className="muted small" style={{marginTop:8}}>Lightweight dashboard with tasks, subtasks, alerts and calendar.</div>
            <div style={{height:160, marginTop:12, borderRadius:8, background:'linear-gradient(180deg,#fff,#fbfdff)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)'}}>Mockup</div>
          </div>
        </div>
      </section>

      <section id="features" style={{marginTop:28}}>
        <h2>Features</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:12}}>
          <div className="card">
            <h4>Efficient Task Management</h4>
            <p className="muted small">Create tasks & subtasks, drag & drop, and mark done quickly.</p>
          </div>
          <div className="card">
            <h4>Structured Organization</h4>
            <p className="muted small">Nested hierarchies, collapsible lists, and project grouping.</p>
          </div>
          <div className="card">
            <h4>Custom Views & Filters</h4>
            <p className="muted small">Sort by priority, due date, completed/pending and search.</p>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:12}}>
          <div className="card">
            <h4>Reminders & Alerts</h4>
            <p className="muted small">Browser notifications, snooze, and alert history.</p>
          </div>
          <div className="card">
            <h4>Scheduling & Calendar</h4>
            <p className="muted small">Set dates, calendar views, drag to reschedule, color-coded priorities.</p>
          </div>
          <div className="card">
            <h4>Fast & Lightweight</h4>
            <p className="muted small">Minimal load, smooth animations, and keyboard-first interactions.</p>
          </div>
        </div>
      </section>

      <section id="pricing" style={{marginTop:28}}>
        <h2>Pricing</h2>
        <div style={{display:'flex',gap:12, marginTop:12}}>
          <div className="card" style={{flex:1}}>
            <h3>Free</h3>
            <p className="muted small">Full local functionality. No tracking. Local data only.</p>
            <div style={{marginTop:12}}><button className="primary">Start Free</button></div>
          </div>
          <div className="card" style={{flex:1}}>
            <h3>Paid (future)</h3>
            <p className="muted small">Cloud sync, advanced alerts, and cross-device history.</p>
            <div style={{marginTop:12}}><button className="secondary">Learn more</button></div>
          </div>
        </div>
      </section>

      <section id="made-for" style={{marginTop:28}}>
        <h2>What We’re Made For</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)', gap:12, marginTop:12}}>
          <div className="card">Students: assignments</div>
          <div className="card">Professionals: work projects</div>
          <div className="card">Freelancers: clients</div>
          <div className="card">Productivity enthusiasts</div>
        </div>
      </section>

      <section id="about" style={{marginTop:28}}>
        <h2>About</h2>
        <div className="card" style={{marginTop:12}}>
          <p className="muted small">Mission: Simple, private, fast productivity for everyone. Built with care, lightweight, and privacy-first.</p>
        </div>
      </section>

      <section id="help" style={{marginTop:28}}>
        <h2>Help & Tutorials</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
          <div className="card">Getting Started</div>
          <div className="card">Adding Tasks & Subtasks</div>
          <div className="card">Scheduling & Alerts</div>
          <div className="card">Timer Alerts & History</div>
        </div>
      </section>

      <section id="enhancements" style={{marginTop:28}}>
        <h2>Modern Enhancements</h2>
        <div style={{display:'flex',gap:12, marginTop:12}}>
          <div className="card">Dark mode</div>
          <div className="card">Keyboard shortcuts</div>
          <div className="card">Offline support</div>
        </div>
      </section>

      
    </div>
  )
}
