/* eslint-disable no-useless-escape */
/* eslint-disable max-depth */
/* eslint-disable complexity */
const parseVersion = require( "../lib/parse-version" );
const _isEmpty = require( "lodash/isEmpty" );
const escapeRegExp = require( "../lib/escape-regexp" );

/**
 * Class for building unigue line items
 *
 *
 */
class Unique {
	/**
	 * Constructor
	 * @param {object} grunt grunt object
	 * @param {array} items array of initial items
	 * @returns {null} does not return
	 */
	constructor( grunt, items ) {
		this.items = [];
		this.grunt = grunt;
		if ( items ) {
			this.items = items;
		}
	}
	/**
	* Append items to the items
	* @param {array} newItems array of initial items
	* @returns {null} does not return
	*/
	append( newItems ) {
		if ( newItems ) {
			newItems.forEach( function( newItem ) {
				if ( ! this.items.includes( newItem ) ) {
					this.items.push( newItem );
				}
			}, this );
		}
	}
	/**
	* If called it will remove doubles using filter
	* @returns {null} does not return
	*/
	applyEditdistanceFilter() {
		var toBeRemoved = [];
		for ( var i = 0; i < this.items.length; i++ ) {
			var arrlen = this.items.length;
			for ( var j = i + 1; j < arrlen; j++ ) {
				if ( this.similarity( this.items[ i ], this.items[ j ] ) > 0.9 ) {
					toBeRemoved.push( j );
					this.grunt.verbose.writeln( "---------------" );
					this.grunt.verbose.writeln( `${j}: ${this.items[ j ]}` );
					this.grunt.verbose.writeln( `${i}: ${this.items[ i ]}` );
					this.grunt.verbose.writeln( `${this.similarity( this.items[ i ], this.items[ j ] )}` );
					this.grunt.verbose.writeln( "---------------" );
				}
			}
		}
		// Sort as we are removing index wize the biggest need to go first
		this.grunt.verbose.writeln( toBeRemoved );
		toBeRemoved.sort( function( a, b ) {
			return b - a;
		} );
		for ( var k = 0; k < toBeRemoved.length; k++ ) {
			this.items.splice( toBeRemoved[ k ], 1 );
			this.grunt.verbose.writeln( toBeRemoved[ k ] );
		}
	}
	// Should be private but this breaks on ubuntu for some strange reason
	/**
	* Calulates similarity in 2 strings
	* @param {string} s1 item 1
	* @param {string} s2 item 2
	* @returns {int} simularity in number
	*/
	similarity( s1, s2 ) {
		var longer = s1;
		var shorter = s2;
		if ( s1.length < s2.length ) {
		  longer = s2;
		  shorter = s1;
		}
		var longerLength = longer.length;
		if ( longerLength === 0 ) {
		  return 1.0;
		}
		return ( longerLength - this.editDistance( longer, shorter ) ) / parseFloat( longerLength );
	  }
	// Should be private but this breaks on ubuntu for some strange reason
	/**
	* Calulates cost in 2 strings
	* @param {string} s1 item 1
	* @param {string} s2 item 2
	* @returns {int} cast as number
	*/
	editDistance( s1, s2 ) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();

		var costs = [];
		for ( var i = 0; i <= s1.length; i++ ) {
			var lastValue = i;
			for ( var j = 0; j <= s2.length; j++ ) {
				if ( i === 0 ) {
					costs[ j ] = j;
				} else {
					if ( j > 0 ) {
						var newValue = costs[ j - 1 ];
						if ( s1.charAt( i - 1 ) !== s2.charAt( j - 1 ) ) {
							newValue = Math.min( Math.min( newValue, lastValue ),
								costs[ j ] ) + 1;
						}
						costs[ j - 1 ] = lastValue;
						lastValue = newValue;
					}
				}
		  }
		  if ( i > 0 ) {
				costs[ s2.length ] = lastValue;
		  }
		}
		return costs[ s2.length ];
	  }
}

/**
 * Class for building a merged changelog entry using multipe inputs
 *
 * @method parseChancelogLines
 * @param {Object} multiline string
 *
 * @method parseYoastCliGeneratedChangelog
 *
 *
 * @get cleanChangelog
 * @retruns {Object} multiline string
 *
 */
class ChangelogBuilder {
	/**
	* Constructor
	* @param {object} grunt the grunt object
	* @param {strin} changelogIn changelog to start with
	* @param {bool} useEditDistanceCompare wheter to use EditDistanceCompairdefault false
	* @param {bool} useANewLineAfterHeader  default true
	* @param {string} pluginSlug pluginsug
	* @returns {object} class
	*/
	constructor( grunt, changelogIn, useEditDistanceCompare = false, useANewLineAfterHeader = true, pluginSlug ) {
		this.ChangelogMap = new Map();
		this.grunt = grunt;
		this.useEditDistanceCompare = useEditDistanceCompare;
		this.useANewLineAfterHeader = useANewLineAfterHeader;
		this.pluginSlug = pluginSlug;
		if ( changelogIn ) {
			this.parseChancelogLines( changelogIn );
		}
	}
	// Should be private but this breaks on ubuntu for some strange reason
	/**
	 * For each function add the lines corospondig to a header
	 * @param {int} value value of item.
	 * @param {int} _index The second number.
	 * @param {array} _array the for each
	 * @returns {null} does not return
	 */
	addLinesPerHeader( value, _index, _array ) {
		const key = `${value.match( new RegExp(  "[ a-zA-Z]+:" ) )}`;
		// eslint-disable-next-line no-control-regex
		const lines = value.match( new RegExp( "(?<=\n)\\*([\n]|.)+?(?=\Z|\n\n|\n\\*|\n$)", "gm" ) );
		if ( this.ChangelogMap.has( key ) ) {
			this.ChangelogMap.get( key ).append( lines );
		} else {
			const uniqueLines = new Unique( this.grunt );
			uniqueLines.append( lines );
			this.ChangelogMap.set( key, uniqueLines );
		}
		if ( this.useEditDistanceCompare ) {
			this.ChangelogMap.get( key ).applyEditdistanceFilter();
		}
	}

	/**
	 * Parse changelog lines
	 * @param {string} changelogIn changelos to be parsed.
	 * @returns {null} does not return
	 */
	parseChancelogLines( changelogIn ) {
		this.grunt.verbose.writeln( "in: [" + changelogIn + "]" );
		// eslint-disable-next-line no-control-regex
		const parts = changelogIn.match( new RegExp( "(\n|^)[ a-zA-Z]+:(.|\\n)*?(?=(\n[ a-zA-Z]+:|\$))", "g" ) );
		// Console.log(parts)
		// Make sure there are foreach items
		if ( parts ) {
			if ( parts.length > 0 ) {
				parts.forEach( this.addLinesPerHeader.bind( this ) );
			}
		}
	}

	/**
	 * Parse changelog lines parseChancelogLines special for yoast-cli generated file.
	 * @param {string} changelogIn changelos to be parsed .
	 * @returns {null} does not return
	 */
	parseYoastCliGeneratedChangelog( changelogIn ) {
		// Strip header from new file.
		changelogIn = changelogIn.replace( new RegExp( "# Yoast/" + this.pluginSlug + ":(.|\\n)*?(?=\n[ a-zA-Z]+:)" ),
			""
		);
		// Remove [#16525](https://github.com/Yoast/wordpress-seo/pull/16525) from lines
		changelogIn = changelogIn.replace( new RegExp( "\\W\\[#\\d+\\]\\(https://github.com/Yoast/.+?/pull/\\d+\\)", "gm" ),
			""
		);
		this.parseChancelogLines( changelogIn );
	}


	/**
	 * Returns the class generated changelog
	 * @returns {string} changelog without doubles
	 */
	get cleanChangelog() {
		var newlines = "";
		const line = this.useANewLineAfterHeader ? "\n" : "";
		if ( this.ChangelogMap.has( "Enhancements:" ) ) {
			newlines = "Enhancements:\n" + line  + this.ChangelogMap.get( "Enhancements:" ).items.join( "\n" ) + "\n\n";
		}
		if ( this.ChangelogMap.has( "Bugfixes:" ) ) {
			newlines = newlines + "Bugfixes:\n" + line + this.ChangelogMap.get( "Bugfixes:" ).items.join( "\n" ) + "\n\n";
		}
		this.ChangelogMap.forEach( function( _value, key, _map ) {
			if ( ! ( key === "Enhancements:" || key === "Bugfixes:" || key === "Non user facing:" || key === "Other:" ) ) {
				newlines = newlines +  key + "\n" + line + this.ChangelogMap.get( key ).items.join( "\n" ) + "\n\n";
			}
		}, this );
		if ( this.ChangelogMap.has( "Other:" ) ) {
			newlines = newlines + "Other:\n" + line + this.ChangelogMap.get( "Other:" ).items.join( "\n" ) + "\n\n";
		}
		return newlines;
	}
}


/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"update-changelog-with-latest-pr-texts",
		"Prompts the user for the changelog entries and updates the changelog entry in a file specified.",
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				commitChangelog: false,
				useANewLineAfterHeader: true,
				defaultChangelogEntrys: "",
			} );
			const done = this.async();
			const newVersion = grunt.option( "plugin-version" );
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
	 		* Append suffix to number
	 		* @param {int} number changelos to be parsed .
	 		* @returns {string}  number with suffix appended
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

			// eslint-disable-next-line max-len
			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );

			// If the current version is already in the changelog, retrieve the full readme and let the user edit it.
			if ( containsCurrentVersion ) {
				// Get the changelog entry's for the current version from the readme.
				const changelogVersionNumber = versionNumber.major + "." + versionNumber.minor;
				// eslint-disable-next-line max-len
				const matchCorrectHeader =  options.matchCorrectHeader.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( changelogVersionNumber ) );
				const matchCorrectLines = options.matchCorrectLines.replace( new RegExp( "VERSIONNUMBER" ), escapeRegExp( changelogVersionNumber ) );
				const currentChangelogEntriesMatches = changelog.match( new RegExp( matchCorrectLines,  ) );

				var currentChangelogEntries = "";
				if ( currentChangelogEntriesMatches ) {
					currentChangelogEntries = `${currentChangelogEntriesMatches[ 0 ]}`;
				}

				// Get the header from the changelog entry's

				const currentChangelogEntriesHeaderMatches = changelog.match( new RegExp( matchCorrectHeader,  ) );
				var currentChangelogEntriesHeader = "";
				if ( currentChangelogEntriesHeaderMatches ) {
					currentChangelogEntriesHeader = `${currentChangelogEntriesHeaderMatches[ 0 ]}`;
				}


				currentChangelogEntries = currentChangelogEntries.replace( new RegExp( escapeRegExp( currentChangelogEntriesHeader ) ), "" );

				// Create unique linses using class ChangelogBuilder
				changelogBuilder.parseChancelogLines( currentChangelogEntries );
				changelogBuilder.parseYoastCliGeneratedChangelog( grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ) );

				// Put all parts togethor agian
				// eslint-disable-next-line max-len
				const mergedReadme = changelog.replace( new RegExp( escapeRegExp( currentChangelogEntriesHeader + currentChangelogEntries ) ),  currentChangelogEntriesHeader  + changelogBuilder.cleanChangelog );

				// Write changes to the file.
				grunt.file.write( options.readmeFile, mergedReadme );
				done();
			} else {
				changelogBuilder.parseYoastCliGeneratedChangelog( grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ) );
				// If the current version is not in the changelog, build a new one from input file.
				let changelogVersionNumber = versionNumber.major + "." + versionNumber.minor;

				// Only add the patch number if we're actually doing a patch.
				if ( versionNumber.patch !== 0 ) {
					changelogVersionNumber += "." + versionNumber.patch;
				}
				var d = new Date();
				// Guess release date, probbaly next tuesday in three weeks time
				// Options for better logic, get latest tag date
				// Is date tag within 21 day next release 21 days
				// If not next release 42 days
				// Or login to jira get it there...
				d.setDate( d.getDate() + ( 2 + 21 - d.getDay() ) );
				const ye = new Intl.DateTimeFormat( "en", { year: "numeric" } ).format( d );
				const mo = new Intl.DateTimeFormat( "en", { month: "long" } ).format( d );
				const da = new Intl.DateTimeFormat( "en", { day: "numeric" } ).format( d );
				const datestring = `${mo} ${format( da )}, ${ye}`;

				// eslint-disable-next-line max-len
				changelogBuilder.parseChancelogLines( options.defaultChangelogEntrys.replace( new RegExp( "VERSIONNUMBER" ), changelogVersionNumber ) );

				var newChangelog = options.newHeadertemplate.replace( new RegExp( "VERSIONNUMBER" ), changelogVersionNumber );
				newChangelog = newChangelog.replace( new RegExp( "DATESTRING" ), datestring ) + changelogBuilder.cleanChangelog;

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
