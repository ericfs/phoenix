((exports) => {

const hints = new Map();

function registerHint(key, modifiers, description) {
  const keys = {key, modifiers};
  hints.set(keys, description);
}

function keysToString(keys) {
  return keys.modifiers.join(' ') + ' ' + keys.key.toUpperCase();
}

function buildOptions() {
  let hintLines = [];
  hints.forEach((value, key) => {
    hintLines.push(keysToString(key) + ' : ' + value);
  });
  const text = hintLines.join('\n');
  return {
    text,
    weight: 12,
  };
}

function toggleHints() {
  dismissableModal.toggle('hints', buildOptions());
}

exports.hints = {
  registerHint,
  toggleHints,
};

})(globalThis);