(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};

  const baseFit = {
    scale: 1.08,
    offsetX: 0,
    offsetY: 4
  };

  const boksGreenIdleRight = {
    svgSrc: 'assets/characters/boks_green/base-right-green.svg',
    fit: { ...baseFit }
  };

  const boksGreenIdleLeft = {
    svgSrc: 'assets/characters/boks_green/base-left-green.svg',
    fit: { ...baseFit }
  };

  const boksGreenIdleUp = {
    svgSrc: 'assets/characters/boks_green/base-up-green.svg',
    fit: { ...baseFit, scale: 1.04, offsetY: 1 }
  };

  const boksGreenIdleDown = {
    svgSrc: 'assets/characters/boks_green/base-down-green.svg',
    fit: { ...baseFit, scale: 1.1, offsetY: 6 }
  };

  const boksGreenDef = {
    id: 'boks_green',
    legacyId: 'boks_black',
    label: 'Boks Green Cube',
    hint: 'Cubo verde con viste direzionali dedicate',
    containerDrivenPose: false,
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': { ...boksGreenIdleRight },
      'idle:left': { ...boksGreenIdleLeft },
      'idle:up': { ...boksGreenIdleUp },
      'idle:down': { ...boksGreenIdleDown },
      'move:right': { ...boksGreenIdleRight },
      'move:left': { ...boksGreenIdleLeft },
      'move:up': { ...boksGreenIdleUp },
      'move:down': { ...boksGreenIdleDown },
      'turn:right': { ...boksGreenIdleRight },
      'turn:left': { ...boksGreenIdleLeft },
      'turn:up': { ...boksGreenIdleUp },
      'turn:down': { ...boksGreenIdleDown }
    }
  };

  window.BOKS_CHARACTER_DEFS.boks_green = boksGreenDef;
  window.BOKS_CHARACTER_DEFS.boks_black = window.BOKS_CHARACTER_DEFS.boks_black || boksGreenDef;
})();
