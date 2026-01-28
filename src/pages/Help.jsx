import { useState } from 'react'

const TOPICS = [
  {t:'Getting Started', d:'Create an account, start your first list, and explore the UI.'},
  {t:'Adding Tasks & Subtasks', d:'Use the + button to add tasks; expand a task to add subtasks.'},
  {t:'Scheduling & Alerts', d:'Add due dates and enable reminders for important items.'},
  {t:'Timer Alerts & History', d:'Use timers for focused work and review past sessions.'},
  {t:'Custom Views & Filters', d:'Save custom filters and arrange tasks by priority or date.'}
]

export default function Help(){
  const [open, setOpen] = useState(null)
  return (
    <div className="container" style={{marginTop:18}}>
      <section className="card">
        <h1>Help & Tutorials</h1>
        <p className="muted">Guides to get the most out of Listful.</p>
      </section>

      <section style={{marginTop:12}}>
        <div style={{display:'grid',gap:12}}>
          {TOPICS.map((t,i)=> (
            <details key={t.t} open={open===i} onToggle={(e)=> setOpen(e.target.open? i : null)}>
              <summary>{t.t}</summary>
              <div className="card" style={{marginTop:8}}><p className="muted small">{t.d}</p></div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
