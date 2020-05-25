
/* CORNERS */

const corners = [
  ['q', HYPER, [WindowPosition.TOP_LEFT], 'Top Left Corner'],
  ['w', HYPER, [WindowPosition.TOP_RIGHT], 'Top Right Corner'],
  ['s', HYPER, [WindowPosition.BOTTOM_RIGHT], 'Bottom Left Corner'],
  ['a', HYPER, [WindowPosition.BOTTOM_LEFT], 'Bottom Right Corner']
];

setKeysHandler ( setFrame, corners );
