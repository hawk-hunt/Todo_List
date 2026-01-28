import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function useOutsideClick(ref, onOutside){
  useEffect(()=>{
    function handler(e){ if(ref.current && !ref.current.contains(e.target)) onOutside() }
    document.addEventListener('pointerdown', handler)
    return ()=> document.removeEventListener('pointerdown', handler)
  }, [ref, onOutside])
}

export default function Header({ user, onSignOut, toggleDark, dark }){
  const [open, setOpen] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const ref = useRef()

  useOutsideClick(ref, ()=>{ setOpen({}); setMobileOpen(false) })

  function toggle(menu){
    setOpen(s=> ({...s, [menu]: !s[menu]}))
  }

  function openOnHover(menu, val){
    // only for non-touch desktop
    if(window.innerWidth > 900) setOpen(s=> ({...s, [menu]: val}))
  }

  return (
    <header ref={ref} className="site-header header-nav" role="banner">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link to="/" className="logo" aria-label="Listful home"><strong>Listful</strong></Link>
      </div>

      <nav className="nav-main" role="navigation" aria-label="Main navigation">
          {user ? null : null}
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:8}}>
        {!user ? (
          <>
            <button className="login-link"><Link to="/login">Login</Link></button>
            <Link to="/register" className="primary-link">Register</Link>
          </>
        ) : (
          <>
            {user.username && <div className="username-badge">{user.username}</div>}
            <button onClick={()=>onSignOut()} className="primary-link">Sign out</button>
          </>
        )}
        <button className="mobile-toggle" onClick={()=>setMobileOpen(v=>!v)} aria-expanded={mobileOpen} aria-label="Open menu">☰</button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {!user ? (
            <div style={{padding:12, display:'flex', flexDirection:'column', gap:8}}>
              <Link to="/login" onClick={()=>setMobileOpen(false)}>Login</Link>
              <Link to="/register" onClick={()=>setMobileOpen(false)} className="primary-link">Register</Link>
            </div>
          ) : (
            <div style={{padding:12, display:'flex', gap:8}}>
              {user.username && <div className="username-badge">{user.username}</div>}
              <button onClick={()=>{ setMobileOpen(false); onSignOut() }} className="primary-link">Sign out</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
