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
				defaultChangelogEntries: "",
				changelogMd: "",
				addthistochangelogMd: "tmp/yoast--schema-blocks.md",
			} );
			// Test if there is input we need to add
			if ( ! grunt.file.exists( options.addthistochangelogMd ) ) {
				return;
			}
			// Setup log builder for packages format input/output
			// eslint-disable-next-line max-len
			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug, true );
			const changelog = grunt.file.read( options.changelogMd );

			// Check if the ## Future Release header already exists
			// eslint-disable-next-line no-control-regex
			const currentChangelogEntriesMatches = changelog.match( new RegExp( "\n## Future Release\n(.|\n)*?(?=\n## )" ) );
			const currentChangelogSection = currentChangelogEntriesMatches ? currentChangelogEntriesMatches[ 0 ] : "";
			const extralines =  grunt.file.read( "tmp/yoast--schema-blocks.md" );


			// eslint-disable-next-line no-negated-condition
			if ( currentChangelogSection !== "" ) {
				// Add "existing items" to changelog
				changelogBuilder.parseChancelogLines( currentChangelogSection );
				// Add "new items" to changelog
				changelogBuilder.parseYoastCliGeneratedChangelog( extralines );
				// eslint-disable-next-line max-len
				const mergedReadme = changelog.replace( new RegExp( escapeRegExp(  currentChangelogSection ) ), "\n## Future Release\n" + changelogBuilder.packageChangelog );
				grunt.file.write( options.changelogMd, mergedReadme );
			} else {
				// Add "new items" to changelog
				changelogBuilder.parseYoastCliGeneratedChangelog( extralines );
				// eslint-disable-next-line no-control-regex
				const ChangelogEntriesMatches = changelog.match( new RegExp( "\n##(.|\n)*?(?=\n## )" ) );
				const ChangelogSection = ChangelogEntriesMatches ? ChangelogEntriesMatches[ 0 ] : "";
				// eslint-disable-next-line max-len
				const mergedReadme = changelog.replace( new RegExp( escapeRegExp(  ChangelogSection ) ), "\n## Future Release\n" + changelogBuilder.packageChangelog + ChangelogSection );
				grunt.file.write( options.changelogMd, mergedReadme );
			}

			if ( options.commitChangelog ) {
				// Stage the changed readme.txt.
				grunt.config( "gitadd.addChangelog.files", { src: [ options.changelogMd ] } );
				grunt.task.run( "gitadd:addChangelog" );

				// Check if there is something to commit with `git status` first.
				grunt.config( "gitstatus.checkChangelog.options.callback", function( changes ) {
					// First character of the code checks the status in the index.
					// eslint-disable-next-line max-len
					const hasStagedChangelog = changes.some( change => change.code[ 0 ] !== " " && change.file === options.changelogMd.split( "/" )[ options.changelogMd.split( "/" ).length - 1 ] );

					if ( hasStagedChangelog ) {
						// Commit the changed readme.txt.
						grunt.config( "gitcommit.commitChangelog.options.message", "Add changelog" );
						grunt.task.run( "gitcommit:commitChangelog" );
					} else {
						grunt.log.writeln( "Changelog is unchanged. Nothing to commit." );
					}
				} );

				grunt.task.run( "gitstatus:checkChangelog" );
			}
		}
	);
};
