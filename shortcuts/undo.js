setKeyHandler('z', HYPER, () => {
  const {window, frame} = History.get().popWindow();
  if (window) {
    window.setFrame(frame);
  }
}, [], 'Undo');

setKeyHandler('f11', HYPER, () => {
  const text = History.get().debugString();
  dismissableModal.toggle('history-stack', {
    text,
    weight: 12
  });
}, [], 'Show History Stack Debug');