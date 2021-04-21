/**
 * A unit test for 'set-version.js'.
 *
 * Copies the fixtures to the temp folder and runs set-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */


const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
const tempFilePath = [ "tmp/readme3.txt" ];
const expectedFilePath = [ "test/expected/readme3.txt" ];
const srcWikimdfile = "test/fixtures/wordpress-seo-15.9.md";
const dstWikimdfile = "./.tmp/wordpress-seo-15.9.md";
const noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let ChanceLogTask;

exports.testChangeLog3Command = {
	/**
	 * @param {function} done Function to execute when done.
	 * @returns {void}
	 */
	setUp: function( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks( "tasks" );
		// Setup the file's to run the test on
		for ( let i = 0; i < noOfFiles; i++ ) {
			const fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( "\n [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[ i ] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[ i ] );
		}
		grunt.file.mkdir( "./tmp" );
		grunt.file.copy( srcWikimdfile, dstWikimdfile );
		grunt.log.writeln( "setup is done!" );

		runTask.option( "plugin-version", "15.9" );
		ChanceLogTask = runTask.task( "update-changelog-with-latest-pr-texts", {
			"wordpress-seo": {
				options: {
					// Free header:
					// = 15.7 =
					// Release Date: January 26th, 2021
					readmeFile: "tmp/readme3.txt",
					releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
					matchChangelogHeader: /[=]= Changelog ==\n\n/ig,
					newHeadertemplate: "== Changelog ==\n\n" + "= " + "VERSIONNUMBER" + " =\nRelease Date: " + "DATESTRING"  + "\n\n",
					matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|= \\d+[\.\\d]+ =|= Earlier versions =))",
					matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
					matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
					replaceCleanedChangelog: "= Earlier versions =",
					pluginSlug: "wordpress-seo",
					defaultChangelogEntries: "",
					useANewLineAfterHeader: true,
					useEditDistanceCompare: true,
					commitChangelog: false,
				},
			},
		} );

		ChanceLogTask.run( function() {
			done();
		} );
	},
	/**
	 * @param {object} test Test object
	 * @returns {void}
	 */
	testChanceLogtask: function( test ) {
		/**
		 * Runs the test assertions to verify the 2 files are identical if the files given as parameters exist.
		 *
		 * @param {string} file1 The file path to compare to file2.
		 * @param {string} file2 The file path to compare to file1.
		 *
		 * @returns {void}.
		 */
		function compareFiles( file1, file2 ) {
			if ( grunt.file.exists( file1 ) && grunt.file.exists( file2 ) ) {
				const actual = grunt.file.read( file1 );
				const expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		const task = "update-changelog-with-latest-pr-texts";
		if ( grunt.task.exists( task ) ) {
			for ( let i = 0; i < noOfFiles; i++ ) {
				compareFiles( tempFilePath[ i ], expectedFilePath[ i ] );
			}
		} else {
			grunt.fail.warn( "The task " + task + "does not exist" );
		}
		test.done();
	},
};
