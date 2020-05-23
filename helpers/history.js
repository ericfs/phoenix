/**
 * Manages window change history.
 */
class History {
  /**
   * Returns the singleton History instance.
   */
  static get() {
    if (!History.history_) {
      return History.history_ = new History();
    }
    return History.history_;
  }

  constructor() {
    this.stack_ = [];
  }

  pushWindow(window) {
    this.stack_.push({
      hash: window.hash(),
      frame: window.frame(),
    });
    Phoenix.log(JSON.stringify(this.stack_));
    window.frame();
  }

  popWindow() {
    if (this.stack_.length == 0) {
      return {window: undefined, frame: undefined};
    }
    const {hash, frame} = this.stack_.pop();
    const window = Window.recent().find((w) => w.hash() == hash);
    Phoenix.log(JSON.stringify(frame));
    if (window) {
      return {window, frame};
    } else {
      return {window: undefined, frame: undefined};
    }
  }
}