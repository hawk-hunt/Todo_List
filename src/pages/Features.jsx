export default function Features(){
  const FEATURES = [
    {t: 'Efficient Task Management', d: 'Create tasks & subtasks, drag & drop, and mark done quickly.'},
    {t: 'Structured Organization', d: 'Nested hierarchies, collapsible lists, and project grouping.'},
    {t: 'Custom Views & Filters', d: 'Sort by priority, due date, completed/pending and search.'},
    {t: 'Reminders & Alerts', d: 'Browser notifications, snooze, and alert history.'},
    {t: 'Scheduling & Calendar', d: 'Set dates, calendar views, drag to reschedule, color-coded priorities.'},
    {t: 'Fast & Lightweight', d: 'Minimal load, smooth animations, and keyboard-first interactions.'},
    {t: 'Privacy by Design', d: 'Local data by default; future opt-in sync for those who choose it.'}
  ]

  return (
    <div className="container" style={{marginTop:18}}>
      <section className="card">
        <h1>Features</h1>
        <p className="muted">Everything you need to stay focused, organized, and private.</p>
      </section>

      <section style={{marginTop:18}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
          {FEATURES.map(f=> (
            <div key={f.t} className="card">
              <h4>{f.t}</h4>
              <p className="muted small">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
