((exports) => {

let openModal;

function show(name, options) {
  if (openModal && openModal.name == name) {
    return;
  }

  // Hide any other open modal
  hide();
  
  const mergedOptions = Object.assign({
    duration: 60  // Set a long timeout to ensure the modal goes way eventaully
  }, options);

  const modal = modalScreen(mergedOptions);
  const escapeId = Key.on('escape', [], () => hide(name));
  // Add a timer in addition to the modal duration in order to clean up the
  // escape key registration in addition to hiding the modal.
  const timeoutId = Timer.after(20, () => hide(name));
  openModal = {name, modal, escapeId, timeoutId};
}

/**
 * 
 * @param {*} name The ID o
 */
function hide(name = undefined) {
  // Hide the openModal with a matching name or any modal if name is
  // unspecified
  if (openModal && (name == openModal.name || !name)) {
    openModal.modal.close();
    Key.off(openModal.escapeId);
    Timer.off(openModal.timeoutId);
    openModal = undefined;
  }
}

function toggle(name, options) {
  if (openModal && openModal.name == name) {
    hide(name);
  } else {
    show(name, options);
  }
}

exports.dismissableModal = {
  toggle,
};

})(globalThis);