/**
 * Escapes a string so it can be use as a regual expression.
 *
 * @param {string} string The response object.
 *
 * @returns {string} string
 */
function escapeRegExp( string ) {
	console.log( "escape" );
	if ( typeof string === "string" ) {
		return string.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" ); // $& means the whole matched string
	}
	console.log( "input" );
	console.log( string );
	console.log( "/imput" );
	return string;
}

module.exports = escapeRegExp;
