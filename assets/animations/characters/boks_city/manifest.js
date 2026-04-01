(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};

  const baseFit = {
    scale: 1.08,
    offsetX: 0,
    offsetY: 4
  };

  const boksCityIdleRight = {
    svgSrc: 'assets/characters/boks_city/base-right-city.svg',
    fit: { ...baseFit }
  };

  const boksCityIdleLeft = {
    svgSrc: 'assets/characters/boks_city/base-left-city.svg',
    fit: { ...baseFit }
  };

  const boksCityIdleUp = {
    svgSrc: 'assets/characters/boks_city/base-up-city.svg',
    fit: { ...baseFit, scale: 1.04, offsetY: 1 }
  };

  const boksCityIdleDown = {
    svgSrc: 'assets/characters/boks_city/base-down-city.svg',
    fit: { ...baseFit, scale: 1.1, offsetY: 6 }
  };

  const boksCityDef = {
    id: 'boks_city',
    label: 'Boks City Cube',
    hint: 'Versione urbana con viste direzionali dedicate',
    editorApproved: true,
    containerDrivenPose: false,
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': { ...boksCityIdleRight },
      'idle:left': { ...boksCityIdleLeft },
      'idle:up': { ...boksCityIdleUp },
      'idle:down': { ...boksCityIdleDown },
      'move:right': { ...boksCityIdleRight },
      'move:left': { ...boksCityIdleLeft },
      'move:up': { ...boksCityIdleUp },
      'move:down': { ...boksCityIdleDown },
      'turn:right': { ...boksCityIdleRight },
      'turn:left': { ...boksCityIdleLeft },
      'turn:up': { ...boksCityIdleUp },
      'turn:down': { ...boksCityIdleDown }
    }
  };

  window.BOKS_CHARACTER_DEFS.boks_city = boksCityDef;
})();
