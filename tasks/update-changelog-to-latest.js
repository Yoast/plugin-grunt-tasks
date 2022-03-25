/* eslint-disable max-len */
/* eslint-disable complexity */
const parseVersion = require( "../lib/parse-version" );
const _isEmpty = require( "lodash/isEmpty" );
const escapeRegExp = require( "../lib/escape-regexp" );


/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"update-changelog-to-latest",
		"updates the changelog file with data retreived from changelog generator (n8n)",
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				commitChangelog: false,
				useANewLineAfterHeader: true,
				defaultChangelogEntries: "",
				daysToAddForNextRelease: 14,
				useTodayasReleaseDate: false,
				changelogToInject: "",
			} );
			const done = this.async();

			// Grab te XX.X only from XX.X-RCY/XX.X-betaY
			const fullVersion = grunt.option( "plugin-version" );
			const newVersion = fullVersion.split( "-" )[ 0 ];
			if ( fullVersion.match( "beta" ) ) {
				options.daysToAddForNextRelease = options.daysToAddForNextRelease + 7;
			}
			let useTodayasReleaseDate = false;
			const versionNumber = parseVersion( newVersion );
			const suffixes = {
				one: "st",
				two: "nd",
				few: "rd",
				other: "th",
			};
			const pr = new Intl.PluralRules( "en-US", {
				type: "ordinal",
			} );
			/**
	 		* Append suffix to number.
	 		* @param {int} number changelogs to be parsed.
	 		* @returns {string} number with suffix appended.
	 		*/
			const format = ( number ) => `${number}${suffixes[ pr.select( number ) ]}`;

			let changelog = grunt.file.read( options.readmeFile );
			const allReleasesInChangelog = changelog.match( options.releaseInChangelog );
			const changelogVersions = allReleasesInChangelog.map(
				element => parseVersion( element.slice( 2, element.length - 2 ) )
			);
			// Check if the current version already exists in the changelog.
			const containsCurrentVersion = ! _isEmpty(
				changelogVersions.filter( version => {
					return (
						versionNumber.major === version.major &&
						versionNumber.minor === version.minor &&
						versionNumber.patch === version.patch
					);
				} )
			);

			if ( versionNumber.patch !== 0 || options.useTodayasReleaseDate ) {
				useTodayasReleaseDate = true;
			}

			// Only if the current version is not in the changelog yet, and is not a patch, we remove old changelog entries.
			if ( ! containsCurrentVersion && versionNumber.patch === 0 ) {
				let cleanedChangelog = changelog;
				const highestMajor = Math.max( ...changelogVersions.map( version => version.major ) );
				const lowestMajor = Math.min( ...changelogVersions.map( version => version.major ) );

				if ( highestMajor === lowestMajor ) {
					// If there are only multiple minor versions of the same major version, remove all entries from the oldest minor version.
					const lowestMinor = Math.min( ...changelogVersions.map( version => version.minor ) );
					const lowestVersion = `${lowestMajor}.${lowestMinor}`;
					cleanedChangelog = changelog.replace(
						new RegExp( options.matchCleanedChangelog.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( lowestVersion ) ) ),
						options.replaceCleanedChangelog
					);
				} else {
					// If there are multiple major versions in the changelog, remove all entries from the oldest major version.
					cleanedChangelog = changelog.replace(
						new RegExp( options.matchCleanedChangelog.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( lowestMajor ) ) ),
						options.replaceCleanedChangelog
					);
				}

				// If something has changed, persist this.
				if ( cleanedChangelog !== changelog ) {
					changelog = cleanedChangelog;

					// Update the grunt reference to the changelog.
					grunt.option( "changelog", changelog );

					// Write changes to the file.
					grunt.file.write( options.readmeFile, changelog );
				}
			}

			if ( grunt.file.exists( options.changelogToInject ) ) {
				grunt.log.writeln( "input file not found" );
				done();
			}

			// Add n8n log here!!!
			const n8nChangelog = grunt.file.read( options.changelogToInject );

			// If the current version is already in the changelog.
			if ( containsCurrentVersion ) {
				// Get the changelog entries for the current version from the readme.
				const changelogVersionNumber = versionNumber.major + "." + versionNumber.minor;
				// eslint-disable-next-line max-len
				const matchCorrectHeader =  options.matchCorrectHeader.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( changelogVersionNumber ) );
				const matchCorrectLines = options.matchCorrectLines.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( changelogVersionNumber ) );
				const currentChangelogEntriesMatches = changelog.match( new RegExp( matchCorrectLines ) );

				var currentChangelogEntries = "";
				if ( currentChangelogEntriesMatches ) {
					currentChangelogEntries = `${currentChangelogEntriesMatches[ 0 ]}`;
				}

				// Get the header from the changelog entries

				const currentChangelogEntriesHeaderMatches = changelog.match( new RegExp( matchCorrectHeader,  ) );
				var currentChangelogEntriesHeader = "";
				if ( currentChangelogEntriesHeaderMatches ) {
					currentChangelogEntriesHeader = `${currentChangelogEntriesHeaderMatches[ 0 ]}`;
				}

				currentChangelogEntries = currentChangelogEntries.replace( new RegExp( escapeRegExp( currentChangelogEntriesHeader ) ), "" );

				// Put all parts togethor agian
				// eslint-disable-next-line max-len
				const mergedReadme = changelog.replace( new RegExp( escapeRegExp( currentChangelogEntriesHeader + currentChangelogEntries ) ),  currentChangelogEntriesHeader  + n8nChangelog );

				// Write changes to the file.
				grunt.file.write( options.readmeFile, mergedReadme );
				done();
			} else {
				// If the current version is not in the changelog, build a new one from input file.
				let changelogVersionNumber = versionNumber.major + "." + versionNumber.minor;

				// Only add the patch number if we're actually doing a patch.
				if ( versionNumber.patch !== 0 ) {
					changelogVersionNumber += "." + versionNumber.patch;
				}
				var d = new Date();
				// Guess release date, probbaly next tuesday in two weeks time
				// Options for better logic, get latest tag date
				// Is date tag within 14 day next release 21 days
				// If not next release 42 days
				// Or login to jira get it there...


				if ( useTodayasReleaseDate ) {
					d.setDate(  d.getDate() );
				} else {
					d.setDate( d.getDate() + ( 2 + options.daysToAddForNextRelease - d.getDay() ) );
				}
				const ye = new Intl.DateTimeFormat( "en", { year: "numeric" } ).format( d );
				const mo = new Intl.DateTimeFormat( "en", { month: "long" } ).format( d );
				const da = new Intl.DateTimeFormat( "en", { day: "numeric" } ).format( d );
				const datestring = `${mo} ${format( da )}, ${ye}`;
				// eslint-disable-next-line max-len

				var newChangelog = options.newHeadertemplate.replace( new RegExp( "VERSIONNUMBER" ), changelogVersionNumber );
				newChangelog = newChangelog.replace( new RegExp( "DATESTRING" ), datestring ) + n8nChangelog;

				// Add the changelog, behind the 'matched' header.
				changelog = changelog.replace( options.matchChangelogHeader, newChangelog );
				// Write changes to the file.
				grunt.file.write( options.readmeFile, changelog );

				done();
			}

			if ( options.commitChangelog ) {
				// Stage the changed readme.txt.
				grunt.config( "gitadd.addChangelog.files", { src: [ options.readmeFile ] } );
				grunt.task.run( "gitadd:addChangelog" );

				// Check if there is something to commit with `git status` first.
				grunt.config( "gitstatus.checkChangelog.options.callback", function( changes ) {
					// First character of the code checks the status in the index.
					// eslint-disable-next-line max-len
					const hasStagedChangelog = changes.some( change => change.code[ 0 ] !== " " && change.file === options.readmeFile.split( "/" )[ options.readmeFile.split( "/" ).length - 1 ] );

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
