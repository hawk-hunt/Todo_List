import { useState } from 'react'

function makeId(){ return Math.random().toString(36).slice(2,9) }

export default function Task({ task, onUpdate, onDelete, ...rest }){
  const [editing, setEditing] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [subText, setSubText] = useState('')
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.description || '')
  const [priority, setPriority] = useState(task.priority || 'normal')
  const [dueDate, setDueDate] = useState(task.dueDate || '')
  const [labels, setLabels] = useState((task.labels||[]).join(', '))

  function toggleDone(){
    onUpdate({ ...task, done: !task.done })
  }

  function save(){
    onUpdate({ ...task, title, description: desc, priority, dueDate: dueDate || null, labels: labels.split(',').map(s=>s.trim()).filter(Boolean) })
    setEditing(false)
  }

  function addSub(e){
    e.preventDefault()
    if(!subText) return
    const sub = { id: makeId(), title: subText, done: false }
    onUpdate({ ...task, subtasks: [...(task.subtasks||[]), sub] })
    setSubText('')
    setShowAdd(false)
  }

  function toggleSub(id){
    onUpdate({ ...task, subtasks: (task.subtasks||[]).map(s=> s.id===id ? {...s, done: !s.done} : s) })
  }

  return (
    <div {...rest} className="task card">
      <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <label style={{display:'flex',gap:8,alignItems:'center'}}>
            <input type="checkbox" checked={task.done} onChange={toggleDone} />
            {!editing ? (
              <div>
                <strong style={{textDecoration: task.done ? 'line-through' : 'none'}}>{task.title}</strong>
                <div className="muted small">{task.description}</div>
                <div className="muted small">{task.labels?.map(l=> <span key={l} style={{marginRight:6, color:'var(--accent)'}}>#{l}</span>)}</div>
              </div>
            ) : (
              <div>
                <input value={title} onChange={e=>setTitle(e.target.value)} />
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} />
                <div style={{display:'flex',gap:8,marginTop:6}}>
                  <select value={priority} onChange={e=>setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                  <input type="date" value={dueDate||''} onChange={e=>setDueDate(e.target.value)} />
                  <input placeholder="labels, comma" value={labels} onChange={e=>setLabels(e.target.value)} />
                </div>
              </div>
            )}
          </label>
        </div>

        <div className="row" style={{gap:8}}>
          {!editing ? <button onClick={()=>setEditing(true)}>Edit</button> : <button onClick={save}>Save</button>}
          <button onClick={()=>onDelete(task.id)}>Delete</button>
        </div>
      </div>

      {task.subtasks?.length > 0 && (
        <div style={{marginTop:8,display:'flex',flexDirection:'column',gap:6}}>
          {task.subtasks.map(s=> (
            <div key={s.id} className="subtask row" style={{justifyContent:'space-between'}}>
              <label style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type="checkbox" checked={s.done} onChange={()=>toggleSub(s.id)} />
                <span style={{textDecoration: s.done ? 'line-through' : 'none'}}>{s.title}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <form onSubmit={addSub} style={{marginTop:8}}>
          <div className="row" style={{gap:8}}>
            <input value={subText} onChange={e=>setSubText(e.target.value)} placeholder="Subtask title" />
            <button type="submit">Add</button>
          </div>
        </form>
      )}
    </div>
  )
}
