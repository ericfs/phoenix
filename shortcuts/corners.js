
/* CORNERS */

const corners = [
  ['q', HYPER_ALT, [WindowPosition.TOP_LEFT], 'Top Left Corner'],
  ['w', HYPER_ALT, [WindowPosition.TOP_RIGHT], 'Top Right Corner'],
  ['s', HYPER_ALT, [WindowPosition.BOTTOM_RIGHT], 'Bottom Left Corner'],
  ['a', HYPER_ALT, [WindowPosition.BOTTOM_LEFT], 'Bottom Right Corner']
];

setKeysHandler ( setFrame, corners );
