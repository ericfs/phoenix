((exports) => {

// Key track of all window frames so the previous frame can be found after
// a window change event starts.
const allWindows = new Map();

function init() {
  for (const window of Window.all()) {
    updateWindowState(window);
  }

  Event.on('windowDidOpen', updateWindowStateHandler);
  Event.on('windowDidClose', removeWindowState);
  Event.on('windowDidMove', updateWindowStateAndPush);
  Event.on('windowDidResize', updateWindowStateAndPush);
}

/**
 * Gets the last known window state, if there is one.
 */
function getLastWindowState(window) {
  if (!allWindows[window.hash()]) {
    return undefined;
  }
  
  // Find the last recorded frame.
  const savedFrame = allWindows[window.hash()];

  return new FrozenWindow(window.hash(), savedFrame);
};

function updateWindowState(window, frame = window.frame()) {
  // Round all stored values since fractional values are not used by
  // real windows.
  for (const key in frame) {
    frame[key] = Math.round(frame[key]);
  }
  allWindows[window.hash()] = frame;
};

function updateWindowStateHandler(window) {
  updateWindowState(window);
}

const removeWindowState = function(window) {
  delete allWindows[window.hash()];
}

let inProgressChange;
const updateWindowStateAndPush = function(window) {
  const previousWindowState = getLastWindowState(window);
  updateWindowState(window);

  // If there is no change, do nothing
  if (previousWindowState &&
      _.isEqual(previousWindowState.frame(), window.frame())) {
    return;
  }

  if (inProgressChange) {
    // Reset the timer
    cancelInProgressTimer();
  } else {
    // This is the first change in the series so push history.
    History.get().pushWindow(previousWindowState);
  }

  // Start an exculsion timer. While running do not push additional state.
  inProgressChange = {
    timerId: Timer.after(2, () => {
      cancelInProgressTimer();
    })  
  }
}

function cancelInProgressTimer() {
  Timer.off(inProgressChange.timerId);
  inProgressChange = undefined;
}

/**
 * Partial duck-typed implementation of window to contain saved state.
 */
class FrozenWindow {
  constructor(hash, frame) {
    this.hash_ = hash;
    this.frame_ = frame;
  }

  hash() {
    return this.hash_;
  }

  frame() {
    return this.frame_;
  }
}

init();

exports.windowState = {
  updateWindowState,
};

})(globalThis);