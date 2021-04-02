/**
 * A unit test for 'set-version.js'.
 *
 * Copies the fixtures to the temp folder and runs set-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */


const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
const tempFilePath = [ "tmp/changelogqa.md" ];
const expectedFilePath = [ "test/expected/changelogqa.md" ];
const srcWikimdfile1 = "test/fixtures/qachangelog-16.1-RC1.md";
const dstWikimdfile1 = "./.tmp/qachangelog-16.1-RC1.md";
const srcWikimdfile2 = "test/fixtures/qachangelog-16.1-RC2.md";
const dstWikimdfile2 = "./.tmp/qachangelog-16.1-RC2.md";
const srcWikimdfile3 = "test/fixtures/qachangelog-16.1-RC3.md";
const dstWikimdfile3 = "./.tmp/qachangelog-16.1-RC3.md";
const srcWikimdfile4 = "test/fixtures/qachangelog-16.1-RC4.md";
const dstWikimdfile4 = "./.tmp/qachangelog-16.1-RC4.md";
const srcWikimdfile5 = "test/fixtures/wordpress-seo-premium-16.1.md";
const dstWikimdfile5 = "./.tmp/wordpress-seo-premium-16.1.md";
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
		grunt.file.copy( srcWikimdfile1, dstWikimdfile1 );
		grunt.file.copy( srcWikimdfile2, dstWikimdfile2 );
		grunt.file.copy( srcWikimdfile3, dstWikimdfile3 );
		grunt.file.copy( srcWikimdfile4, dstWikimdfile4 );
		grunt.file.copy( srcWikimdfile5, dstWikimdfile5 );
		grunt.log.writeln( "setup is done!" );

		runTask.option( "plugin-version", "16.1-RC5" );
		ChanceLogTask = runTask.task( "build-qa-changelog", {
			"wordpress-seo": {
				options: {
					outputFile: "tmp/changelogqa.md",
					pluginSlug: "wordpress-seo-premium",
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
				// Console.log(actual)
				const expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		const task = "build-qa-changelog";
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
