module.exports = function( grunt ) {
	// Project configuration.
	grunt.initConfig( {
		eslint: {
			options: {
				configFile: ".eslintrc",
			},
			target: [ "tasks/**/*.js", "test/**/*.js", "Gruntfile.js" ],
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: [ "tmp" , ".tmp" ],
		},

		// Unit tests.
		nodeunit: {
			tests: [ "test/*test.js" ],
		},

	} );

	// Actually load this plugin's task(s).
	grunt.loadTasks( "tasks" );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( "grunt-eslint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

	// Whenever the "test" task is run, first clean the "tmp" dir, then run the test.
	grunt.registerTask( "test", [ "clean", "nodeunit" ] );

	// By default, lint and run all tests.
	grunt.registerTask( "default", [ "eslint", "test" ] );
};
