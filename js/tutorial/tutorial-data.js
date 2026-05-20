(() => {
  window.BOKS_TUTORIAL_DATA = {
  "intro": {
    "id": "orientation_intro",
    "title": "Orientation intro",
    "beats": [
      {
        "id": "01-hello-and-welcome",
        "type": "narration",
        "text": "Hello and welcome!!",
        "durationMs": 1800,
        "audio": "assets/audio/sfx/gameplay/01_hello_and_welcome.mp3"
      },
      {
        "id": "02-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "03-this-green-meadow-is-a-grid-where-our-frie",
        "type": "narration",
        "text": "This green meadow is a grid where our friend Bocs can move with your help!",
        "durationMs": 3400,
        "audio": "assets/audio/sfx/gameplay/02_this_green_meadow_is_a.mp3"
      },
      {
        "id": "04-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "05-hey-bocs-where-are-you",
        "type": "narration",
        "text": "Hey Bocs...where are you?",
        "durationMs": 2000,
        "audio": "assets/audio/sfx/gameplay/03_hey_bocs_where_are_you.mp3"
      },
      {
        "id": "06-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "07-boks",
        "type": "call",
        "action": "revealBoks"
      },
      {
        "id": "08-pause",
        "type": "pause",
        "durationMs": 1500
      },
      {
        "id": "09-here-you-are",
        "type": "narration",
        "text": "Here you are!",
        "durationMs": 1600,
        "audio": "assets/audio/sfx/gameplay/04_here_you_are.mp3"
      },
      {
        "id": "10-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "11-okay-lets-see-what-happens-if-you-double-c",
        "type": "narration",
        "text": "Okay, let's see what happens if you double-click Bocs.",
        "durationMs": 2800,
        "audio": "assets/audio/sfx/gameplay/05_okay_lets_see_what_happens.mp3"
      },
      {
        "id": "12-unlock",
        "type": "call",
        "action": "unlockBoksDoubleClick"
      },
      {
        "id": "13-boks-double-tapped",
        "type": "waitFor",
        "event": "boks-turned",
        "count": 1
      },
      {
        "id": "14-lock",
        "type": "call",
        "action": "lockBoksDoubleClick"
      },
      {
        "id": "15-did-you-see",
        "type": "narration",
        "text": "Did you see?",
        "durationMs": 1600,
        "audio": "assets/audio/sfx/gameplay/06_did_you_see.mp3"
      },
      {
        "id": "16-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "17-now-look-down",
        "type": "narration",
        "text": "Now look down!",
        "durationMs": 1500,
        "audio": "assets/audio/sfx/gameplay/07_now_look_down.mp3"
      },
      {
        "id": "18-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "19-and-what-happens-if-you-try-again",
        "type": "narration",
        "text": "And what happens if you try again?",
        "durationMs": 2300,
        "audio": "assets/audio/sfx/gameplay/08_and_what_happens_if_you.mp3"
      },
      {
        "id": "20-unlock",
        "type": "call",
        "action": "unlockBoksDoubleClick"
      },
      {
        "id": "21-boks-double-tapped",
        "type": "waitFor",
        "event": "boks-turned",
        "count": 1
      },
      {
        "id": "22-lock",
        "type": "call",
        "action": "lockBoksDoubleClick"
      },
      {
        "id": "23-oh-yes-now-bocs-looks-to-your-left",
        "type": "narration",
        "text": "Oh, yes, now Bocs looks to your left.",
        "durationMs": 2600,
        "audio": "assets/audio/sfx/gameplay/09_oh_yes_now_bocs_looks.mp3"
      },
      {
        "id": "24-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "25-every-time-you-double-click-bocs-he-turns-",
        "type": "narration",
        "text": "Every time you double-click Bocs, he turns around and looks in a different direction.",
        "durationMs": 4600,
        "audio": "assets/audio/sfx/gameplay/10_every_time_you_double_click.mp3"
      },
      {
        "id": "26-unlock",
        "type": "call",
        "action": "unlockBoksDoubleClick"
      },
      {
        "id": "27-boks-double-tapped",
        "type": "waitFor",
        "event": "boks-facing-start",
        "count": 1
      },
      {
        "id": "28-lock",
        "type": "call",
        "action": "lockBoksDoubleClick"
      },
      {
        "id": "29-okay-now-bocs-would-like-to-explore-the-wo",
        "type": "narration",
        "text": "Okay, now Bocs would like to explore the world around him a little.",
        "durationMs": 3600,
        "audio": "assets/audio/sfx/gameplay/11_okay_now_bocs_would_like.mp3"
      },
      {
        "id": "30-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "31-but-to-move-he-needs-your-help",
        "type": "narration",
        "text": "But to move, he needs your help.",
        "durationMs": 2400,
        "audio": "assets/audio/sfx/gameplay/12_but_to_move_he_needs.mp3"
      },
      {
        "id": "32-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "33-we-have-to-tell-bocs-where-to-go-and-well-",
        "type": "narration",
        "text": "We have to tell Bocs where to go, and we'll need this.",
        "durationMs": 3600,
        "audio": "assets/audio/sfx/gameplay/13_we_have_to_tell_bocs.mp3"
      },
      {
        "id": "34-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "35-forward-block",
        "type": "call",
        "action": "revealForwardBlock"
      },
      {
        "id": "36-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "37-slot",
        "type": "call",
        "action": "revealSlot"
      },
      {
        "id": "38-pause",
        "type": "pause",
        "durationMs": 1500
      },
      {
        "id": "39-now-try-dragging-that-block-into-the-slot",
        "type": "narration",
        "text": "Now try dragging that block into the slot.",
        "durationMs": 3000,
        "audio": "assets/audio/sfx/gameplay/14_now_try_dragging_that_block.mp3"
      },
      {
        "id": "40-unlock",
        "type": "call",
        "action": "unlockInteractions",
        "interactions": [
          "DRAG_BLOCK"
        ]
      },
      {
        "id": "41-block-dropped-in-slot",
        "type": "waitFor",
        "event": "block-dropped-in-slot",
        "count": 1
      },
      {
        "id": "42-lock",
        "type": "call",
        "action": "lockBoksDoubleClick"
      },
      {
        "id": "43-pause",
        "type": "pause",
        "durationMs": 1000
      },
      {
        "id": "44-great-now-lets-see-where-bocs-goes",
        "type": "narration",
        "text": "Great! Now let's see where Bocs goes.",
        "durationMs": 2600,
        "audio": "assets/audio/sfx/gameplay/15_great_now_lets_see_where.mp3"
      },
      {
        "id": "45-pause",
        "type": "pause",
        "durationMs": 1500
      },
      {
        "id": "46-play-button",
        "type": "call",
        "action": "revealPlayButton"
      },
      {
        "id": "47-unlock",
        "type": "call",
        "action": "unlockInteractions",
        "interactions": [
          "PRESS_PLAY"
        ]
      },
      {
        "id": "48-play-pressed",
        "type": "waitFor",
        "event": "play-pressed",
        "count": 1
      },
      {
        "id": "49-lock",
        "type": "call",
        "action": "lockBoksDoubleClick"
      },
      {
        "id": "50-program-execution-finished",
        "type": "waitFor",
        "event": "program-execution-finished",
        "count": 1
      },
      {
        "id": "51-pause",
        "type": "pause",
        "durationMs": 1200
      },
      {
        "id": "52-now-theres-a-place-bocs-wants-to-reach-can",
        "type": "narration",
        "text": "Now there's a place Bocs wants to reach. Can you help him get there?",
        "durationMs": 4000,
        "audio": "assets/audio/sfx/gameplay/16_now_theres_a_place_bocs.mp3"
      },
      {
        "id": "53-goal",
        "type": "call",
        "action": "revealGoal"
      },
      {
        "id": "54-pause",
        "type": "pause",
        "durationMs": 2000
      },
      {
        "id": "55-unlock",
        "type": "call",
        "action": "unlockBoksDoubleClick"
      }
    ]
  }
};
})();
