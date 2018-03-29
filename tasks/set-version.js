/**
 * A task that sets the version number in project files in accordance with the build config.
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"set-version",
		"Sets a new version number.",
		function() {
			let options = this.options(
				{
					base: "The JSON file base object for the target to be in.",
					target: "The child of the base object to replace the version string in.",
				}
			);

			let version = grunt.option( "new-version" ) || "";
			if ( version.toString().trim().length === 0 ) {
				grunt.fail.fatal( "Missing --new-version argument" );
			}

			// Foreach file in this.files
			let numberOfFiles = this.files.length;
			for ( let i = 0; i < numberOfFiles; i++ ) {
				// Foreach src in file
				let numberOfSrcFiles = this.files[ i ].src.length;
				for ( let j = 0; j < numberOfSrcFiles; j++ ) {
					let path = this.files[ i ].src[ j ];
					let contents = grunt.file.readJSON( path );
					contents[ options.base ][ options.target ] = version.toString();
					grunt.file.write( path, JSON.stringify( contents, null, "  " ) + "\n" );
				}
			}
		}
	);
};
