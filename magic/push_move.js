
setEventHandler ( 'windowDidMove', pushWindowChange );
setEventHandler ( 'windowDidResize', pushWindowChange );

let inProgressChange;

function pushWindowChange ( window ) {
  if ( !window.isNormal () || !window.isMain () ) return;
  Phoenix.log('pushWindowChange');
  if (!inProgressChange) {
    Phoenix.log('no in progress change');
    waitForAnotherChange(window);
  } else if (inProgressChange && window.isEqual(inProgressChange.window)) {
    Phoenix.log('timer off');
    Timer.off(inProgressChange.timerId);
  }
  waitForAnotherChange(window);
}

function waitForAnotherChange(window) {
  inProgressChange = {
    window,
    timerId: Timer.after(2, () => {
      Phoenix.log('push move');
      History.get().pushWindow(window);
    })
  };
}