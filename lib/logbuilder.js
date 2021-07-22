/* eslint-disable no-useless-escape */
/* eslint-disable max-depth */
/* eslint-disable complexity */

/**
 * Class for building unigue line items
 */
class Unique {
	/**
	 * Constructor
	 * @param {object} grunt grunt object
	 * @param {array} items array of initial items
	 * @returns {object} class
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
	* Disengage items to the items
	* @param {array} newItems array of initial items
	* @returns {null} does not return
	*/
	disengage( newItems ) {
		if ( newItems ) {
			newItems.forEach( function( newItem ) {
				if ( this.items.includes( newItem ) ) {
					this.removeItem( newItem );
				}
			}, this );
		}
	}

	// Should be private but this breaks on ubuntu for some strange reason
	/**
	* Remove item from items
	* @param {any} value value to remove
	* @returns {null} does not return
	*/
	removeItem( value ) {
		this.items =  this.items.filter( function( ele ) {
			return ele !== value;
		} );
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
	/**
	 * Reset the log to start clean
	 * @returns {null} nothing
	 */
	resetlog() {
		this.ChangelogMap = new Map();
	}

	// Should be private but this breaks on ubuntu for some strange reason
	/**
	 * For each function add the lines corospondig to a header
	 * @param {int} value value of item.
	 * @param {int} _index The second number.
	 * @param {array} _array the for each
	 * @returns {null} does not return
	 */
	addLinesPerHeader( value ) {
		const key = `${value.match( new RegExp(  "[ a-zA-Z]+:" ) )}`;
		// eslint-disable-next-line no-control-regex
		const lines = value.match( new RegExp( "(?<=\n)\\*([\n]|.)+?(?=\n\n|\n\\*|\n$)", "gm" ) );
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

	// Should be private but this breaks on ubuntu for some strange reason
	/**
	 * For each function add the lines corospondig to a header
	 * @param {int} value value of item.
	 * @param {int} _index The second number.
	 * @param {array} _array the for each
	 * @returns {null} does not return
	 */
	 substractLinesPerHeader( value ) {
		const key = `${value.match( new RegExp(  "[ a-zA-Z]+:" ) )}`;
		// eslint-disable-next-line no-control-regex
		const lines = value.match( new RegExp( "(?<=\n)\\*([\n]|.)+?(?=\n\n|\n\\*|\n$)", "gm" ) );
		if ( this.ChangelogMap.has( key ) ) {
			this.ChangelogMap.get( key ).disengage( lines );
		}

		// If ( this.useEditDistanceCompare ) {
		// 	This.ChangelogMap.get( key ).applyEditdistanceFilter();
		// }
	}


	/**
	 * Parse changelog lines
	 * @param {string} changelogIn changelos to be parsed.
	 * @param {boolean} substract is ths a QA changelog default false
	 * @returns {null} does not return
	 */
	parseChancelogLines( changelogIn, substract = false ) {
		this.grunt.verbose.writeln( "in: [" + changelogIn + "]" );
		// eslint-disable-next-line no-control-regex
		// Fix \r\n line feed issues:
		changelogIn = changelogIn.replace( /(?:\\[r]|[\r\n])/g, "\n" );
		// eslint-disable-next-line no-control-regex
		const parts = changelogIn.match( new RegExp( "(\n|^)[ a-zA-Z]+:(.|\n)*?(?=(\n[ a-zA-Z]+:|\$))", "g" ) );
		// Make sure there are foreach items
		if ( parts ) {
			if ( parts.length > 0 ) {
				if ( substract ) {
					parts.forEach( this.substractLinesPerHeader.bind( this ) );
				} else {
					parts.forEach( this.addLinesPerHeader.bind( this ) );
				}
			}
		}
	}

	/**
	 * Parse changelog lines parseChancelogLines special for yoast-cli generated file.
	 * @param {string} changelogIn changelos to be parsed .
	 * @param {boolean} substract is ths a QA changelog default false
	 * @param {boolean} removeGitLinks default true
	 * @param {boolean} removePluginLines defualt false
	 * @returns {null} does not return
	 */
	parseYoastCliGeneratedChangelog( changelogIn, substract = false, removeGitLinks = true, removePluginLines = false ) {
		// Strip header from new file.
		changelogIn = changelogIn.replace( new RegExp( "# Yoast/" + this.pluginSlug + ":(.|\\n)*?(?=\n[ a-zA-Z]+:)" ),
			""
		);
		// Remove [#16525](https://github.com/Yoast/wordpress-seo/pull/16525) from lines
		if ( removeGitLinks ) {
			changelogIn = changelogIn.replace( new RegExp( "\\W\\[#\\d+\\]\\(https://github.com/Yoast/.+?/pull/\\d+\\)", "gm" ),
				""
			);
		}
		// Remove * [pluginname] item text here
		if ( removePluginLines ) {
			// eslint-disable-next-line no-control-regex
			changelogIn = changelogIn.replace( new RegExp( "(?<=\n)\\*\\W\\[.+?]([\n]|.)+?(?=\n\n|\n\\*|\n$)", "gm" ),
				""
			);
		}
		this.parseChancelogLines( changelogIn, substract );
	}

	/**
	 * Parse changelog lines parseChancelogLines special for yoast-cli generated file.
	 * @param {string} changelogIn changelos to be parsed .
	 * @param {boolean} substract defualt is flase
	 * @param {string} specific only parse entry's of this type
	 * @returns {null} does not return
	 */
	parseYoastCliGeneratedChangelogPackageItemsOnly( changelogIn, substract = false, specific = "" ) {
		// Strip header from new file.
		changelogIn = changelogIn.replace( new RegExp( "# Yoast/" + this.pluginSlug + ":(.|\\n)*?(?=\n[ a-zA-Z]+:)" ),
			""
		);
		// Remove * [pluginname] item text here
		if ( specific === ""  ) {
		// eslint-disable-next-line no-control-regex
			changelogIn = changelogIn.replace( new RegExp( "(?<=\n)\\*\\W(?!\\[)(\n|.)+?(?=\n\n|\n\\*|\n$)", "gm" ),
				""
			);
		} else {
			changelogIn = changelogIn.replace( new RegExp( "(?<=\n)\\*\\W(?!" + specific + ")(\n|.)+?(?=\n\n|\n\\*|\n$)", "gm" ),
				""
			);
		}
		this.parseChancelogLines( changelogIn, substract );
	}


	/**
	 * Returns the class generated changelog
	 * @returns {string} changelog without doubles
	 */
	get cleanChangelog() {
		const showuserfacing = false;
		return this.changelogformatter( showuserfacing );
	}
	/**
	 * Returns the class generated changelog
	 * @returns {string} changelog qa
	 */
	get qaChangelog() {
		const showuserfacing = true;
		return this.changelogformatter( showuserfacing );
	}
	// This should be a private function
	/**
	 * Support function to generated changelog
	 * @param {boolean} showuserfacing shere or not to return userfasing header.
	 * @returns {string} changelog qa
	 */
	changelogformatter( showuserfacing = false ) {
		var newlines = "";
		const line = this.useANewLineAfterHeader ? "\n" : "";
		if ( this.ChangelogMap.has( "Enhancements:" ) ) {
			if ( this.ChangelogMap.get( "Enhancements:" ).items.length > 0 ) {
				newlines = "Enhancements:\n" + line  + this.ChangelogMap.get( "Enhancements:" ).items.join( "\n" ) + "\n\n";
			}
		}
		if ( this.ChangelogMap.has( "Bugfixes:" ) ) {
			if ( this.ChangelogMap.get( "Bugfixes:" ).items.length > 0 ) {
				newlines = newlines + "Bugfixes:\n" + line + this.ChangelogMap.get( "Bugfixes:" ).items.join( "\n" ) + "\n\n";
			}
		}
		// eslint-disable-next-line no-unused-vars
		this.ChangelogMap.forEach( function( _value, key, _map ) {
			if ( ! ( key === "Enhancements:" || key === "Bugfixes:" || ( key === "Non user facing:"   ) || key === "Other:" ) ) {
				if ( this.ChangelogMap.get( key ).items.length > 0 ) {
					newlines = newlines +  key + "\n" + line + this.ChangelogMap.get( key ).items.join( "\n" ) + "\n\n";
				}
			}
		}, this );
		if ( this.ChangelogMap.has( "Other:" ) ) {
			if ( this.ChangelogMap.get( "Other:" ).items.length > 0 ) {
				newlines = newlines + "Other:\n" + line + this.ChangelogMap.get( "Other:" ).items.join( "\n" ) + "\n\n";
			}
		}
		if ( this.ChangelogMap.has( "Non user facing:" ) && showuserfacing )  {
			if ( this.ChangelogMap.get( "Non user facing:" ).items.length > 0 ) {
				newlines = newlines + "Non user facing:\n" + line + this.ChangelogMap.get( "Non user facing:" ).items.join( "\n" ) + "\n\n";
			}
		}
		return newlines;
	}
}
module.exports = ChangelogBuilder;
