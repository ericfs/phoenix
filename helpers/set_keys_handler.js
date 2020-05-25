
/* SET KEYS HANDLER */

function setKeysHandler ( handler, datas, skipRepetitions = true, one = false ) {

  datas.forEach ( data => {

    const [key, modifier, handlerArgs, description] = data;

    setKeyHandler ( key, modifier, handler, handlerArgs || [], description, skipRepetitions, one );

  });

}
