/**
 * A unit test for 'update-version.js'.
 *
 * Copies the fixtures to the temp folder and runs update-version.
 * After that the (fixture) files in the temp folder get compared with the expected folder.
 */


const grunt = require( "grunt" );
const runTask = require( "grunt-run-task" );
const tempFilePath = [ "tmp/test.php", "tmp/README.MD" ];
const expectedFilePath = [ "test/expected/test.php", "test/expected/README.MD" ];
const noOfFiles = Math.min( tempFilePath.length, expectedFilePath.length );
let pluginFileUpdateTask;

/**
 * Runs the test
 *
 * @type {{testUpdateVersion: testUpdateVersion, setUp: setUp}}
 *
 * @returns {void}
 */
exports.testUpdateVersionCommand = {
	/**
	 * Set up our test
	 *
	 * @param {function} done Function to run when done.
	 *
	 * @returns {void}
	 */
	setUp: function( done ) {
		// Load the tasks so they can be run
		runTask.loadTasks( "tasks" );
		// Setup the file's to run the test on
		for ( let i = 0; i < noOfFiles; i++ ) {
			const fixturePath = expectedFilePath[ i ].replace( "expected", "fixtures" );
			grunt.log.writeln( " [" + ( i + 1 ) + "/" + noOfFiles + "] Copying '" + fixturePath + "' to '" + tempFilePath[ i ] + "'" );
			grunt.file.copy( fixturePath, tempFilePath[ i ] );
		}
		grunt.log.writeln( "setup is done!" );

		pluginFileUpdateTask = runTask.task( "update-version", {
			pluginFile: {
				options: {
					version: "1.1",
					regEx: /(Stable tag: )(\d+(\.\d+){0,3})([^\n^.\d]?.*?)(\n)/,
					preVersionMatch: "$1",
					postVersionMatch: "$5",
				},
				src: tempFilePath[ 1 ],
			},
		} );

		pluginFileUpdateTask.run( function() {
			done();
		} );
	},
	/**
	 * Runs the test.
	 * @param {object} test The test object.
	 * @returns {void}
	 */
	testUpdateVersion: function( test ) {
		/**
		 * Runs the test assertions to verify the 2 files are identical if the files given as parameters exist.
		 *
		 * @param {string} file1 The file path to compare to file2.
		 * @param {string} file2 The file path to compare to file1.
		 *
		 * @returns {void}.
		 */
		function runTest( file1, file2 ) {
			if ( grunt.file.exists( file1 ) && grunt.file.exists( file2 ) ) {
				const actual = grunt.file.read( file1 );
				const expected = grunt.file.read( file2 );
				test.deepEqual( actual, expected, "Compare the file '" + file1 + "' with '" + file2 + "'" );
				return;
			}
			grunt.fail.warn( "Expected files not found" );
		}

		const task = "update-version";
		if ( grunt.task.exists( task ) ) {
			runTest( tempFilePath[ 1 ], expectedFilePath[ 1 ] );
			test.done();
		} else {
			grunt.fail.fatal( "The task " + task + "does not exist" );
		}
	},
};
