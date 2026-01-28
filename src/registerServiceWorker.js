export default function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return
  navigator.serviceWorker.register('/sw.js').then(reg=>{
    console.log('Service worker registered', reg.scope)
  }).catch(err=>{
    console.warn('SW registration failed', err)
  })
}
