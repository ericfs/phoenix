((exports) => {

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
    this.stack_ = new FixedStack(HISTORY_DEPTH);
  }

  pushWindow(window) {
    this.stack_.push({
      window,
      hash: window.hash(),
      frame: window.frame(),
    });
    window.frame();
  }

  popWindow() {
    if (this.stack_.length == 0) {
      return {window: undefined, frame: undefined};
    }
    const {hash, frame} = this.stack_.pop();
    const window = Window.recent().find((w) => w.hash() == hash);
    if (window) {
      return {window, frame};
    } else {
      return {window: undefined, frame: undefined};
    }
  }

  debugString() {
    const lines = [];
    for (const stackFrame of this.stack_) {
      const {window, frame} = stackFrame;
      lines.push(`${window.app().name()} - ${window.title()}: ${JSON.stringify(frame)}`);
    }
    if (this.stack_.length == 0) {
      lines.push('History empty');
    }
    return lines.join('\n');
  }
}

class FixedStack {
  constructor(maxCapacity) {
    this.array_ = new Array(maxCapacity + 1);
    this.bottom_ = 0;
    this.next_ = 0;
  }

  push(x) {
    this.array_[this.next_] = x;
    this.next_ = this.modLength(this.next_ + 1);
    if (this.next_ == this.bottom_) {
      this.array_[this.bottom_] = undefined;
      this.bottom_ = this.modLength(this.bottom_ + 1);
    }
  }

  pop() {
    if (this.bottom_ == this.next_) {
      // Stack is empty
      return undefined;
    }

    this.next_ = this.modLength(this.next_ - 1);
    const val = this.array_[this.next_];
    this.array_[this.next_] = undefined;
    return val;
  }

  modLength(x) {
    const n = this.array_.length;
    return ((x % n) + n) % n;
  }

  get length() {
    return this.modLength(this.next_ - this.bottom_);
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.length) {
          return {
            value: this.array_[this.modLength(index++ + this.bottom_)],
            done: false
          };
        } else {
          return {done: true};
        }
      }
    };
  }
}

exports.History = History;

})(globalThis);
