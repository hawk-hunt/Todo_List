export default function MadeFor(){
  const CATS = [
    {t:'Students', d:'Manage assignments, deadlines, and study plans.'},
    {t:'Professionals', d:'Organize projects, sprints, and meeting notes.'},
    {t:'Freelancers', d:'Track clients, tasks, and billing reminders.'},
    {t:'Productivity Enthusiasts', d:'Custom workflows, filters, and habit tracking.'}
  ]

  return (
    <div className="container" style={{marginTop:18}}>
      <section className="card">
        <h1>What We’re Made For</h1>
        <p className="muted">Use Listful for work, school, and personal projects.</p>
      </section>

      <section style={{marginTop:12}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
          {CATS.map(c=> (
            <div key={c.t} className="card">
              <strong>{c.t}</strong>
              <div className="muted small" style={{marginTop:8}}>{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
