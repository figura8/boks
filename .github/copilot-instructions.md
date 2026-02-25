# Istruzioni per agenti AI — cubetto-pwa

Breve: repository è una single-page Progressive Web App (PWA) statica che mette insieme UI, logica di gioco e service worker direttamente in `index.html`.

- **Architettura (big picture):** frontend statico. File chiave: `index.html`, `manifest.webmanifest`, `service-worker.js`, `icons/`. Non c'è toolchain o build step presente: tutto il runtime è client-side.

- **Dove guardare per la logica:** la maggior parte della logica è inline in `index.html` (script principale). Cerca le costanti all'inizio dello script: `GRID_SIZE`, `goalPos`, `startPos`, `MOVE_DURATION_MS`.

- **Service worker:** registrato in fondo a `index.html` con `navigator.serviceWorker.register('service-worker.js')`. Modifiche a caching/strategy vanno fatte in `service-worker.js` e per forzare aggiornamenti bisogna aggiornare il nome delle cache o il codice del service worker.

- **Pattern e convenzioni di questo progetto:**
  - UI, CSS e JS sono inseriti inline in `index.html` (nessun bundler). Evitare di estrarre file a meno che non si aggiunga una toolchain.
  - Blocchi di programmazione: definiti tramite `blockPool` + `availableBlocks`; per aggiungere un nuovo blocco, aggiornare `blockPool` e la lista `availableBlocks` iniziale.
  - Sequenza programma: `programBlocks` è un array di 9 slot; la UI usa `.program-slot` con `data-slot`.

- **Elementi DOM importanti (usare questi ID/class per modifiche o test):**
  - `gameGrid`, `gridContainer`, `characterSprite`, `characterSpriteInner`
  - `availableBlocks`, `programSequence`, `runButton`, `message`

- **Esempi concreti:**
  - Per cambiare dimensione griglia modificare `GRID_SIZE` in `index.html` (script).
  - Per aggiungere un nuovo tipo di blocco: aggiungi una voce in `blockPool` (es. `{ direction:'jump', label:'Jump', color:'#...' }`) e popola `availableBlocks`.
  - Per cambiare comportamento SW: editare `service-worker.js` e incrementare il nome della cache per invalidare la cache client.

- **Run locale / debugging rapido:** server statico è sufficiente. Per sviluppo locale usare ad esempio:

  - `python -m http.server 8000` (apri http://localhost:8000)
  - oppure `npx serve -s . -l 5000` per un server statico più robusto.

- **Test manuale relativo a SW:** i service worker richiedono HTTPS in produzione; su localhost funzionano normalmente. Dopo aver aggiornato `service-worker.js`, ricaricare controllando la scheda Application -> Service Workers nel DevTools.

- **Commit / modifica:** non ci sono task di build automatici. Mantieni modifiche atomiche: UI/JS inline significa che piccole modifiche possono avere grandi effetti; preferisci cambiare costanti e funzioni ben identificate (cerca `initGrid`, `runProgram`, `moveCharacter`).

- **Caveat noti rilevati dal codice:**
  - Non esistono test automatizzati o CI visibili.
  - Nessuna minima toolchain; aggiungerla richiede aggiornare README e script di avvio.

Se qualcosa non è chiaro o vuoi che includa esempi di patch (es. aggiungere un blocco o cambiare la strategia di caching), dimmi quale sezione vuoi espandere.
