/**
 * Escapes a string so it can be use as a regual expression.
 * @param {Object} string The response object.
 * @returns {Object} string
 */
function escapeRegExp( string ) {
	// $& means the whole matched string
	return string.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" );
}

module.exports = escapeRegExp;
