/**
 * A task that updates version numbers in json files in accordance with the build config.
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"update-version",
		"Updates the version tags in all the right places.",
		function() {
			const options = this.options(
				{
					version: "version",
					regEx: "regEx",
					preVersionMatch: "preVersionMatch",
					postVersionMatch: "postVersionMatch",
				}
			);

			this.files.forEach( ( file ) => {
				// If options.regEx is a string, create a regex from it. If it's already a regex, use it as is.
				const regex = ( typeof options.regEx === "string" ) ? new RegExp( options.regEx ) : options.regEx;

				file.src.forEach( ( path ) => {
					const contents = grunt.file.read( path ).replace(
						regex,
						options.preVersionMatch + options.version + options.postVersionMatch
					);
					grunt.file.write( path, contents );
				} );
			} );
		}
	);
};

