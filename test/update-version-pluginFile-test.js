/**
 * A unit test for 'update-version.js'.
 *
 * Copies the fixtures to the temp folder and runs update-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */

"use strict";

const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
let tempFilePath = [ "tmp/test.php" ];
let expectedFilePath = [ "test/expected/test.php" ];
let noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let pluginFileUpdateTask;

exports.testUpdateVersionCommand = {
	setUp: function ( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks( "tasks" );

		// setup the file's to run the test on
		for (let i = 0; i < noOfFiles; i++) {
			let fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( " [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[i] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[ i ] );
		}
		grunt.log.writeln( "setup is done!" );

		pluginFileUpdateTask = runTask.task( "update-version", {
			pluginFile: {
				options: {
					version: "1.1",
					regEx: /(Version: )(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/,
					preVersionMatch: "$1",
					postVersionMatch: "$5"
				},
				src: tempFilePath[ 0 ]
			}
		});

		pluginFileUpdateTask.run( function() {
			done();
		});
	},
	testUpdateVersion: function ( test ) {
		/**
		 * Runs the test assertions to verify the 2 files are identical if the files given as parameters exist.
		 *
		 * @param {string} file1 The file path to compare to file2
		 * @param {string} file2 The file path to compare to file1
		 *
		 * @returns {void}
		 */
		function runTest ( file1, file2 ) {
			if ( grunt.file.exists( file1 ) && grunt.file.exists( file2 ) ) {
				let actual = grunt.file.read( file1 );
				let expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		const task = "update-version";
		if ( grunt.task.exists( task ) ) {
			runTest( tempFilePath[ 0 ], expectedFilePath[ 0 ] );
			test.done();
		}
		else {
			grunt.fail.fatal( "The task " + task + "does not exist" );
		}
	}
};
