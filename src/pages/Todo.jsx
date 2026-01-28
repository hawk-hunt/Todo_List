import { useEffect, useState, useRef } from 'react'
import Task from '../components/Task'

function makeId(){ return Math.random().toString(36).slice(2,9) }

export default function Todo({ user }){
  const key = 'tasks_' + user.email
  const alertsKey = 'alerts_' + user.email
  const [tasks, setTasks] = useState([])
  const [text,setText] = useState('')
  // project selector removed per user request
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [filter, setFilter] = useState('all')
  const notifKey = 'notif_enabled_' + user.email
  const [notificationsEnabled, setNotificationsEnabled] = useState(()=>{
    try{ return !!localStorage.getItem(notifKey) || (typeof Notification !== 'undefined' && Notification.permission === 'granted') }catch{return false}
  })
  const [alerts, setAlerts] = useState([])
  const saveTimerRef = useRef()
  const dragRef = useRef(null)

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem(key)||'[]')
    setTasks(saved)
    const a = JSON.parse(localStorage.getItem(alertsKey)||'[]')
    setAlerts(a)
  }, [])

  useEffect(()=>{
    // debounce saves
    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(()=>{
      localStorage.setItem(key, JSON.stringify(tasks))
    }, 120)
    return ()=> clearTimeout(saveTimerRef.current)
  }, [tasks])

  useEffect(()=>{
    localStorage.setItem(alertsKey, JSON.stringify(alerts))
  }, [alerts])

  function pushUndo(snapshot){
    setUndoStack(s=>[snapshot, ...s].slice(0,50))
    setRedoStack([])
  }

  function addTask(e){
    e && e.preventDefault()
    if(!text || !text.trim()) return
    const t = { id: makeId(), title: text, done:false, subtasks:[], labels: [], priority: 'normal', createdAt: Date.now() }
    pushUndo(tasks)
    setTasks([t, ...tasks])
    setText('')
  }

  function updateTask(updated){
    pushUndo(tasks)
    setTasks(tasks.map(t=> t.id===updated.id ? updated : t))
  }

  function deleteTask(id){
    pushUndo(tasks)
    setTasks(tasks.filter(t=> t.id!==id))
  }

  function undo(){
    if(undoStack.length === 0) return
    const [prev, ...rest] = undoStack
    setRedoStack(s=>[tasks, ...s].slice(0,50))
    setTasks(prev)
    setUndoStack(rest)
  }

  function redo(){
    if(redoStack.length === 0) return
    const [next, ...rest] = redoStack
    setUndoStack(s=>[tasks, ...s].slice(0,50))
    setTasks(next)
    setRedoStack(rest)
  }

  function toggleNotifications(){
    if(!(typeof window !== 'undefined' && 'Notification' in window)) return
    if(notificationsEnabled){
      try{ localStorage.removeItem(notifKey) }catch{}
      setNotificationsEnabled(false)
      return
    }
    Notification.requestPermission().then(p=>{
      if(p === 'granted'){
        try{ localStorage.setItem(notifKey, '1') }catch{}
        setNotificationsEnabled(true)
      }else{
        setNotificationsEnabled(false)
      }
    })
  }

  // apply filter (all / pending / completed)
  const visible = tasks.filter(t => {
    if(filter === 'all') return true
    if(filter === 'pending') return !t.done
    return t.done
  })

  // notifications: schedule immediate alerts for due dates in near future
  useEffect(()=>{
    if(!(typeof window !== 'undefined' && 'Notification' in window && notificationsEnabled && Notification.permission === 'granted')) return
    const timers = []
    tasks.forEach(t=>{
      if(t.dueDate && !t._alertScheduled){
        const due = new Date(t.dueDate).getTime()
        const now = Date.now()
        if(due > now){
          const id = setTimeout(()=>{
            if(Notification.permission === 'granted'){
              new Notification('Listful — Task due', { body: t.title })
            }
            setAlerts(a=> [{id: makeId(), taskId: t.id, title: t.title, at: Date.now(), type: 'due'}, ...a])
          }, Math.max(0, due - now))
          timers.push(id)
          // mark as scheduled in-memory
          t._alertScheduled = true
        }
      }
    })
    return ()=> timers.forEach(id=>clearTimeout(id))
  }, [tasks, notificationsEnabled])

  return (
    <div className="todo-layout">
      <aside className="sidebar card">
        <h4>Views</h4>
        <div className={`sidebar-item ${filter==='all'? 'active':''}`} onClick={()=>setFilter('all')}>All <span className="muted small">({tasks.length})</span></div>
        <div className={`sidebar-item ${filter==='pending'? 'active':''}`} onClick={()=>setFilter('pending')}>Pending <span className="muted small">({tasks.filter(t=>!t.done).length})</span></div>
        <div className={`sidebar-item ${filter==='completed'? 'active':''}`} onClick={()=>setFilter('completed')}>Completed <span className="muted small">({tasks.filter(t=>t.done).length})</span></div>
      </aside>

      <div className="main-area">
        <div className="card">
          <div className="row-space-between">
            <h3>Your Tasks</h3>
            <div className="flex-gap-8">
              <button onClick={undo} title="Undo">↶</button>
              <button onClick={redo} title="Redo">↷</button>
            </div>
          </div>

          <div className="mt-8">
            <button onClick={toggleNotifications} className={notificationsEnabled? 'primary' : ''} aria-pressed={notificationsEnabled}>
              {notificationsEnabled ? 'Notifications: On (click to disable)' : 'Enable notifications'}
            </button>
          </div>

          <form onSubmit={addTask} className="row mt-12">
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Quick add: title @label" />
            <button className="primary" disabled={!text || !text.trim()} aria-disabled={!text || !text.trim()}>Add</button>
          </form>

          

          <div className="task-list mt-12">
            {visible.length === 0 && <div className="muted">No tasks yet — add one.</div>}
            {visible.map(t=> (
              <Task key={t.id}
                task={t}
                onUpdate={updateTask}
                onDelete={deleteTask}
                draggable
                onDragStart={(e)=>{ dragRef.current = t.id; e.dataTransfer?.setData('text/plain', t.id) }}
                onDragOver={(e)=> e.preventDefault() }
                onDrop={(e)=>{
                  e.preventDefault()
                  const fromId = dragRef.current || e.dataTransfer.getData('text/plain')
                  const toId = t.id
                  if(!fromId || fromId === toId) return
                  const fromIdx = tasks.findIndex(x=>x.id===fromId)
                  const toIdx = tasks.findIndex(x=>x.id===toId)
                  if(fromIdx === -1 || toIdx === -1) return
                  const copy = [...tasks]
                  const [item] = copy.splice(fromIdx, 1)
                  copy.splice(toIdx, 0, item)
                  pushUndo(tasks)
                  setTasks(copy)
                }}
              />
            ))}
          </div>
        </div>

        {/* Alert history removed per user request */}
      </div>
    </div>
  )
}
