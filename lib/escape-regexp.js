/**
 * Escapes a string so it can be use as a regual expression.
 * @param {Object} string The response object.
 * @returns {Object} string
 */
function escapeRegExp( myinput ) {
	// $& means the whole matched string
	console.log( "input:" + myinput );
	var result = "";
	if ( myinput ) {
		result =  myinput.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
	}
	return result;
}

module.exports = escapeRegExp;
