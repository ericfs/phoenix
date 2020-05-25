setKeyHandler('z', HYPER, () => {
  const {window, frame} = History.get().popWindow();
  if (window) {
    window.setFrame(frame);
  }
}, [], 'Undo');