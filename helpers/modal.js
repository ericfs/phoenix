
/* MODAL */

function modal ( options ) {

  const modal = Modal.build ({
    origin: options.origin,
    weight: _.isNumber(options.weight) ? options.weight : MODAL_WEIGHT,
    duration: _.isNumber(options.duration) ? options.duration : MODAL_DURATION,
    animationDuration: MODAL_ANIMATION_DURATION,
    appearance: MODAL_APPEARANCE,
    text: _.isString ( options.text ) ? options.text : '',
    icon: _.isObject ( options.icon ) ? options.icon : undefined
  })
  modal.show ();
  return modal;
}
