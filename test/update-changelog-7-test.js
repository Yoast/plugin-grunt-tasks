/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-concat */
/**
 * A unit test for 'set-version.js'.
 *
 * Copies the fixtures to the temp folder and runs set-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */


const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
const tempFilePath = [ "tmp/readme7.txt" ];
const expectedFilePath = [ "test/expected/readme7.txt" ];
const srcWikimdfile = "test/fixtures/n8nchangelog1.txt";
const dstWikimdfile = "./.tmp/n8nchangelog1.txt";
const noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let ChanceLogTask;

exports.testChangeLog9Command = {
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

		runTask.option( "plugin-version", "19.12" );
		ChanceLogTask = runTask.task( "update-changelog-to-latest", {
			"wordpress-seo": {
				options: {
					// Free header:
					// = 15.7 =
					// Release Date: January 26th, 2021
					readmeFile: "tmp/readme7.txt",
					changelogToInject: "./.tmp/n8nchangelog1.txt",
					releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
					matchChangelogHeader: /[=]= Changelog ==\n\n/ig,
					newHeadertemplate: "== Changelog ==\n\n" + "= " + "VERSIONNUMBER" + " =\n\nRelease date: " + "DATESTRING"  + "\n",
					matchCorrectHeader: "= " + "VERSIONNUMBER" + " =(.|\\n)*?\\n(?=(\\n#### \\w\+?\\n|= \\d+[\.\\d]+|= Earlier versions =))",
					matchCorrectLines: "= " + "VERSIONNUMBER" + " =(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
					matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
					replaceCleanedChangelog: "= Earlier versions =",
					pluginSlug: "wordpress-seo",
					defaultChangelogEntries: "",
					useANewLineAfterHeader: true,
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

		const task = "update-changelog-to-latest";
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
