(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};

  const baseFit = {
    scale: 1.08,
    offsetX: 0,
    offsetY: 4
  };

  const boksRedIdleRight = {
    svgSrc: 'assets/characters/boks_red/base-right-red.svg',
    fit: { ...baseFit }
  };

  const boksRedIdleLeft = {
    svgSrc: 'assets/characters/boks_red/base-left-red.svg',
    fit: { ...baseFit }
  };

  const boksRedIdleUp = {
    svgSrc: 'assets/characters/boks_red/base-up-red.svg',
    fit: { ...baseFit, scale: 1.04, offsetY: 1 }
  };

  const boksRedIdleDown = {
    svgSrc: 'assets/characters/boks_red/base-down-red.svg',
    fit: { ...baseFit, scale: 1.1, offsetY: 6 }
  };

  const boksRedDef = {
    id: 'boks_red',
    label: 'Boks Red Cube',
    hint: 'Versione rossa con viste direzionali dedicate',
    editorApproved: true,
    containerDrivenPose: false,
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': { ...boksRedIdleRight },
      'idle:left': { ...boksRedIdleLeft },
      'idle:up': { ...boksRedIdleUp },
      'idle:down': { ...boksRedIdleDown },
      'move:right': { ...boksRedIdleRight },
      'move:left': { ...boksRedIdleLeft },
      'move:up': { ...boksRedIdleUp },
      'move:down': { ...boksRedIdleDown },
      'turn:right': { ...boksRedIdleRight },
      'turn:left': { ...boksRedIdleLeft },
      'turn:up': { ...boksRedIdleUp },
      'turn:down': { ...boksRedIdleDown }
    }
  };

  window.BOKS_CHARACTER_DEFS.boks_red = boksRedDef;
})();
