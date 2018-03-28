/**
 * A unit test for 'set-version.js'.
 *
 * Copies the fixtures to the temp folder and runs set-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */

"use strict";

const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
let tempFilePath = [ "tmp/testPackage.json" ];
let expectedFilePath = [ "test/expected/testPackage.json" ];
let noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let setVersionTask;

exports.testSetVersionCommand = {
	setUp: function ( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks( 'tasks' );

		// setup the file's to run the test on
		for ( let i = 0; i < noOfFiles; i++ ) {
			let fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( "\n [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[ i ] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[i] );
		}
		grunt.log.writeln( "setup is done!" );

		runTask.option( "new-version", "1.1" );
		setVersionTask = runTask.task( "set-version", {
			packageJSON: {
				options: {
					base: "someOrganisation",
					target: "pluginVersion"
				},
				src: "tmp/testPackage.json"
			}
		});

		setVersionTask.run( function () {
			done();
		});
	},
	testSetVersion: function ( test ) {
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
				let actual = grunt.file.read( file1 );
				let expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		const task = "set-version";
		if ( grunt.task.exists( task ) ) {
			for ( let i = 0; i < noOfFiles; i++ ) {
				compareFiles( tempFilePath[ i ], expectedFilePath[ i ] );
			}
		}
		else {
			grunt.fail.warn( "The task " + task + "does not exist" );
		}
		test.done();
	}
};

