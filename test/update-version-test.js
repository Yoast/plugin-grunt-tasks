"use strict";

const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
let tempFilePath = [ "tmp/test.php", "tmp/README.MD" ];
let expectedFilePath = [ "test/expected/test.php", "test/expected/README.MD" ];
let noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.testUpdateVersionCommand = {
	setUp: function( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks( "tasks" );
		// setup the file's to run the test on
		for( let i = 0; i < noOfFiles; i++ ){
			let fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( " [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[ i ] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[ i ] );
		}
		grunt.log.writeln( "setup is done!" );
		done();
	},
	testUpdateVersion: function ( test ) {
		test.expect( noOfFiles );

		const task = "update-version";
		if( grunt.task.exists( task ) ) {

			runTask( "update-version:pluginFile", {
				pluginFile: {
					options: {
						version: "1.1",
						regEx: /(Version: )(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/,
						preVersionMatch: "$1",
						postVersionMatch: "$5",
					},
					src: "tmp/test.php",
				},
			},
				function ( err, task ) {
					if ( err ) {
						// The task did encounter an error
						grunt.fail.warn( task + " failed: " + err );
					}
				}
			);
			runTask( "update-version:readme", {
					readme: {
						options: {
							version: "1.1",
							regEx: /(Stable tag: )(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/,
							preVersionMatch: "$1",
							postVersionMatch: "$5",
						},
						src: "tmp/README.md",
					},
				},
				function ( err, task ) {
					if ( err ) {
						// The task did encounter an error
						grunt.fail.warn( task + " failed: " + err );
					}
				}
			);
		}
		else {
			grunt.fail.fatal( "The task " + task + "does not exist" );
		}

		function compareFiles( file1, file2 ){
			if( grunt.file.exists( file1 ) && grunt.file.exists( file2 ) ) {
				let actual = grunt.file.read( file1 );
				let expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}
		// Wait for the runTask statements to complete
		setTimeout( runTest, 1 );
		function runTest() {
			for ( let i = 0; i < noOfFiles; i++ ) {
				compareFiles( tempFilePath[i], expectedFilePath[i] );
			}
			test.done();
		}
	},
};
