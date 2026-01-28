import { Link } from 'react-router-dom'

export default function Home(){
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

      <section style={{marginTop:28}}>
        <h2>Highlights</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:12}}>
          <div className="card">
            <h4>Privacy First</h4>
            <p className="muted small">Your data stays local by default — no tracking, no analytics.</p>
          </div>
          <div className="card">
            <h4>Fast & Lightweight</h4>
            <p className="muted small">Designed for speed and focus on the things that matter.</p>
          </div>
          <div className="card">
            <h4>Offline Ready</h4>
            <p className="muted small">Work anywhere — offline-first architecture planned for future sync.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
