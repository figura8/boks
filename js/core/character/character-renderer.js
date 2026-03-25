(() => {
  const build = document.body?.dataset.build || 'dev';
  const DEFAULT_CHARACTER_ID = 'boks';
  const DEFAULT_ACTION = 'idle';
  const DEFAULT_DIRECTION = 'right';
  const lottieInstances = new WeakMap();

  function normalizeDirection(direction) {
    return ['right', 'left', 'up', 'down'].includes(direction) ? direction : DEFAULT_DIRECTION;
  }

  function normalizeAction(action) {
    return ['idle', 'move', 'turn'].includes(action) ? action : DEFAULT_ACTION;
  }

  function normalizeState(input = {}) {
    if (typeof input === 'string') {
      return {
        direction: normalizeDirection(input),
        action: DEFAULT_ACTION
      };
    }
    return {
      direction: normalizeDirection(input.direction),
      action: normalizeAction(input.action)
    };
  }

  function getCharacterManifest(characterId) {
    const defs = window.BOKS_CHARACTER_DEFS || {};
    return defs[characterId] || defs[DEFAULT_CHARACTER_ID] || null;
  }

  function getStateKey(action, direction) {
    return `${action}:${direction}`;
  }

  function escapeAttr(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function withBuildQuery(src = '') {
    const trimmed = String(src || '').trim();
    if (!trimmed) return '';
    const glue = trimmed.includes('?') ? '&' : '?';
    return `${trimmed}${glue}v=${encodeURIComponent(build)}`;
  }

  function clamp01(value) {
    return Math.max(0, Math.min(1, Number(value) || 0));
  }

  function buildFitStyle(state) {
    const scale = Number(state?.fit?.scale);
    const offsetX = Number(state?.fit?.offsetX);
    const offsetY = Number(state?.fit?.offsetY);
    const parts = [];
    if (Number.isFinite(scale) && scale > 0) {
      parts.push(`--hero-fit-scale:${scale}`);
    }
    if (Number.isFinite(offsetX)) {
      parts.push(`--hero-fit-offset-x:${offsetX}px`);
    }
    if (Number.isFinite(offsetY)) {
      parts.push(`--hero-fit-offset-y:${offsetY}px`);
    }
    return parts.join('; ');
  }

  function resolveState(characterId, action, direction) {
    const manifest = getCharacterManifest(characterId);
    if (!manifest) return null;

    const desiredKey = getStateKey(action, direction);
    const fallbackAction = manifest.defaultAction || DEFAULT_ACTION;
    const fallbackDirection = manifest.defaultDirection || DEFAULT_DIRECTION;
    const fallbackKey = getStateKey(fallbackAction, fallbackDirection);

    const directState = manifest.states?.[desiredKey];
    if (directState) {
      return {
        manifest,
        key: desiredKey,
        state: directState,
        usesFallback: false
      };
    }

    const fallbackState = manifest.states?.[fallbackKey];
    if (!fallbackState) return null;

    return {
      manifest,
      key: fallbackKey,
      state: fallbackState,
      usesFallback: true
    };
  }

  function isLottieState(state = {}) {
    return typeof state?.lottieSrc === 'string' && state.lottieSrc.trim().length > 0;
  }

  function buildLottieMarkup(state) {
    const lottieSrc = withBuildQuery(state.lottieSrc);
    const renderer = state.lottieRenderer === 'canvas' ? 'canvas' : 'svg';
    const loop = state.lottieLoop !== false ? 'true' : 'false';
    const autoplay = state.lottieAutoplay !== false ? 'true' : 'false';
    const previewSrc = withBuildQuery(state.previewSrc || state.fallbackSrc || state.src || '');
    const previewMarkup = previewSrc
      ? `<img class="boks-hero__img boks-hero__img--fallback" src="${escapeAttr(previewSrc)}" alt=""/>`
      : '';

    return `
      <span class="boks-hero__lottie-wrap" data-lottie-src="${escapeAttr(lottieSrc)}" data-lottie-renderer="${escapeAttr(renderer)}" data-lottie-loop="${escapeAttr(loop)}" data-lottie-autoplay="${escapeAttr(autoplay)}">
        <span class="boks-hero__lottie" aria-hidden="true"></span>
        ${previewMarkup}
      </span>
    `;
  }

  function buildImageMarkup(state) {
    if (!state?.src) return '';
    const src = withBuildQuery(state.src);
    return `<img class="boks-hero__img" src="${escapeAttr(src)}" alt=""/>`;
  }

  function isLottieAvailable() {
    return !!(window.lottie && typeof window.lottie.loadAnimation === 'function');
  }

  function getPlaybackSnapshot(root) {
    if (!root) return null;
    const wrap = root.querySelector?.('.boks-hero__lottie-wrap');
    if (!wrap) return null;
    const instance = lottieInstances.get(wrap);
    if (!instance || typeof instance.getDuration !== 'function') return null;
    const totalFrames = Number(instance.getDuration(true));
    if (!Number.isFinite(totalFrames) || totalFrames <= 0) return null;
    const currentFrame = Number(instance.currentFrame || 0);
    const normalized = ((currentFrame % totalFrames) + totalFrames) % totalFrames;
    return {
      progress: clamp01(normalized / totalFrames),
      paused: instance.isPaused === true
    };
  }

  function applyPlaybackSnapshot(root, snapshot) {
    if (!root || !snapshot || !Number.isFinite(snapshot.progress)) return;
    const wraps = root.querySelectorAll?.('.boks-hero__lottie-wrap') || [];
    wraps.forEach(wrap => {
      wrap.dataset.lottieSeekRatio = String(clamp01(snapshot.progress));
      wrap.dataset.lottieSeekPaused = snapshot.paused ? 'true' : 'false';
    });
  }

  function destroyIn(root) {
    if (!root) return;
    const wraps = root.querySelectorAll?.('.boks-hero__lottie-wrap') || [];
    wraps.forEach(wrap => {
      const instance = lottieInstances.get(wrap);
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
      lottieInstances.delete(wrap);
      wrap.classList.remove('is-ready', 'is-failed', 'is-unavailable');
      wrap.dataset.lottieMounted = 'false';
    });
  }

  function mountIn(root) {
    if (!root) return;
    const wraps = root.querySelectorAll?.('.boks-hero__lottie-wrap') || [];
    if (!wraps.length) return;

    if (!isLottieAvailable()) {
      wraps.forEach(wrap => {
        wrap.classList.add('is-unavailable');
      });
      return;
    }

    wraps.forEach(wrap => {
      if (lottieInstances.has(wrap)) return;
      const container = wrap.querySelector('.boks-hero__lottie');
      const path = wrap.dataset.lottieSrc || '';
      if (!container || !path) {
        wrap.classList.add('is-failed');
        return;
      }

      try {
        const shouldAutoplay = wrap.dataset.lottieAutoplay !== 'false';
        const animation = window.lottie.loadAnimation({
          container,
          renderer: wrap.dataset.lottieRenderer === 'canvas' ? 'canvas' : 'svg',
          loop: wrap.dataset.lottieLoop !== 'false',
          // Avviamo manualmente dopo eventuale seek per evitare flash sul frame iniziale.
          autoplay: false,
          path
        });

        animation.addEventListener?.('DOMLoaded', () => {
          const seekRatio = Number(wrap.dataset.lottieSeekRatio);
          const hasSeek = Number.isFinite(seekRatio);
          const total = Number(animation.getDuration(true));
          if (hasSeek) {
            if (Number.isFinite(total) && total > 0) {
              const frame = clamp01(seekRatio) * total;
              animation.goToAndStop(frame, true);
            }
          } else {
            animation.goToAndStop(0, true);
          }
          if (shouldAutoplay && wrap.dataset.lottieSeekPaused !== 'true') {
            animation.play();
          }
          delete wrap.dataset.lottieSeekRatio;
          delete wrap.dataset.lottieSeekPaused;
          requestAnimationFrame(() => {
            wrap.classList.add('is-ready');
            wrap.classList.remove('is-failed', 'is-unavailable');
          });
        });
        animation.addEventListener?.('data_failed', () => {
          wrap.classList.add('is-failed');
          wrap.classList.remove('is-ready');
        });

        wrap.dataset.lottieMounted = 'true';
        lottieInstances.set(wrap, animation);
      } catch (_err) {
        wrap.classList.add('is-failed');
        wrap.dataset.lottieMounted = 'false';
      }
    });
  }

  function resolveRender(input = {}) {
    const characterId = input.characterId || DEFAULT_CHARACTER_ID;
    const state = normalizeState(input);
    const resolved = resolveState(characterId, state.action, state.direction);
    if (!resolved?.state) return null;
    const requestedKey = getStateKey(state.action, state.direction);
    const resolvedKey = resolved.key;
    const fitStyle = buildFitStyle(resolved.state);
    return {
      characterId,
      state,
      resolved,
      requestedKey,
      resolvedKey,
      fitStyle
    };
  }

  function getRenderToken(input = {}) {
    const info = resolveRender(input);
    if (!info) return '';
    const state = info.resolved.state || {};
    const assetRef = isLottieState(state)
      ? withBuildQuery(state.lottieSrc)
      : withBuildQuery(state.src);
    const mode = isLottieState(state) ? 'lottie' : 'image';
    const renderer = state.lottieRenderer === 'canvas' ? 'canvas' : 'svg';
    const loop = state.lottieLoop !== false ? '1' : '0';
    const autoplay = state.lottieAutoplay !== false ? '1' : '0';
    return [
      info.characterId,
      mode,
      renderer,
      loop,
      autoplay,
      state.transformFallback || 'none',
      info.fitStyle,
      assetRef
    ].join('|');
  }

  function render(input = {}) {
    const info = resolveRender(input);
    if (!info) return '';
    const { characterId, state, resolved, requestedKey, resolvedKey, fitStyle } = info;
    if (!resolved?.state) return '';
    const contentMarkup = isLottieState(resolved.state)
      ? buildLottieMarkup(resolved.state)
      : buildImageMarkup(resolved.state);
    if (!contentMarkup) return '';

    return `
      <div class="boks-hero" data-character="${characterId}" data-direction="${state.direction}" data-action="${state.action}" data-state="${requestedKey}" data-resolved-state="${resolvedKey}" data-transform-fallback="${resolved.state.transformFallback || 'none'}" data-fallback="${resolved.usesFallback ? 'true' : 'false'}">
        <span class="boks-hero__art" aria-hidden="true">
          <span class="boks-hero__fit" style="${fitStyle}">
            ${contentMarkup}
          </span>
        </span>
      </div>
    `;
  }

  window.BOKS_CHARACTER_RENDERER = {
    render,
    getRenderToken,
    normalizeState,
    mountIn,
    destroyIn,
    getPlaybackSnapshot,
    applyPlaybackSnapshot,
    isLottieAvailable
  };
})();
