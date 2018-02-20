"use strict";

const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
let tempFilePath = [ "tmp/testPackage.json" ];
let expectedFilePath = [ "test/expected/testPackage.json" ];
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

exports.testSetVersionCommand = {
	setUp: function( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks('tasks');
		// setup the file's to run the test on
		for( let i = 0; i < noOfFiles; i++ ){
			let fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( "\n [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[ i ] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[ i ] );
		}
		grunt.log.writeln( "setup is done!" );
		done();
	},
	testSetVersion: function ( test ) {
		test.expect( noOfFiles );

		const task = "set-version";
		runTask.option( "new-version", "1.1" );
		if( grunt.task.exists( task ) ) {
			runTask( task, {
				packageJSON: {
					options: {
						base: "someOrganisation",
						target: "pluginVersion",
						src: "tmp/testPackage.json",
					},
				}
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
			grunt.fail.warn( "The task " + task + "does not exist" );
		}

		function compareFiles( file1, file2 ){
			if( grunt.file.exists( file1 ) && grunt.file.exists( file2 ) ) {
				let actual = grunt.file.read( file1 );
				let expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'"  );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		for( let i = 0; i < noOfFiles; i++ ){
			compareFiles( tempFilePath[ i ], expectedFilePath[ i ] );
		}
		test.done();
	},
};