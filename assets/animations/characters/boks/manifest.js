(() => {
  window.BOKS_CHARACTER_DEFS = window.BOKS_CHARACTER_DEFS || {};
  const blueState = {
    src: 'assets/characters/boks/block-placeholder-blue.svg',
    fit: {
      scale: 1,
      offsetX: 0,
      offsetY: 0
    }
  };
  const redState = {
    src: 'assets/characters/boks/block-placeholder-red.svg',
    fit: { ...blueState.fit }
  };
  const yellowState = {
    src: 'assets/characters/boks/block-placeholder-yellow.svg',
    fit: { ...blueState.fit }
  };
  const greenState = {
    src: 'assets/characters/boks/block-placeholder-green.svg',
    fit: { ...blueState.fit }
  };

  window.BOKS_CHARACTER_DEFS.boks = {
    id: 'boks',
    defaultAction: 'idle',
    defaultDirection: 'right',
    states: {
      'idle:right': {
        ...blueState
      },
      'idle:left': {
        ...redState
      },
      'idle:up': {
        ...yellowState
      },
      'idle:down': {
        ...greenState
      },
      'move:right': {
        ...blueState
      },
      'move:left': {
        ...redState
      },
      'move:up': {
        ...yellowState
      },
      'move:down': {
        ...greenState
      },
      'turn:right': {
        ...blueState
      },
      'turn:left': {
        ...redState
      },
      'turn:up': {
        ...yellowState
      },
      'turn:down': {
        ...greenState
      }
    }
  };
})();
