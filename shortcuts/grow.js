
/* GROW */

const grow = [
  [
    'up', HYPER_SHIFT, [0, - GROW_AMOUNT, 0, GROW_AMOUNT],
    'Grow Up'
  ],
  [
    'right', HYPER_SHIFT, [0, 0, GROW_AMOUNT, 0],
    'Grow Right'
  ],
  [
    'down', HYPER_SHIFT, [0, 0, 0, GROW_AMOUNT],
    'Grow Down'
  ],
  [
    'left', HYPER_SHIFT, [- GROW_AMOUNT, 0, GROW_AMOUNT, 0],
    'Grow Left'
  ],
];

setKeysHandler ( growFrame, grow, false );
