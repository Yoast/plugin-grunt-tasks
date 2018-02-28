/**
 * A task that updates version numbers in project files in accordance with
 * build config.
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"update-version",
		"Updates the version tags in all the right places.",
		function() {
			let options = this.options(
				{
					version: "version",
					regEx: "regEx",
					preVersionMatch: "preVersionMatch",
					postVersionMatch: "postVersionMatch"
				}
			);

			// foreach file in this.files
			let noOfFiles = this.files.length;
			for (let i = 0; i < noOfFiles; i++ ){
				// foreach src in file
				let numberOfSrcFiles = this.files[ i ].src.length;
				for ( let p = 0; p < numberOfSrcFiles; p++ ){
					let path = this.files[ i ].src[ p ];
					let contents = grunt.file.read( path ).replace(
						options.regEx,
						options.preVersionMatch + options.version + options.postVersionMatch
					);
					grunt.file.write( path, contents );
				}
			}
		}
	);
};