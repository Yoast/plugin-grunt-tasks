/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */

//const { spawn } = require( "child_process" );

module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"get-changelog",
		"",
		function() {
			let options = this.options( { 
				pluginSlug: "",
			} );
			const done = this.async();

			const newVersion = grunt.option( "plugin-version" );
			grunt.file.write( "/tmp/.env", `GITHUB_API_TOKEN=${process.env.GITHUB_ACCESS_TOKEN}` );

			console.log(newVersion)
			grunt.config( "shell.get-changelog-lines-with-wiki-yoast-cli.command", ([
					"mkdir -p ./.tmp",
					"cd /tmp/",
					"rm -rf Wiki",
					"git clone git@github.com:Yoast/Wiki.git ",
					"cd Wiki/yoast-cli",
					"mkdir -p ./changelogs/changelog-Yoast",
					"touch ./changelogs/changelog-Yoast/" + options.pluginSlug + "-" + newVersion+ ".md",
					"composer install",
					"mv /tmp/.env .",
					"pwd"].join(' && ')));
			grunt.config( "shell.get-changelog-lines-with-wiki-yoast-cli.options.failOnError", true);
			grunt.task.run( "shell:get-changelog-lines-with-wiki-yoast-cli");
		
			//use node clue script do make
			grunt.config( "shell.makeChangelogFile.command", "node node_modules/@yoast/grunt-plugin-tasks/lib/get-changelog-using-wiki.js " + options.pluginSlug + " " + newVersion);
			grunt.task.run( "shell:makeChangelogFile" );
			// move the created file
			grunt.config( "shell.move-changelog.command", "mv /tmp/Wiki/yoast-cli/changelogs/changelog-Yoast/" + options.pluginSlug + "-" + newVersion + ".md .tmp/" );
			grunt.task.run( "shell:move-changelog" );
			//clean up here.
			grunt.config( "clean", { 
				wiki:["/tmp/test"] , 
				options: { 
					force: true 
				}
			});
			grunt.task.run("clean:wiki")
			done();
			
		}
	);
};