console.log('hello from sw.js'); // this should not be printed because sw is not launched by itself, it calls the browser (to be confirmed)
self.addEventListener('install', function(event) {console.log('SW installed', event);});
self.addEventListener('fetch', function(event) {console.log('SW fetched', event);});
self.addEventListener('activate', function(event) {console.log('SW activated', event);});