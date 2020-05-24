
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
  this.nativeSetFrame(frame);
  // Record the newly set window dimensions. The values read from the window
  // may be rounded or otherwise different from the requested values.
  // This will be updated before the async window resize event.
  windowState.updateWindowState(this);
};

exports.setFrame = setFrame;

})(globalThis);
