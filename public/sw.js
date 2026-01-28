const CACHE_NAME = 'listful-v1'
const ASSETS = [ '/', '/index.html', '/src/index.css' ]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      if (resp) return resp
      return fetch(event.request).catch(() => {
        // Return offline page or empty response if fetch fails
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
      })
    })
  )
})
