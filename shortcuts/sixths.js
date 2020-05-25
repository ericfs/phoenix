
/* SIXTHS */

const sixths = [
  ['q', HYPER_SHIFT, [WindowPosition.SIXTHS_TOP_LEFT], "Top Left Sixth"],
  ['w', HYPER_SHIFT, [WindowPosition.SIXTHS_TOP_MIDDLE], "Top Middle Sixth"],
  ['e', HYPER_SHIFT, [WindowPosition.SIXTHS_TOP_RIGHT], "Top Right Sixth"],
  ['a', HYPER_SHIFT, [WindowPosition.SIXTHS_BOTTOM_LEFT], "Bottom Left Sixth"],
  ['s', HYPER_SHIFT, [WindowPosition.SIXTHS_BOTTOM_MIDDLE], "Bottom Middle Sixth"],
  ['d', HYPER_SHIFT, [WindowPosition.SIXTHS_BOTTOM_RIGHT], "Bottom Right Sixth"],

  // Keypad bindings for the same behavior
  ['keypad7', HYPER, [WindowPosition.SIXTHS_TOP_LEFT]],
  ['keypad8', HYPER, [WindowPosition.SIXTHS_TOP_MIDDLE]],
  ['keypad9', HYPER, [WindowPosition.SIXTHS_TOP_RIGHT]],
  ['keypad4', HYPER, [WindowPosition.SIXTHS_BOTTOM_LEFT]],
  ['keypad5', HYPER, [WindowPosition.SIXTHS_BOTTOM_MIDDLE]],
  ['keypad6', HYPER, [WindowPosition.SIXTHS_BOTTOM_RIGHT]]
];

setKeysHandler ( setFrame, sixths );
