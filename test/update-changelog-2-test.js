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
const tempFilePath = [ "tmp/changelog.md" ];
const expectedFilePath = [ "test/expected/changelog.md" ];
const srcWikimdfile = "test/fixtures/wordpress-seo-premium-16.0.md";
const dstWikimdfile = "./.tmp/wordpress-seo-premium-16.0.md";
const noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let ChanceLogTask;

exports.testChangeLog2Command = {
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

		runTask.option( "plugin-version", "16.0" );
		ChanceLogTask = runTask.task( "update-changelog-with-latest-pr-texts", {
			"wordpress-seo-premium": {
				options: {
					// Premium header:
					// ### 15.9: February 23rd, 2021
					readmeFile: "tmp/changelog.md",
					releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
					matchChangelogHeader: /^/ig,
					newHeadertemplate: "### " + "VERSIONNUMBER" + ": " + "DATESTRING"  + "\n",
					matchCorrectLines: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(### \\d+[\.\\d]+\: |$))",
					matchCorrectHeader: "### " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|### \\d+[\.\\d]+\: |$))",
					matchCleanedChangelog: "### " + "VERSIONNUMBER" + "(.|\\n)*$",
					replaceCleanedChangelog: "",
					pluginSlug: "wordpress-seo-premium",
					// eslint-disable-next-line max-len
					defaultChangelogEntries: "Other:\n* Includes every change in Yoast SEO core " + "VERSIONNUMBER" + ". See the [core changelog](https://wordpress.org/plugins/wordpress-seo/#developers).\n",
					useANewLineAfterHeader: false,
					useEditDistanceCompare: true,
					commitChangelog: false,
					addTheseExtraFiles: [ "./tmp/wordpress-seo-premium.md" ],
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
