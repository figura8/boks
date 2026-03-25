(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};

  const idleRight = {
    lottieSrc: 'assets/animations/characters/boks_black/boks_black_idle_right_v01.json',
    previewSrc: 'assets/characters/boks_black/placeholder.png',
    lottieLoop: true,
    lottieAutoplay: true,
    lottieRenderer: 'svg',
    fit: {
      scale: 1,
      offsetX: 0,
      offsetY: 0
    }
  };
  const idleUp = {
    ...idleRight,
    lottieSrc: 'assets/animations/characters/boks_black/boks_black_idle_up_v01.json'
  };
  const idleLeft = {
    ...idleRight,
    transformFallback: 'mirror-x'
  };
  const idleDown = {
    ...idleRight,
    transformFallback: 'rotate-right'
  };

  window.BOKS_CHARACTER_DEFS['ae-idle'] = {
    id: 'ae-idle',
    label: 'AE Idle',
    hint: 'Template Lottie da After Effects',
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': { ...idleRight },
      'idle:left': { ...idleLeft },
      'idle:up': { ...idleUp },
      'idle:down': { ...idleDown },
      'move:right': { ...idleRight },
      'move:left': { ...idleLeft },
      'move:up': { ...idleUp },
      'move:down': { ...idleDown },
      'turn:right': { ...idleRight },
      'turn:left': { ...idleLeft },
      'turn:up': { ...idleUp },
      'turn:down': { ...idleDown }
    }
  };
})();
