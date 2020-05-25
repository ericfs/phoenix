((exports) => {

// Key track of all window frames so the previous frame can be found after
// a window change event starts.
const allWindows = new Map();

function init() {
  for (const window of Window.all()) {
    updateWindowState(window);
  }

  Event.on('windowDidOpen', updateWindowState);
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

  return new FrozenWindow(window, savedFrame);
}

function updateWindowState(window) {
  // Don't track non-normal windows
  if (!window.isNormal()) {
    return;
  }
  allWindows[window.hash()] = window.frame();
}

const removeWindowState = function(window) {
  delete allWindows[window.hash()];
}

let inProgressChange;
const updateWindowStateAndPush = function(window) {
  if (!window.isNormal()) {
    return;
  }
  const previousWindowState = getLastWindowState(window);
  updateWindowState(window);

  // If there is no change, do nothing
  if (!previousWindowState ||
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
  constructor(window, frame) {
    this.hash_ = window.hash();
    this.title_ = window.title();
    this.frame_ = frame;
    this.app_ = {
      name_: window.app().name(),
      name: () => this.app_.name_
    };
  }

  hash() {
    return this.hash_;
  }

  frame() {
    return this.frame_;
  }

  title() {
    return this.title_;
  }

  app() {
    return this.app_;
  }
}

init();

exports.windowState = {
  updateWindowState,
};

})(globalThis);