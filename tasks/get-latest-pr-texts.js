/* eslint-disable max-len */
/* eslint-disable no-console */
/**
 * A task to create a file with the lates PR texts using wiki yoast-cli
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"get-latest-pr-texts",
		"A task to create a file with the lates PR texts using wiki yoast-cli",
		function() {
			const options = this.options( {
				pluginSlug: "",
			} );
			const done = this.async();

			// Grabb te XX.X only from XX.X-RCY/XX.X-betaY
			const fullVersion = grunt.option( "plugin-version" );
			const newVersion = fullVersion.split( "-" )[ 0 ];
			grunt.file.write( "/tmp/.env", `GITHUB_API_TOKEN=${process.env.GITHUB_ACCESS_TOKEN}` );

			grunt.config( "shell.get-changelog-lines-with-wiki-yoast-cli.command", ( [
				"mkdir -p ./.tmp",
				"cd /tmp/",
				"rm -rf Wiki",
				"git clone git@github.com:Yoast/Wiki.git ",
				"cd Wiki/yoast-cli",
				"mkdir -p ./changelogs/changelog-Yoast",
				"touch ./changelogs/changelog-Yoast/" + options.pluginSlug + "-" + newVersion + ".md",
				"composer install",
				"mv /tmp/.env .",
				"pwd" ].join( " && " ) ) );
			grunt.config( "shell.get-changelog-lines-with-wiki-yoast-cli.options.failOnError", true );
			grunt.task.run( "shell:get-changelog-lines-with-wiki-yoast-cli" );

			// Use node clue script do make
			grunt.config( "shell.makeChangelogFile.command", "node node_modules/@yoast/grunt-plugin-tasks/lib/get-changelog-using-wiki.js " + options.pluginSlug + " " + newVersion );
			grunt.task.run( "shell:makeChangelogFile" );
			// Move the created file
			grunt.config( "shell.move-changelog.command", "mv /tmp/Wiki/yoast-cli/changelogs/changelog-Yoast/" + options.pluginSlug + "-" + newVersion + ".md .tmp/" );
			grunt.task.run( "shell:move-changelog" );
			// Clean up here.
			grunt.config( "clean", {
				wiki: [ "/tmp/test" ],
				options: {
					force: true,
				},
			} );
			grunt.task.run( "clean:wiki" );
			done();
		}
	);
};
