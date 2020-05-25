((exports) => {

const hints = new Map();
let openModal;

function registerHint(key, modifiers, description) {
  const keys = {key, modifiers};
  hints.set(keys, description);
}

function keysToString(keys) {
  return keys.modifiers.join(' ') + ' ' + keys.key.toUpperCase();
}

function showHints() {
  if (openModal) {
    return;
  }
  
  let hintLines = [];
  hints.forEach((value, key) => {
    hintLines.push(keysToString(key) + ' : ' + value);
  });
  const text = hintLines.join('\n');
  const modal = modalScreen({
    text,
    weight: 12,
    duration: 60  // Set a long timeout to ensure the modal goes way eventaully
  });
  const escapeId = Key.on('escape', [], () => hideHints());
  // Add a timer in addition to the modal duration in order to clean up the
  // escape key registration in addition to hiding the modal.
  const timeoutId = Timer.after(20, () => hideHints());
  openModal = {modal, escapeId, timeoutId};
}

function hideHints() {
  if (openModal) {
    openModal.modal.close();
    Key.off(openModal.escapeId);
    Timer.off(openModal.timeoutId);
    openModal = undefined;
  }
}

function toggleHints() {
  if (openModal) {
    hideHints();
  } else {
    showHints();
  }
}

exports.hints = {
  registerHint,
  toggleHints,
};

})(globalThis);