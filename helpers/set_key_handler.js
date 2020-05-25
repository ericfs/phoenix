
/* SET KEY HANDLER */

function setKeyHandler ( key, modifier, handler, handlerArgs = [], description = '', skipRepetitions = true, one = false ) {

  if (description) {
    hints.registerHint(key, modifier, description);
  }
  Key[one ? 'once' : 'on']( key, modifier, ( identifier, repeated ) => {

    if ( repeated && skipRepetitions ) return;

    handler ( ...handlerArgs );

  });

}
