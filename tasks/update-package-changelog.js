/* eslint-disable complexity */
// /* eslint-disable complexity */
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
const escapeRegExp = require( "../lib/escape-regexp" );
const ChangelogBuilder = require( "../lib/logbuilder" );

/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"update-package-changelog",
		"updates the changelog file with data retreived from yoast-cli.",
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				commitChangelog: false,
				useANewLineAfterHeader: false,
				addTheseChangeLogs: [ [ "tmp/CHANGELOG2.md", "tmp/yoast--schema-blocks.md" ] ],
			} );

			options.addTheseChangeLogs.forEach( element => {
				if ( element.length !== 2 ) {
					grunt.fail.fatal( "addTheseChangeLogs options not a array" + element );
				}
				const changelogMd = element[ 0 ];
				const addthistochangelogMd = element[ 1 ];

				// Test if there is input we need to add
				if ( ! grunt.file.exists( addthistochangelogMd ) ) {
					return;
				}
				// Setup log builder for packages format input/output
				// eslint-disable-next-line max-len
				const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug, true );
				const changelog = grunt.file.read( changelogMd );

				// Check if the ## Future Release header already exists
				// eslint-disable-next-line no-control-regex
				const currentChangelogEntriesMatches = changelog.match( new RegExp( "\n## Future Release\n(.|\n)*?(?=\n## )" ) );
				const currentChangelogSection = currentChangelogEntriesMatches ? currentChangelogEntriesMatches[ 0 ] : "";
				const extralines =  grunt.file.read( addthistochangelogMd );


				// eslint-disable-next-line no-negated-condition
				if ( currentChangelogSection !== "" ) {
				// Add "existing items" to changelog
					changelogBuilder.parseChancelogLines( currentChangelogSection );
					// Add "new items" to changelog
					changelogBuilder.parseYoastCliGeneratedChangelog( extralines );
					// eslint-disable-next-line max-len
					const mergedReadme = changelog.replace( new RegExp( escapeRegExp(  currentChangelogSection ) ), "\n## Future Release\n" + changelogBuilder.packageChangelog );
					grunt.file.write( changelogMd, mergedReadme );
				} else {
				// Add "new items" to changelog
					changelogBuilder.parseYoastCliGeneratedChangelog( extralines );
					// eslint-disable-next-line no-control-regex
					const ChangelogEntriesMatches = changelog.match( new RegExp( "\n##(.|\n)*?(?=(\n## )|$)" ) );
					const ChangelogSection = ChangelogEntriesMatches ? ChangelogEntriesMatches[ 0 ] : "";
					// eslint-disable-next-line max-len
					const mergedReadme = changelog.replace( new RegExp( escapeRegExp(  ChangelogSection ) ), "\n## Future Release\n" + changelogBuilder.packageChangelog + ChangelogSection );
					grunt.file.write( changelogMd, mergedReadme );
				}

				if ( options.commitChangelog ) {
					// Stage the changed readme.txt.
					// Use this to make a task names per package
					const pg = changelogMd.split( "/" )[ 1 ];

					grunt.config( "gitadd.addChangelog" + pg + ".files", { src: [ changelogMd ] } );
					grunt.task.run( "gitadd:addChangelog" + pg );

					// Check if there is something to commit with `git status` first.
					grunt.config( "gitstatus.checkChangelog" + pg + ".options.callback", function( changes ) {
						// First character of the code checks the status in the index.
						// eslint-disable-next-line max-len
						const hasStagedChangelog = changes.some( change => change.code[ 0 ] !== " " && change.file === changelogMd );
						if ( hasStagedChangelog ) {
							// Commit the changed readme.txt.
							grunt.config( "gitcommit.commitChangelog" + pg + ".options.message", "Add changelog " + changelogMd );
							grunt.task.run( "gitcommit:commitChangelog" + pg );
						} else {
							grunt.log.writeln( "Changelog is unchanged. Nothing to commit." + changelogMd );
						}
					} );

					grunt.task.run( "gitstatus:checkChangelog" + pg );
				}
			} );
		}
	);
};
