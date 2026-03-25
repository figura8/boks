(() => {
  const build = document.body?.dataset.build || 'dev';
  const DEFAULT_CHARACTER_ID = 'boks';
  const DEFAULT_ACTION = 'idle';
  const DEFAULT_DIRECTION = 'right';

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

  function render(input = {}) {
    const characterId = input.characterId || DEFAULT_CHARACTER_ID;
    const state = normalizeState(input);
    const resolved = resolveState(characterId, state.action, state.direction);
    if (!resolved?.state?.src) return '';
    const cacheBustedSrc = `${resolved.state.src}?v=${encodeURIComponent(build)}`;
    const requestedKey = getStateKey(state.action, state.direction);
    const resolvedKey = resolved.key;
    const fitStyle = buildFitStyle(resolved.state);

    return `
      <div class="boks-hero" data-character="${characterId}" data-direction="${state.direction}" data-action="${state.action}" data-state="${requestedKey}" data-resolved-state="${resolvedKey}" data-transform-fallback="${resolved.state.transformFallback || 'none'}" data-fallback="${resolved.usesFallback ? 'true' : 'false'}">
        <span class="boks-hero__art" aria-hidden="true">
          <span class="boks-hero__fit" style="${fitStyle}">
            <img class="boks-hero__img" src="${cacheBustedSrc}" alt=""/>
          </span>
        </span>
      </div>
    `;
  }

  window.BOKS_CHARACTER_RENDERER = {
    render,
    normalizeState
  };
})();
