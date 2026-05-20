export const tutorialData = {
  "sequences": [
    {
      "id": "orientation_intro",
      "title": "Orientation intro",
      "beats": [
        {
          "type": "Narration",
          "caption": "Hello and welcome!!",
          "durationMs": 1800,
          "audioSrc": "assets/audio/sfx/gameplay/01_hello_and_welcome.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "This green meadow is a grid where our friend Bocs can move with your help!",
          "durationMs": 3400,
          "audioSrc": "assets/audio/sfx/gameplay/02_this_green_meadow_is_a.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "Hey Bocs...where are you?",
          "durationMs": 2000,
          "audioSrc": "assets/audio/sfx/gameplay/03_hey_bocs_where_are_you.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Spawn",
          "elementId": "boks",
          "transition": "bounce-in",
          "durationMs": 900,
          "delayMs": 0
        },
        {
          "type": "Pause",
          "durationMs": 1500
        },
        {
          "type": "Narration",
          "caption": "Here you are!",
          "durationMs": 1600,
          "audioSrc": "assets/audio/sfx/gameplay/04_here_you_are.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "Okay, let's see what happens if you double-click Bocs.",
          "durationMs": 2800,
          "audioSrc": "assets/audio/sfx/gameplay/05_okay_lets_see_what_happens.mp3"
        },
        {
          "type": "Unlock",
          "interactions": [
            "DOUBLE_TAP_BOKS"
          ]
        },
        {
          "type": "Wait for event",
          "eventName": "BOKS_DOUBLE_TAPPED",
          "minRepetitions": 1,
          "completionCondition": ""
        },
        {
          "type": "Lock"
        },
        {
          "type": "Narration",
          "caption": "Did you see?",
          "durationMs": 1600,
          "audioSrc": "assets/audio/sfx/gameplay/06_did_you_see.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "Now look down!",
          "durationMs": 1500,
          "audioSrc": "assets/audio/sfx/gameplay/07_now_look_down.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "And what happens if you try again?",
          "durationMs": 2300,
          "audioSrc": "assets/audio/sfx/gameplay/08_and_what_happens_if_you.mp3"
        },
        {
          "type": "Unlock",
          "interactions": [
            "DOUBLE_TAP_BOKS"
          ]
        },
        {
          "type": "Wait for event",
          "eventName": "BOKS_DOUBLE_TAPPED",
          "minRepetitions": 1,
          "completionCondition": ""
        },
        {
          "type": "Lock"
        },
        {
          "type": "Narration",
          "caption": "Oh, yes, now Bocs looks to your left.",
          "durationMs": 2600,
          "audioSrc": "assets/audio/sfx/gameplay/09_oh_yes_now_bocs_looks.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "Every time you double-click Bocs, he turns around and looks in a different direction.",
          "durationMs": 4600,
          "audioSrc": "assets/audio/sfx/gameplay/10_every_time_you_double_click.mp3"
        },
        {
          "type": "Unlock",
          "interactions": [
            "DOUBLE_TAP_BOKS"
          ]
        },
        {
          "type": "Wait for event",
          "eventName": "BOKS_DOUBLE_TAPPED",
          "minRepetitions": 1,
          "completionCondition": "BOKS_FACING_INITIAL_ORIENTATION"
        },
        {
          "type": "Lock"
        },
        {
          "type": "Narration",
          "caption": "Okay, now Bocs would like to explore the world around him a little.",
          "durationMs": 3600,
          "audioSrc": "assets/audio/sfx/gameplay/11_okay_now_bocs_would_like.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "But to move, he needs your help.",
          "durationMs": 2400,
          "audioSrc": "assets/audio/sfx/gameplay/12_but_to_move_he_needs.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Narration",
          "caption": "We have to tell Bocs where to go, and we'll need this.",
          "durationMs": 3600,
          "audioSrc": "assets/audio/sfx/gameplay/13_we_have_to_tell_bocs.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Spawn",
          "elementId": "forward_block",
          "transition": "bounce-in",
          "durationMs": 800,
          "delayMs": 0
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Spawn",
          "elementId": "slot",
          "transition": "bounce-in",
          "durationMs": 900,
          "delayMs": 0
        },
        {
          "type": "Pause",
          "durationMs": 1500
        },
        {
          "type": "Narration",
          "caption": "Now try dragging that block into the slot.",
          "durationMs": 3000,
          "audioSrc": "assets/audio/sfx/gameplay/14_now_try_dragging_that_block.mp3"
        },
        {
          "type": "Unlock",
          "interactions": [
            "DRAG_BLOCK"
          ]
        },
        {
          "type": "Wait for event",
          "eventName": "BLOCK_DROPPED_IN_SLOT",
          "minRepetitions": 1,
          "completionCondition": ""
        },
        {
          "type": "Lock"
        },
        {
          "type": "Pause",
          "durationMs": 1000
        },
        {
          "type": "Narration",
          "caption": "Great! Now let's see where Bocs goes.",
          "durationMs": 2600,
          "audioSrc": "assets/audio/sfx/gameplay/15_great_now_lets_see_where.mp3"
        },
        {
          "type": "Pause",
          "durationMs": 1500
        },
        {
          "type": "Spawn",
          "elementId": "play_button",
          "transition": "bounce-in",
          "durationMs": 800,
          "delayMs": 0
        },
        {
          "type": "Unlock",
          "interactions": [
            "PRESS_PLAY"
          ]
        },
        {
          "type": "Wait for event",
          "eventName": "PLAY_PRESSED",
          "minRepetitions": 1,
          "completionCondition": ""
        },
        {
          "type": "Lock"
        },
        {
          "type": "Wait for event",
          "eventName": "PROGRAM_EXECUTION_FINISHED",
          "minRepetitions": 1,
          "completionCondition": ""
        },
        {
          "type": "Pause",
          "durationMs": 1200
        },
        {
          "type": "Narration",
          "caption": "Now there's a place Bocs wants to reach. Can you help him get there?",
          "durationMs": 4000,
          "audioSrc": "assets/audio/sfx/gameplay/16_now_theres_a_place_bocs.mp3"
        },
        {
          "type": "Spawn",
          "elementId": "goal",
          "transition": "bounce-in",
          "durationMs": 800,
          "delayMs": 0
        },
        {
          "type": "Pause",
          "durationMs": 2000
        },
        {
          "type": "Unlock",
          "interactions": [
            "ALL"
          ]
        }
      ]
    }
  ]
} as const;

export type TutorialData = typeof tutorialData;
