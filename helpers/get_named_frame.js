((g) => {

const dTop = ( TOP_HEIGHT_PERCENTAGE - 50 ) / 100;
const dLeft = ( LEFT_WIDTH_PERCENTAGE - 50 ) / 100;


g.WindowPosition = {
    /* SIDES */
    TOP: {x:0, y:0, width:1, height:.5 + dTop},
    RIGHT: {x:.5 + dLeft, y:0, width:.5 - dLeft, height:1},
    BOTTOM: {x:0, y:.5 + dTop, width:1, height:.5 - dTop},
    LEFT: {x:0, y:0, width:.5 - dLeft, height:1},
    /* CORNERS */
    TOP_LEFT: {x:0, y:0, width:.5 - dLeft, height:.5 + dTop},
    TOP_RIGHT: {x:.5 + dLeft, y:0, width:.5 - dLeft, height:.5 + dTop},
    BOTTOM_RIGHT: {x:.5 + dLeft, y:.5 + dTop, width:.5 - dLeft, height:.5 - dTop},
    BOTTOM_LEFT: {x:0, y:.5 + dTop, width:.5 - dLeft, height:.5 - dTop},
    /* HALVES */
    HALF_LEFT: {x:0/2, y:0, width:1/2, height:1},
    HALF_RIGHT: {x:1/2, y:0, width:1/2, height:1},
    /* THIRDS */
    THIRD_LEFT: {x:0/3, y:0, width:1/3, height:1},
    THIRD_MIDDLE: {x:1/3, y:0, width:1/3, height:1},
    THIRD_RIGHT: {x:2/3, y:0, width:1/3, height:1},
    /* SIXTHS */
    SIXTHS_TOP_LEFT: {x:0/3, y:0, width:1/3, height:1/2},
    SIXTHS_TOP_MIDDLE: {x:1/3, y:0, width:1/3, height:1/2},
    SIXTHS_TOP_RIGHT: {x:2/3, y:0, width:1/3, height:1/2},
    SIXTHS_BOTTOM_LEFT: {x:0/3, y:1/2, width:1/3, height:1/2},
    SIXTHS_BOTTOM_MIDDLE: {x:1/3, y:1/2, width:1/3, height:1/2},
    SIXTHS_BOTTOM_RIGHT: {x:2/3, y:1/2, width:1/3, height:1/2},
};

})(globalThis);
