/**
 * Escapes a string so it can be use as a regual expression.
 * @param {Object} string The response object.
 * @returns {Object} string
 */
function escapeRegExp( string ) {
	// $& means the whole matched string
	console.log( "input:" + string );
	var result = "";
	if ( string ) {
		result =  string.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" );
	}
	return result;
}

module.exports = escapeRegExp;
