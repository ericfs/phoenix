
/* SET FRAME */

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
