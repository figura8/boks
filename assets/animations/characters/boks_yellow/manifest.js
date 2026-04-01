(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};

  const baseFit = {
    scale: 1.08,
    offsetX: 0,
    offsetY: 4
  };

  const boksYellowIdleRight = {
    svgSrc: 'assets/characters/boks_yellow/base-right-yellow.svg',
    fit: { ...baseFit }
  };

  const boksYellowIdleLeft = {
    svgSrc: 'assets/characters/boks_yellow/base-left-yellow.svg',
    fit: { ...baseFit }
  };

  const boksYellowIdleUp = {
    svgSrc: 'assets/characters/boks_yellow/base-up-yellow.svg',
    fit: { ...baseFit, scale: 1.04, offsetY: 1 }
  };

  const boksYellowIdleDown = {
    svgSrc: 'assets/characters/boks_yellow/base-down-yellow.svg',
    fit: { ...baseFit, scale: 1.1, offsetY: 6 }
  };

  const boksYellowDef = {
    id: 'boks_yellow',
    label: 'Boks Yellow Cube',
    hint: 'Versione gialla con viste direzionali dedicate',
    editorApproved: true,
    containerDrivenPose: false,
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': { ...boksYellowIdleRight },
      'idle:left': { ...boksYellowIdleLeft },
      'idle:up': { ...boksYellowIdleUp },
      'idle:down': { ...boksYellowIdleDown },
      'move:right': { ...boksYellowIdleRight },
      'move:left': { ...boksYellowIdleLeft },
      'move:up': { ...boksYellowIdleUp },
      'move:down': { ...boksYellowIdleDown },
      'turn:right': { ...boksYellowIdleRight },
      'turn:left': { ...boksYellowIdleLeft },
      'turn:up': { ...boksYellowIdleUp },
      'turn:down': { ...boksYellowIdleDown }
    }
  };

  window.BOKS_CHARACTER_DEFS.boks_yellow = boksYellowDef;
})();
