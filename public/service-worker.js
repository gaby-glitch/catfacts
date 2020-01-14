"use strict";// forces all errors, helps you write cleaner code

//files to cache for offline use
const FILES_TO_CACHE = [
            'offline.html',
            'index.html',
            'manifest.json',
            'client.js',
            'install.js'
           
];
       

/*Provide a cache name, allows us to version files so we 
*can easily update some files w/oaffectng others.Change
*the cache name any time any of the cached files have changed 
*/
const CACHE_NAME = "static-cache-v6";
const DATA_CACHE_NAME = 'data-cache-v3';
/*Adds on install event to the page that caches offline resouces*/

self.addEventListener("install", evt => {
  console.log("[ServiceWorker] Install");
  
  //Precache static resources
  evt.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
    console.log("[Service Worker] Pre-caching offline page");
    return cache.addAll(FILES_TO_CACHE);
  })
);
  self.skipWaiting();
});

/*Once your service worker is ready to control clients and handle 
* functional events like push and sync, uoull get an activate event
*/
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  
  // Remove previous cached data from disk.
  evt.waitUntil(
  caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME !== DATA_CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    }));
  })
    );
  // start controlling all loaded clients w/o reloading them
      self.clients.claim();
});
    
    /*handle fetch events by looking to network first, and the
    * cache second 
    */
    self.addEventListener('fetch', (evt) => {
      console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.mode !== 'navigate') {
  /* The fetch handler only needs to handle page navigations,
  * so other requests can be dumped out of the handler and dealt
  * with normally by the browser
  */
  return;
}
evt.respondWith(
    //try to get the request from the network 
    fetch(evt.request)
  // otherwise get it from cache
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
});
    