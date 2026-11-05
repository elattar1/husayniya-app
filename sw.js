/**
 * خدمات الحسينية — ملف Service Worker المحدث
 * استراتيجية: Network-First (جلب أحدث التحديثات دائماً من الإنترنت مع حفظ نسخة للطوارئ فقط)
 */

const CACHE_NAME = 'husayniya-v21-notifications-and-gps';

self.addEventListener('install', (event) => {
  // التفعيل الفوري للنسخة الجديدة دون انتظار إغلاق التبويبات
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // مسح جميع النسخ القديمة فوراً من ذاكرة الهاتف
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 حذف كاش قديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // فقط طلبات GET و بروتوكول http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  // Network-First: حاول دائماً جلب النسخة الأحدث من السيرفر أولاً
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // إذا نجح الاتصال، نحدث الكاش بالنسخة الجديدة
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // في حال انقطاع الإنترنت التام فقط، نستخدم الكاش
        return caches.match(event.request);
      })
  );
});

// ── Notifications & Push Events ──
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || 'husayniya-tracking.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('husayniya') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('push', (event) => {
  let data = { title: 'خدمات الحسينية 🛵', body: 'تحديث جديد بخصوص طلبك!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || 'husayniya-tracking.html' }
    })
  );
});
