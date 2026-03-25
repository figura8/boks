  if ('serviceWorker' in navigator) {
    const host = window.location.hostname;
    const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (isLocalhost) {
      navigator.serviceWorker.getRegistrations()
        .then(regs => Promise.all(regs.map(reg => reg.unregister())))
        .catch(() => {});
      return;
    }

    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('service-worker.js', {
          updateViaCache: 'none'
        });

        // Force periodic update checks while testing packaged app builds.
        reg.update();
        setInterval(() => reg.update(), 30000);

        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              worker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });
      } catch (err) {
        console.error('Service worker registration failed:', err);
      }
    });
  }
