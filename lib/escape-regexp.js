/**
 * Escapes a string so it can be use as a regual expression.
 *
 * @param {string} string The response object.
 * @returns {string} string
 */
function escapeRegExp( string ) {
	if ( typeof string === "number" ) {
		string = string.toString();
	}
	if ( typeof string === "string" ) {
		return string.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" );
		// $& means the whole matched string
	}
	return string;
}

module.exports = escapeRegExp;
