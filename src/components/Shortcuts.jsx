import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Shortcuts(){
  const nav = useNavigate()
  useEffect(()=>{
    function onKey(e){
      // simple, discoverable shortcuts: g then key
      if(e.key === 'h' && (e.ctrlKey || e.metaKey)) { nav('/') }
      if(e.key === 'f' && (e.ctrlKey || e.metaKey)) { nav('/features') }
      if(e.key === 'p' && (e.ctrlKey || e.metaKey)) { nav('/pricing') }
      if(e.key === 'm' && (e.ctrlKey || e.metaKey)) { nav('/made-for') }
      if(e.key === '?' && (e.ctrlKey || e.metaKey)) { nav('/help') }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [nav])
  return null
}
