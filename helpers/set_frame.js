
/* SET FRAME */

((exports) => {

function setFrame ( ratioFrame, window = Window.focused () ) {
  const {x, y, width, height} = ratioFrame;
  if ( !window ) return;

  const screen = window.screen (),
        frame = screen.flippedVisibleFrame ();

  History.get().pushWindow(window);
  window.setFrame ({
    x: frame.x + ( frame.width * x ),
    y: frame.y + ( frame.height * y ),
    width: frame.width * width,
    height: frame.height * height
  });
}

// Record the new frame before actually setting it. This allows
// the window change listeners to avoid handling a change that is
// already applied.
Window.prototype.nativeSetFrame = Window.prototype.setFrame;
Window.prototype.setFrame = function(frame) {
  windowState.updateWindowState(this, frame);
  this.nativeSetFrame(frame);
};

exports.setFrame = setFrame;

})(globalThis);
