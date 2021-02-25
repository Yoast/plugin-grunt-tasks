/**
 * escapes a string so it can be use as a regual expression.
 *
 * @param {Object} string The response object.
 * 
 * @returns {Object} string 
 */
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = escapeRegExp;