# Grunt-Yoast-tasks

> The plugin that contains all custom Yoast tasks

## Getting Started
This plugin requires Grunt `^1.0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm i @yoast/grunt-plugin-tasks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this bit of JavaScript:

```js
// Load Grunt configurations and tasks
loadGruntConfig( grunt, {
    configPath: path.join( process.cwd(), "node_modules/@yoast/grunt-plugin-tasks/config/" ),
    overridePath: path.join( process.cwd(), project.paths.config ),
    data: project,
    jitGrunt: {
        staticMappings: {
            addtextdomain: "grunt-wp-i18n",
            makepot: "grunt-wp-i18n",
            glotpress_download: "grunt-glotpress",
            "update-version": "@yoast/grunt-plugin-tasks",
            "set-version": "@yoast/grunt-plugin-tasks",
        },
    },
} );
```

You can override individual task configs by adding them to your plugin's local grunt config directory.

## Tasks this adds
This adds the following tasks to your plugin's repo (see below for usage):

* [addtextdomain](https://github.com/Yoast/plugin-grunt-tasks#the-addtextdomain-task)
* [checktextdomain](https://github.com/Yoast/plugin-grunt-tasks#the-checktextdomain-task)
* [clean](https://github.com/Yoast/plugin-grunt-tasks#the-clean-task)
* [compress](https://github.com/Yoast/plugin-grunt-tasks#the-compress-task)
* [eslint](https://github.com/Yoast/plugin-grunt-tasks#the-eslint-task)
* [glotpress_download](https://github.com/Yoast/plugin-grunt-tasks#the-glotpress_download-task)
* [imagemin](https://github.com/Yoast/plugin-grunt-tasks#the-imagemin-task)
* [makepot](https://github.com/Yoast/plugin-grunt-tasks#the-makepot-task)
* [postcss](https://github.com/Yoast/plugin-grunt-tasks#the-postcss-task)
* [rtlcss](https://github.com/Yoast/plugin-grunt-tasks#the-rtlcss-task)
* [set-version](https://github.com/Yoast/plugin-grunt-tasks#the-set-version-task)
* [shell](https://github.com/Yoast/plugin-grunt-tasks#the-shell-task)
* [uglify](https://github.com/Yoast/plugin-grunt-tasks#the-uglify-task)
* [update-version](https://github.com/Yoast/plugin-grunt-tasks#the-update-version-task)
* [watch](https://github.com/Yoast/plugin-grunt-tasks#the-watch-task)
* [wp_deploy](https://github.com/Yoast/plugin-grunt-tasks#the-wp_deploy-task)
* [update-changelog-with-latest-pr-texts](https://github.com/Yoast/plugin-grunt-tasks#the-update-changelog-with-latest-pr-texts-task)
* [get-latest-pr-texts](https://github.com/Yoast/plugin-grunt-tasks#the-get-latest-pr-texts-task)
* [build-qa-changelog-task](https://github.com/Yoast/plugin-grunt-tasks#the-build-qa-changelog-task)
* [download-qa-changelog](https://github.com/Yoast/plugin-grunt-tasks##the-download-qa-changelog-task)

### The `addtextdomain` task
See: [cedaro/grunt-wp-i18n](https://github.com/cedaro/grunt-wp-i18n)

#### Using our configuration
The `textdomain` value is read from the `package.json`: `plugin.textdomain`.  
The `files` value is read from the Grunt configuration: `files.php`. 

#### Overview
In your project's Gruntfile, add a section named `addtextdomain` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    addtextdomain: {
        options: {
            textdomain: "",    // Project text domain.
            updateDomains: []  // List of text domains to replace.
        },
        target: {
            files: {}          // Files to target.
        }
    }
} );
```

#### Options
##### textdomain
Type: `String`  
Default value: `''`  
Example value: `'plugin-or-theme-slug'`

Defaults to the "Text Domain" header if it exists, otherwise uses the project directory name.

##### updateDomains
Type: `Array|true`  
Default value: `[]`  
Example value: `[ 'original-domain', 'vendor-domain' ]`

A list of text domains to replace with the new text domain. Setting the value to `true` will update all text domains with the new text domain.

#### Usage Examples
Options may be specified at the task or target level, but are optional. Each target must define the files that should be processed. It's not necessary to declare a destination since the files will be updated in place.
```js
grunt.initConfig( {
    addtextdomain: { 
        options: {
            textdomain: 'my-plugin-slug',
        },
        target: {
            files: {
                src: [
                    '*.php',
                    '**/*.php',
                    '!node_modules/**',
                    '!tests/**'
                ]
            }
        }
    }
} );
```


### The `checktextdomain` task
See: [stephenharris/grunt-checktextdomain](https://github.com/stephenharris/grunt-checktextdomain)

#### Using our configuration
The `options.textdomain` value is read from the `package.json`: `plugin.textdomain`.  
The `options.keywords` is
```js
[
    "__:1,2d",
    "_e:1,2d",
    "_x:1,2c,3d",
    "_ex:1,2c,3d",
    "_n:1,2,4d",
    "_nx:1,2,4c,5d",
    "_n_noop:1,2,3d",
    "_nx_noop:1,2,3c,4d",
    "esc_attr__:1,2d",
    "esc_html__:1,2d",
    "esc_attr_e:1,2d",
    "esc_html_e:1,2d",
    "esc_attr_x:1,2c,3d",
    "esc_html_x:1,2c,3d"
]
```
The `files.src` value is read from the Grunt configuration: `files.php`.  
The `files.expand` is `true`.

#### Overview
In your project's Gruntfile, add a section named `checktextdomain` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    checktextdomain: {
        options: {}, // Task-specific options.
        files: {}    // Files to target.
    }
} )
```

#### Options
##### text_domain
Type: `String`|`Array`

Must be provided. A text domain (or an array of text domains) indicating the domains to check against.

##### keywords
Type: `Array`

An array of keyword specifications to look for.

##### report_missing
Type: `Bool`  
Default value: `true`

Whether to report use of keywords without a domain being passed.

##### report_variable_domain
Type: `Bool`  
Default value: `true`

Whether to report use of keywords with a variable being used as the domain.

##### correct_domain
Type: `Bool`  
Default value: `false`

Whether to automatically correct incorrect domains. Please note that this does **not** add in missing domains, and can **only** be used when one text domain is supplied. This will also correct instances where a variable, rather than string is used as a text doman, **unless** you set `report_variable_domain` to `false`.

##### create_report_file
Type: `Bool`  
Default value: `false`

Create a hidden `.[target].json` file with reported errors.

##### force
Type: `Bool`  
Default value: `false`

Set to true to report text domain errors but not fail the task.

#### Usage Examples
This is a typical set-up for WordPress development. The only thing specific to WordPress here is the keywords list.
```js
checktextdomain: {
    options: {
        text_domain: "my-domain",
        keywords: [
            "__:1,2d",
            "_e:1,2d",
            "_x:1,2c,3d",
            "esc_html__:1,2d",
            "esc_html_e:1,2d",
            "esc_html_x:1,2c,3d",
            "esc_attr__:1,2d",
            "esc_attr_e:1,2d",
            "esc_attr_x:1,2c,3d",
            "_ex:1,2c,3d",
            "_n:1,2,4d",
            "_nx:1,2,4c,5d",
            "_n_noop:1,2,3d",
            "_nx_noop:1,2,3c,4d"
        ]
    },
    files: [
        {
            src: [ "**/*.php" ],
            expand: true
        }
    ]
}
```


### The `clean` task
See: [gruntjs/grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)

#### Using our configuration
For our clean tasks we need some Grunt configuration entries:
    - `paths.languages`
    - `paths.css`
    - `paths.js`
    - `files.artifact`
    - `files.artifactComposer`

The `textdomain` value is read from the `package.json`: `plugin.textdomain`.

We add the following clean tasks:
- `language-files`: Cleans the `paths.languages` path except the `index.php` file.
- `after-po-download`: Cleans files in the `paths.languages` path with `po` or `json` extensions that start with the `textdomain` followed by `-{anything}-` and then `formal`, `informal` or `ao90`
  - The `textdomain` value is read from the `package.json`: `plugin.textdomain`.
  - Example filename that would get cleaned in the `paths.languages`: `textdomain-pluginname-informal.json`.
- `po-files`: Cleans all the files in the `paths.languages` path with `po` and `pot` extensions.
- `build-assets-css`: Cleans all the files in the `paths.css` path with `css` and `map` extensions.
- `build-assets-js`: Cleans all the files in the `paths.js` path with `min.js` and `map` extensions.
- `artifact`: Cleans all the files in the `files.artifact` path.
- `composer-artifact`: Cleans all the files in the `files.artifactComposer` path.
- `composer-files`: Cleans all the files in the `files.artifactComposer` `/vendor` path.

#### Overview
In your project's Gruntfile, add a section named `clean` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    clean: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
            src: {},     // Files to target.
        }
    }
} )
```

#### Options
##### force
Type: `Boolean`  
Default: `false`

Setting this to `true` allows the deletion of folders outside the current working dir (CWD). Use with caution.

##### no-write
Type: `Boolean`  
Default: `false`

Will not actually delete any files or directories.
If the task is run with the `--verbose` flag, the task will log messages of what files would have be deleted.

_Note: As this task property contains a hyphen, you will need to surround it with quotes._

#### Usage Examples
There are three formats you can use to run this task.

##### Short
```js
clean: [ "path/to/dir/one", "path/to/dir/two" ]
```

##### Medium (specific targets with global options)
```js
clean: {
    build: [ "path/to/dir/one", "path/to/dir/two" ],
    release: [ "path/to/another/dir/one", "path/to/another/dir/two" ]
},
```

##### Long (specific targets with per target options)
```js
clean: {
    build: {
        src: [ "path/to/dir/one", "path/to/dir/two" ]
    }
}
```


### The `compress` task
See: [gruntjs/grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)

#### Using our configuration
We implement an `artifact` compress task:
- The `options.archive` is set to `artifact.zip`.
- The `options.level` is set to `9`.
- The `files.cwd` is set to `artifact/`.
- The `files.src` is set to `**`.
- The `files.dest` value is read from the Grunt configuration: `pluginSlug`.

#### Overview
In your project's Gruntfile, add a section named `compress` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    compress: {
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
            files: [],   // Files to target.
        },
    }
} )
```

#### Options
##### archive
Type: `String` or `Function`  
Modes: `zip` `tar`

This is used to define where to output the archive. Each target can only have one output file.
If the type is a Function it must return a String.

*This option is only appropriate for many-files-to-one compression modes like zip and tar.  For gzip for example, please use grunt's standard src/dest specifications.*

##### mode
Type: `String`

This is used to define which mode to use, currently supports `gzip`, `deflate`, `deflateRaw`, `tar`, `tgz` (tar gzip),`zip` and `brotli`.

Automatically detected per `dest:src` pair, but can be overridden per target if desired.

##### level
Type: `Integer`  
Modes: `zip` `gzip`  
Default: `1`

Sets the level of archive compression.

##### brotli
Type: `Object`  
Default:
```js
{
    mode: 0,
    quality: 11,
    lgwin: 22,
    lgblock: 0
}
```

Configure brotli compression settings.

##### mode
Type: `Integer`
* `0`: generic mode
* `1`: text mode
* `2`: font mode

Default: `0`

##### quality
Type: `Integer`  
Default: `11`

Controls the compression-speed vs compression-density tradeoffs. The higher the quality, the slower the compression. Range is 0 to 11.

##### lgwin
Type: `Integer`  
Default: `22`

Base 2 logarithm of the sliding window size. Range is 10 to 24.

##### lgblock
Type: `Integer`  
Default: `0`

Base 2 logarithm of the maximum input block size. Range is 16 to 24. If set to 0, the value will be set based on the quality.  

##### pretty
Type: `Boolean`  
Default: `false`

Pretty print file sizes when logging.
##### createEmptyArchive
Type: `Boolean`  
Default: `true`

This can be used when you don't want to get an empty archive as a result, if there are no files at the specified paths.

It may be useful, if you don't clearly know if files exist and you don't need an empty archive as a result.

#### File Data
The following additional keys may be passed as part of a `dest:src` pair when using an Archiver-backed format.
All keys can be defined as a `Function` that receives the file name and returns in the type specified below.

##### date
Type: `Date`  
Modes: `zip` `tar` `tgz`

Sets the file date.

##### mode
Type: `Integer`  
Modes: `zip` `tar` `tgz`

Sets the file permissions.

##### store
Type: `Boolean`  
Default: `false`

If true, file contents will be archived without compression.

##### comment
Type: `String`  
Modes: `zip`

Sets the file comment.

##### gid
Type: `Integer`  
Modes: `tar` `tgz`

Sets the group of the file in the archive.

##### uid
Type: `Integer`  
Modes: `tar` `tgz`

Sets the user of the file in the archive.

#### Usage Examples
```js
compress: {
    main: {
        options: {
            archive: "archive.zip"
        },
        files: [
            // Includes files in path.
            { src: [ "path/*" ], dest: "internal_folder/", filter: "isFile" },
            // Includes files in path and its subdirs.
            { src: [ "path/**" ], dest: "internal_folder2/" },
            // Makes all src relative to cwd.
            { expand: true, cwd: "path/", src: [ "**" ], dest: "internal_folder3/" },
            // Flattens results to a single level.
            { flatten: true, src: [ "path/**" ], dest: "internal_folder4/", filter: "isFile" }
        ]
    }
}
```


### The `eslint` task
See: [sindresorhus/grunt-eslint](https://github.com/sindresorhus/grunt-eslint)

#### Using our configuration
We implement two `eslint` tasks:
- `plugin`
  - The `plugin.src` value is read from the Grunt configuration: `files.js`.
  - The `options.maxWarnings` is set to `-1`. 
- `grunt`
  - The `grunt.src` value is read from the Grunt configuration: `files.grunt` and `files.config`.
  - The `options.maxWarnings` is set to `-1`. 

#### Overview
In your project's Gruntfile, add a section named `eslint` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    eslint: {
        options: {}, // Task-specific options.
        target: [],  // Files to target.
    }
} )
```

#### Options
See the [ESLint options](https://eslint.org/docs/developer-guide/nodejs-api#cliengine).

In addition the following options are supported:
##### format
Type: `string`  
Default: `'stylish'`

Name of a [built-in formatter](https://github.com/nzakas/eslint/tree/master/lib/formatters) or path to a custom one.

Some formatters you might find useful: [eslint-json](https://github.com/sindresorhus/eslint-json), [eslint-tap](https://github.com/sindresorhus/eslint-tap).

##### outputFile
Type: `string`  
Default: `''`

Output the report to a file.

##### quiet
Type: `boolean`  
Default: `false`

Report errors only.

##### maxWarnings
Type: `number`  
Default: `-1` *(Means no limit)*

Number of warnings to trigger non-zero exit code.

##### failOnError
Type: `boolean`  
Default: `true`

Fail the build if ESLint found any errors.

#### Usage Examples
```js
grunt.initConfig( {
    eslint: {
        options: {
            configFile: "conf/eslint.json",
            rulePaths: [ "conf/rules" ]
        },
        target: [ "file.js" ]
    }
} );
```


### The `glotpress_download` task
See: [markoheijnen/grunt-glotpress](https://github.com/markoheijnen/grunt-glotpress)

#### Using our configuration
We implement a `plugin` task:
- The `options.url` value is read from the `package.json`: `plugin.glotpress`.
- The `options.domainPath` value is read from the Grunt configuration: `paths.languages`.
- The `options.file_format` value is set to `"%domainPath%/%textdomain%-%wp_locale%.%format%"`.
- The `options.slug` value is read from the `package.json`: `plugin.glotpress_path`.
- The `options.textdomain` value is read from the `package.json`: `plugin.textdomain`.
- The `options.formats` value is set to `['mo']`.
- The `options.filter` value is set to:
```js
{
    translation_sets  : false,
    minimum_percentage: 50,
    waiting_strings   : false
}
```

#### Overview
In your project's Gruntfile, add a section named `glotpress_download` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
  glotpress_download: {
    options: {},     // Task-specific options.
    your_target: {}, // Target-specific file lists and/or options.
  },
} );
```

#### Options
##### domainPath
Type: `String`  
Default value: `languages`

The folder where all downloaded files will be stored.

##### url
Type: `String`  
Default value: `false`

The url of the GlotPress installation (required).

##### slug
Type: `String`  
Default value: `false`

The slug is the path in the GlotPress installation which can also be main-folder/sub-folder (required).

##### textdomain
Type: `String`  
Default value: `false`

The textdomain that is used for WordPress. This is needed for the files. If not set, it will fallback to the slug.

##### file_format
Type: `String`  
Default value: `%domainPath%/%textdomain%-%wp_locale%.%format%`

The structure how the file is being stored. Is based on previous settings but you could create your own format.
For now only those four values and short locale can be used. You could however save the files in different folders if you move a placeholder.

##### formats
Type: `Array`  
Default value: `['po','mo']`

The file formats that will be downloaded for each translation set.

##### filter
Type: `object`  
Default value: `{translation_sets: false, minimum_percentage: 30, waiting_strings: false}`

You can filter which files you want to have. By default it only checks the minimum percentage translation sets need to be translated.
The other parameters still need to be implemented.

### Usage Examples

#### Default Options
In this example, the default options are used to download all translations sets from a project.

```js
grunt.initConfig( {
    glotpress_download: {
        core: {
            options: {
                domainPath: "languages",
                url: "http://wp-translate.org",
                slug: "tabify-edit-screen",
                textdomain: "tabify-edit-screen",
            }
        },
    },
} );
```


### The `imagemin` task
See: [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)

#### Using our configuration
We implement a `plugin` task:
- The `options.use` value is set to `gifsicle`, `jpegtran`, `optipng` and `svgo`.
- The `files` array contains two sets: `images` and `assets`.
    - Both have the `files.expand` value set to `true`.
    - Both have the `files.src` value set to `[ "*.*" ]`.
    - Both have the `files.isFile` value set to `true`.
    - `images` has the `files.cwd` and `files.dest` both read from the Grunt configuration: `paths.images`.
    - `assets` has the `files.cwd` and `files.dest` both read from the Grunt configuration: `paths.assets`.

There is an exception for the `svgo` plugin in order to keep a11y attributes for SVGs. It gets the following configuration:
```js
{
	plugins: [
		{ removeTitle: true },
		{ removeDesc: true },
		{
			removeUnknownsAndDefaults: {
				keepRoleAttr: true,
				keepAriaAttrs: true,
			},
		},
		{
			addAttributesToSVGElement: {
				attributes: [
					{ role: "img" },
					{ "aria-hidden": "true" },
					{ focusable: "false" },
				],
			},
		},
	],
}
```

#### Overview
In your project's Gruntfile, add a section named `imagemin` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
  imagemin: {
    options: {}, // Task-specific options.
    files: [],   // Files to target.
  },
} );
```

#### Options
##### optimizationLevel *(png)*
Type: `number`  
Default: `3`

Select optimization level between `0` and `7`.

##### progressive *(jpg)*
Type: `boolean`  
Default: `true`

Lossless conversion to progressive.

##### interlaced *(gif)*
Type: `boolean`  
Default: `true`

Interlace gif for progressive rendering.

##### svgoPlugins *(svg)*
Type: `Array`

Customize which SVGO plugins to use. [More here](https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins).

##### use
Type: `Array`  
Default: `[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use with imagemin. It comes bundled with the following **lossless** optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*

These are bundled for convenience and most users will not need anything else.

##### concurrency
Type: `number`  
Default: `os.cpus().length`

Control the maximum number of image optimizations that may be performed in parallel.

#### Usage Examples
```js
const mozjpeg = require('imagemin-mozjpeg');

grunt.initConfig( {
    imagemin: {
        static: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [ { removeViewBox: false } ],
                // Example plugin usage.
                use: [ mozjpeg() ]
            },
            files: {
                "dist/img.png": "src/img.png",
                "dist/img.jpg": "src/img.jpg",
                "dist/img.gif": "src/img.gif"
            }
        },
        dynamic: {
            files: [ {
                expand: true,
                cwd: "src/",
                src: [ "**/*.{png,jpg,gif}" ],
                dest: "dist/"
            } ]
        }
    }
} );
```


### The `makepot` task
See: [cedaro/grunt-wp-i18n](https://github.com/cedaro/grunt-wp-i18n)

#### Using our configuration
We implement a `plugin` task:
- The `options.domainPath` value is read from the Grunt configuration: `paths.languages`.
- The `options.potFilename` value is read from the `package.json`: `plugin.textdomain`.
- The `options.potHeaders` value is set to:
    - The `options.potHeaders.poedit` value is set to `true`.
    - The `options.potHeaders.report-msgid-bugs-to` value is read from the Grunt configuration: `pot.reportmsgidbugsto`.
    - The `options.potHeaders.language-team` value is read from the Grunt configuration: `pot.languageteam`.
    - The `options.potHeaders.last-translator` value is read from the Grunt configuration: `pot.lasttranslator`.
- The `options.type` value is set to `wp-plugin`.
- The `options.exclude` value is set to `[]`.

#### Overview
In your project's Gruntfile, add a section named `makepot` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    makepot: {
        target: {
            options: {
                cwd: "",                          // Directory of files to internationalize.
                domainPath: "",                   // Where to save the POT file.
                exclude: [],                      // List of files or directories to ignore.
                include: [],                      // List of files or directories to include.
                mainFile: "",                     // Main project file.
                potComments: "",                  // The copyright at the beginning of the POT file.
                potFilename: "",                  // Name of the POT file.
                potHeaders: {
                    poedit: true,                 // Includes common Poedit headers.
                    "x-poedit-keywordslist": true // Include a list of all possible gettext functions.
                },                                // Headers to add to the generated POT file.
                processPot: null,                 // A callback function for manipulating the POT file.
                type: "wp-plugin",                // Type of project (wp-plugin or wp-theme).
                updateTimestamp: true,            // Whether the POT-Creation-Date should be updated without other changes.
                updatePoFiles: false              // Whether to update PO files in the same directory as the POT file.
            }
        }
    }
} );
```

#### Options
All options are optional, but at the very least a target needs to exist. At a minimum, set an option specifying the type of project.

```js
grunt.initConfig( {
    makepot: {
        target: {
            options: {
                type: "wp-plugin"
            }
        }
    }
} );
```

##### cwd
Type: `String`  
Default value: `''`  
Example value: `'release'`

The directory that should be internationalized. Defaults to the project root, but can be set to a subdirectory, for instance, when used in a build process. Should be relative to the project root.

##### domainPath
Type: `String`  
Default value: `''`  
Example value: `'/languages'`

The directory where the POT file should be saved. Defaults to the value from the "Domain Path" header if it exists.

##### exclude
Type: `String`  
Default value: `[]`  
Example value: `['subdir/.*']`

List of files or directories to ignore when generating the POT file. Note that the globbing pattern is a basic PHP [regular expression](https://github.com/blazersix/grunt-wp-i18n/blob/develop/vendor/wp-i18n-tools/extract.php#L66).

##### include
Type: `String`  
Default value: `[]`  
Example value: `['subdir/.*']`

List of files or directories to include when generating the POT file. Note that the globbing pattern is a basic PHP [regular expression](https://github.com/blazersix/grunt-wp-i18n/blob/develop/vendor/wp-i18n-tools/extract.php#L66)

##### mainFile
Type: `String`  
Default value: `''`  
Example value: `'plugin-slug.php'` or `'style.css'`

Name of the main project file where the headers can be found. In themes, this will default to `style.css`. An attempt will be made to auto-discover the main file for plugins, but specifying it here can improve performance and will help disambiguate between multiple plugin files in the same project.

##### potComments
Type: `String`  
Example value: `'Custom Copyright (c) {{year}}'`

Comment at the beginning of the POT file. Defaults to the copyright message generated by makepot.php. Use `\n` for newlines and `{{year}}` to insert the current year.

##### potFilename
Type: `String`  
Default value: `''`  
Example value: `'plugin-or-theme-slug.pot'`

Name of the POT file. Defaults to the "Text Domain" header if it exists, otherwise uses the project directory name.

##### potHeaders
Type: `Object`  
Example value: `{ 'report-msgid-bugs-to': 'https://github.com/blazersix/grunt-wp-i18n/issues' }`

List of headers to add to the POT file in the form of key-value pairs.

Adding a `poedit` property with a value of `true` will add the following commonly-used Poedit headers to ease setup for translators:

```js
{
    "language": "en",
    "plural-forms": "nplurals=2; plural=(n != 1);",
    "x-poedit-country": "United States",
    "x-poedit-sourcecharset": "UTF-8",
    "x-poedit-keywordslist": "__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c;_nc:1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;",
    "x-poedit-basepath": "../",
    "x-poedit-searchpath-0": ".",
    "x-poedit-bookmarks": "",
    "x-textdomain-support": "yes"
}
```

If custom values are used for the various Poedit headers, but you want to include WordPress gettext function calls, set the value of `x-poedit-keywordslist` to `true` and they will be included automatically.

##### processPot
Type: `Function( pot, options )`  
Default value: `null`

A callback function for advanced manipulation of the POT file after it's generated.

##### type
Type: `String`  
Default value: `'wp-plugin'`  
Example value: `'wp-plugin'` or `'wp-theme'`

The type of project.

##### updateTimestamp
Type: `Boolean`  
Default value: `true`

Whether the `POT-Creation-Date` header should be updated if no other changes to the POT file are detected.

##### updatePoFiles
Type: `Boolean`  
Default value: `false`

[GNU gettext](https://www.gnu.org/software/gettext/) must be in your system path to use this option.

Whether to update the PO files that are present in the same directory as the POT file using the [msgmerge](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html) program.

#### Usage Examples
##### Custom Working Directory (cwd)
If using with a custom build process, the following config would process strings in the `/dist` subdirectory and save the POT file to `/dist/languages/plugin-slug.pot`.

The `report-msgid-bugs-to` and `language-team` POT headers will also be replaced with custom values in the `processPot` callback.

```js
grunt.initConfig( {
    makepot: {
        target: {
            options: {
                cwd: "dist"
                domainPath: "/languages",
                mainFile: "plugin-slug.php",
                potFilename: "plugin-slug.pot",
                processPot: function( pot, options ) {
                    pot.headers["report-msgid-bugs-to"] = "http://example.com/issues";
                    pot.headers["language-team"] = "Team Name <team@example.com>";
                    return pot;
                },
                type: "wp-plugin"
            }
        }
    }
} );
```


### The `postcss` task
See: [nDmitry/grunt-postcss](https://github.com/nDmitry/grunt-postcss)

#### Using our configuration
We implement a `build-default` task:
- The `options.map` value is read from the Grunt configuration: `developmentBuild`.
- The `options.processors` value is set to:
```js
[
    require( "autoprefixer" )(),
    require( "cssnano" )(),
]
```
- The `src` value is read from the Grunt configuration: `files.css`.

#### Overview
In your project's Gruntfile, add a section named `postcss` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    postcss: {
        options: {}, // Task-specific options.
        dist: {
            src: ""  // Files to target.
        },
    },
} );
```

#### Options
##### processors
Type: `Array`  
Default value: `[]`

An array of PostCSS compatible post-processors.

##### map
Type: `Boolean|Object`  
Default value: `false`

If the `map` option isn't defined or is set to `false`, PostCSS won't create or update sourcemaps.

If `true` is specified, PostCSS will try to locate a sourcemap from a previous compilation step using an annotation comment (e.g. from Sass) and create a new sourcemap based on the found one (or just create a new inlined sourcemap). The created sourcemap can be either a separate file or an inlined map depending on what the previous sourcemap was.

You can gain more control over sourcemap generation by assigning an object to the `map` option:

* `prev` (string or `false`): a path to a directory where a previous sourcemap is (e.g. `path/`). By default, PostCSS will try to find a previous sourcemap using a path from the annotation comment (or using the annotation comment itself if the map is inlined). You can also set this option to `false` to delete the previous sourcemap.
* `inline` (boolean): whether a sourcemap will be inlined or not. By default, it will be the same as a previous sourcemap or inlined.
* `annotation` (boolean or string): by default, PostCSS will always add annotation comments with a path to a sourcemap file unless it is inlined or the input CSS does not have an annotation comment. PostCSS presumes that you want to save sourcemaps next to your output CSS files, but you can override this behavior and set a path to a directory as a string value for the option.
* `sourcesContent` (boolean): whether original file contents (e.g. Sass sources) will be included to a sourcemap. By default, it's `true` unless a sourcemap from a previous compilation step has the original contents missing.

##### diff
Type: `Boolean|String`  
Default value: `false`

Set it to `true` if you want to get a patch file:

```js
options: {
  diff: true // Or 'custom/path/to/file.css.patch'.
}
```
You can also specify a path where you want the file to be saved.

##### failOnError
Type: `Boolean`  
Default value: `false`

Set it to `true` if you want grunt to exit with an error on detecting a warning or error.

##### writeDest
Type: `Boolean`  
Default value: `true`

Set it to `false` if you do not want the destination files to be written. This does not affect the processing of the `map` and `diff` options.

##### syntax, parser, stringifier
Options to control [PostCSS custom syntaxes](https://github.com/postcss/postcss#custom-syntaxes).
```js
options: {
  parser: require( "postcss-safe-parser" ) // Instead of a removed `safe` option.
}
```
```js
options: {
  syntax: require( "postcss-scss" ) // Work with SCSS directly.
}
```

#### Usage Examples
```js
grunt.initConfig( {
    postcss: {
        options: {
            map: true, // Inline sourcemaps.
            map: {     // Or:
                inline: false,               // Save all sourcemaps as separate files...
                annotation: "dist/css/maps/" // ...to the specified directory
            },
            
            processors: [
                require( "pixrem" )(),                                        // Add fallbacks for rem units.
                require( "autoprefixer" )( { browsers: "last 2 versions" } ), // Add vendor prefixes.
                require( "cssnano" )()                                        // Minify the result.
            ]
        },
        dist: {
          src: "css/*.css"
        }
    }
} );
```

### The `rtlcss` task
See: [MohammadYounes/grunt-rtlcss](https://github.com/MohammadYounes/grunt-rtlcss)

#### Using our configuration
We implement a `build` task:
- The `options.map` value is read from the Grunt configuration: `developmentBuild`.
- The `options.clean` value is set to `true`.
- The `options.plugins` is used to swap icons by having the value set to:
```js
[
    {
        name: "swap-dashicons-left-right-arrows",
        priority: 10,
        directives: {
            control: {},
            value: [],
        },
        processors: [
            {
                expr: /content/im,
                action: function( prop, value ) {
                    // For dashicons-arrow-left.
                    if ( value === '"\\f141"' ) {
                        value = '"\\f139"';
                        // For dashicons-arrow-left-alt.
                    } else if ( value === '"\\f340"' ) {
                        value = '"\\f344"';
                        // For dashicons-arrow-left-alt2.
                    } else if ( value === '"\\f341"' ) {
                        value = '"\\f345"';
                        // For dashicons-arrow-right.
                    } else if ( value === '"\\f139"' ) {
                        value = '"\\f141"';
                        // For dashicons-arrow-right-alt.
                    } else if ( value === '"\\f344"' ) {
                        value = '"\\f340"';
                        // For dashicons-arrow-right-alt2.
                    } else if ( value === '"\\f345"' ) {
                        value = '"\\f341"';
                    }
                    return { prop: prop, value: value };
                },
            },
        ],
    },
],
```
- The `options.expand` value is set to `true`.
- The `options.cwd` value is read from the Grunt configuration: `paths.css`.
- The `options.src` value is set to all `.css` files except ones that end with `-rtl.css` or `-rtl.min.css` depending on the Grunt configuration: `developmentBuild`.
- The `options.dest` value is read from the Grunt configuration: `paths.css`.
- The `options.ext` value is set to `-rtl.css` or `-rtl.min.css` depending on the Grunt configuration: `developmentBuild`.

#### Overview
In your project's Gruntfile, add a section named `imagemin` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    rtlcss: {}, // See the usage example for the content.
} );
```

#### Options
##### opts
Type: `Object`  
Default:
```js
{
    "autoRename": false,
    "autoRenameStrict": false,
    "blacklist": {},
    "clean": true,
    "greedy": false,
    "processUrls": false,
    "stringMap": []
}
```

Specifies [RTLCSS options](https://github.com/MohammadYounes/rtlcss#options-object).

##### plugins
Type: `Array`  
Default: `[]`

Specifies custom [RTLCSS plugins](https://github.com/MohammadYounes/rtlcss#plugins-array).

##### map
Type: `Boolean` or `Object`    
Default: `false`

Specifies whether to generate source maps or not, If you want more control over source map generation, you can define the map option as an object. (see [postcss docs](https://github.com/postcss/postcss/blob/master/docs/source-maps.md#options)).

#### saveUnmodified
Type: `Boolean`  
Default: `true`

Specifies whether to save unmodified files or not.

#### Usage Examples
```js
rtlcss: {
    myTask: {
        // Task options.
        options: {
            // Generate source maps.
            map: { inline: false },
            // RTL CSS options.
            opts: {
                clean: false
            },
            // RTL CSS plugins.
            plugins: [],
            saveUnmodified: true,
        },
        expand: true,
        cwd: "ltr/",
        dest: "rtl/",
        src: [ "**/*.css" ]
    }
}
```

### The 'set-version' task
#### Using our configuration
We implement a `packageJSON` task:
- The `options.base` value is set to `yoast`.
- The `options.target` value is set to `pluginVersion`.
- The `options.src` value is set to `package.json`.

#### Overview
In your project's Gruntfile, add a section named `yoast_tasks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig( {
    yoast_tasks: {
        options: {},    // Task-specific options.
        your_target: {} // Target-specific file lists and/or options
    }
} );
```

#### Options
##### base
Type: `String`  
Default value: `''`

The JSON file base object for the target to be in.

##### target
Type: `String`  
Default value: `''`

The child of the options.base object to replace the version string in.

##### src
Type: `String`  
Default value: `''`

The source JSON file to set the version in.

#### Usage Examples
```js
packageJSON: {
    options: {
        base: "someOrganisation",
        target: "pluginVersion",
    },
    src: "tmp/testPackage.json",
}
```


### The `shell` task
See: [sindresorhus/grunt-shell](https://github.com/sindresorhus/grunt-shell)

#### Using our configuration
We implement the following tasks:
- `composer-install-production`
    - The `command` is set to `composer install --prefer-dist --optimize-autoloader --no-dev`.
- `composer-install-dev`
    - The `command` is set to `composer install`.
- `composer-reset-config`
    - The `command` is set to `git checkout composer.json`.
    - The `options.failOnError` is set to `false`.
- `composer-reset-lock`
    - The `command` is set to `git checkout composer.lock`.
    - The `options.failOnError` is set to `false`.
- `php-lint`
    - The `command` is set to:
```
find -L . 
-path ./vendor -prune -o 
-path ./vendor_prefixed -prune -o 
-path ./node_modules -prune -o 
-path ./artifact -prune -o 
-name '*.php' -print0 | xargs -0 -n 1 -P 4 php -l
```
- `phpcs`
    - The `command` is set to `php ./vendor/squizlabs/php_codesniffer/scripts/phpcs`.

#### Overview
In your project's Gruntfile, add a section named `shell` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    compress: {
        taskName: {      // The name of your task.
            command: [], // The shell command to run.
            options: {}, // Task-specific options.
        },
    }
} )
```

#### Config
##### command
*Required*  
Type: `string`, `function`

The command you want to run or a function which returns it. Supports underscore templates.

#### Options
##### stdout
Type: `boolean`  
Default: `true`

Show stdout in the Terminal.

##### stderr
Type: `boolean`  
Default: `true`

Show stderr in the Terminal.

##### stdin
Type: `boolean`  
Default: `true`

Forward the terminal's stdin to the command.

##### failOnError
Type: `boolean`  
Default: `true`

Fail task if it encounters an error. Does not apply if you specify a `callback`.

##### stdinRawMode
Type: `boolean`  
Default: `false`

This sets `stdin` to [act as a raw device](http://nodejs.org/api/tty.html#tty_rs_setrawmode_mode).

##### callback(err, stdout, stderr, cb)
Type: `function`  
Default: `function () {}`

Lets you override the default callback with your own.

**Make sure to call the `cb` method when you're done.**

##### execOptions
Type: `object`

Specify some options to be passed to the [.exec()](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) method:

- `cwd` String *Current working directory of the child process*
- `env` Object *Environment key-value pairs*
- `setsid` Boolean
- `encoding` String *(Default: 'utf8')*
- `timeout` Number *(Default: 0)*
- `maxBuffer` Number *(Default: 200\*1024)*
- `killSignal` String *(Default: 'SIGTERM')*

#### Usage Examples
```js
grunt.initConfig( {
    shell: {
        subfolderLs: {
            command: "ls",
            options: {
                stderr: false,
                execOptions: {
                    cwd: "tasks"
                }
            }
        }
    }
} );
```

### The `uglify` task
See: [gruntjs/grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

#### Using our configuration
We implement a `js` task:
- The `options.preserveComments` value is set to `some`.
- The `options.report` value is set to `gzip`.
- The `options.sourceMap` value is read from the Grunt configuration: `developmentBuild`.
- The `files` value is set to an array with one object:
    - The `options.expand` value is set to `true`.
    - The `options.src` value is read from the Grunt configuration: `files.js`.
    - The `options.ext` value is set to `.min.js`.
    - The `options.extDot` value is set to `first`.
    - The `options.isFile` value is set to `true`.

#### Overview
In your project's Gruntfile, add a section named `uglify` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    uglify: {
        options: {},     // Global options.
        targetName: {    // The name of your target.
            options: {}, // Task-specific options.
            files: {},   // Target-specific file lists.
        },
    },
} );
```

#### Options
##### mangle
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior). [View all options here](https://github.com/mishoo/UglifyJS2#mangle-options).

##### compress
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`. [View all options here](https://github.com/mishoo/UglifyJS2#compress-options).

##### beautify
Type: `Boolean` `Object`  
Default: `false`

Turns on beautification of the generated source code. [View all options here](https://github.com/mishoo/UglifyJS2#output-options)

##### parse.expression
Type: `Boolean`  
Default: `false`

Parse a single expression, rather than a program (for parsing JSON)

##### report
Type: `string`  
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well uglify-js is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

##### sourceMap
Type: `Boolean`  
Default: `false`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

##### sourceMapName
Type: `String` `Function`  
Default: `undefined`

To customize the name or location of the generated source map, pass a string to indicate where to write the source map to. If a function is provided, the uglify destination is passed as the argument and the return value will be used as the file name.

##### sourceMapIn
Type: `String` `Function`  
Default: `undefined`

The location of an input source map from an earlier compilation, e.g. from CoffeeScript. If a function is provided, the
uglify source is passed as the argument and the return value will be used as the sourceMap name. This only makes sense
when there's one source file.

##### sourceMap.includeSources
Type: `Boolean`  
Default: `false`

Pass this flag if you want to include the content of source files in the source map as sourcesContent property.

##### sourceMap.root
Type: `String`  
Default: `undefined`

With this option you can customize root URL that browser will use when looking for sources.

If the sources are not absolute URLs after prepending of the `sourceMap.root`, the sources are resolved relative to the source map.

##### sourceMap.url
Type: `String`  
Default: `undefined`

Override the calculated value for `sourceMappingURL` in the source map. This is useful if the source map location is not relative to the base path of the minified file, i.e. when using a CDN

##### wrap
Type: `String`  
Default: `undefined`

Wrap all of the code in a closure, an easy way to make sure nothing is leaking.
For variables that need to be public `exports` and `global` variables are made available.
The value of wrap is the global variable exports will be available as.

##### output.ascii_only
Type: `Boolean`  
Default: `false`

Enables to encode non-ASCII characters as \uXXXX.

##### output.comments
Type: `Boolean` `String` `Function`  
Default: `undefined`  
Options: `false` `'all'` `'some'`

Turn on preservation of comments.

- `false` will strip all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that include a closure compiler style directive (`@preserve` `@license` `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return either `true` or `false`
- `RegExp` `'/[RegExp]/'` will preserve comments matching given RegExp or stringified RegExp

##### banner
Type: `String`  
Default: `''`

This string will be prepended to the minified output. Template strings (e.g. `<%= config.value %>`) will be expanded automatically.

##### footer
Type: `String`  
Default: `''`

This string will be appended to the minified output. Template strings (e.g. `<%= config.value %>`) will be expanded automatically.

##### ie8
Type: `Boolean`  
Default: `false`

Set this to `true` if you still care about full compliance with Internet Explorer 6-8 quirks.

##### mangle.properties
Type: `Boolean` `Object`  
Default: `false`

Turn on or off property mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_properties()` (mimicking command line behavior). [View all options here](https://github.com/mishoo/UglifyJS2#mangle-options).

##### reserveDOMProperties
Type: `Boolean`  
Default: `false`

Use this flag in conjunction with `mangle.properties` to prevent built-in browser object properties from being mangled.

##### exceptionsFiles
Type: `Array`  
Default: `[]`

Use this with `mangle.properties` to pass one or more JSON files containing a list of variables and object properties
that should not be mangled. See the [UglifyJS docs](https://www.npmjs.com/package/uglify-js) for more info on the file syntax.

##### nameCache
Type: `String`  
Default: `''`

A string that is a path to a JSON cache file that uglify will create and use to coordinate symbol mangling between
multiple runs of uglify. Note: this generated file uses the same JSON format as the `exceptionsFiles` files.

##### output.quote_style
Type: `Integer`  
Default: `0`

Preserve or enforce quotation mark style.

* `0` will use single or double quotes such as to minimize the number of bytes (prefers double quotes when both will do)
* `1` will always use single quotes
* `2` will always use double quotes
* `3` will preserve original quotation marks

#### Usage Examples
```js
grunt.initConfig( {
    uglify: {
        my_target: {
            options: {
                sourceMap: true,
                sourceMapName: "path/to/sourcemap.map"
            },
            files: {
                "dest/output.min.js": [ "src/input.js" ]
            }
        }
    }
} );
```

### The 'update-version' task
#### Using our configuration
We implement the following tasks:
- `options`
    - The `version` value is read from the Grunt configuration: `pluginVersion`.
- `readme`
    - The `options.regEx` value is set to `/(Stable tag:\s+)(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/`.
    - The `options.preVersionMatch` value is set to `$1`.
    - The `options.postVersionMatch` value is set to `$5`.
    - The `src` value is set to `readme.txt`.
- `readmeMd`
    - The `options.regEx` value is set to `/(Stable tag:\s+)(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/`.
    - The `options.preVersionMatch` value is set to `$1`.
    - The `options.postVersionMatch` value is set to `$5`.
    - The `src` value is set to `README.md`.
- `pluginFile`
    - The `options.regEx` value is set to `/(\* Version:\s+)(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/`.
    - The `options.preVersionMatch` value is set to `$1`.
    - The `options.postVersionMatch` value is set to `$5`.
    - The `src` value is read from the Grunt configuration: `pluginMainFile`.
- `initializer`
    - The `options.regEx` value is set to `(define\\( '<%= pluginVersionConstant %>'\\, \\')(\\d+(\\.\\d+){0,3})([^\\.^\\'\\d]?.*?)(\\' \\);\\n)`.
    - The `options.preVersionMatch` value is set to `$1`.
    - The `options.postVersionMatch` value is set to `$5`.
    - The `src` value is read from the Grunt configuration: `pluginMainFile`.

#### Overview
In your project's Gruntfile, add a section named `yoast_tasks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig( {
    yoast_tasks: {
        options: {},     // Task-specific options.
        your_target: {}, // Target-specific file lists and/or options.
    },
} );
```

#### Options
##### version
Type: `String`  
Default value: `''`

The string value that will be the new version string.

##### regex
Type: `String`  
Default value: `''`

A regex string that is used to find the line to be updated in the file.

##### preVersionMatch
Type: `String`  
Default value: `''`

A prefix to the version string, for example a regex capture group.

##### postVersionMatch
Type: `String`  
Default value: `''`

A postfix to the version string, for example a regex capture group.

#### Usage Example
```js
readme: {
    options: {
        version: "1.1",
        regEx: /(Stable tag: )(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/,
        preVersionMatch: "$1",
        postVersionMatch: "$5"
    },
    src: "tmp/README.md"
}
```

### The `watch` task
See: [gruntjs/grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

#### Using our configuration
We implement a `plugin` task:
- The `options.url` value is read from the `package.json`: `plugin.glotpress`.
- The `options.domainPath` value is read from the Grunt configuration: `paths.languages`.
- The `options.formats` value is set to `['mo']`.

#### Overview
In your project's Gruntfile, add a section named `watch` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    watch: {
        options: {},    // Global options.
        your_target: {  // The name of your target.
            files: [],  // Files to target.
            tasks: [],  // Tasks to perform on the targets.
            options: {} // Target-specific file lists and/or options.
        },
    },
} );
```

#### Settings
There are a number of options available. Please review the [minimatch options here](https://github.com/isaacs/minimatch#options). As well as some additional options as follows:

##### files
Type: `String|Array`

This defines what file patterns this task will watch. It can be a string or an array of files and/or minimatch patterns.

##### tasks
Type: `String|Array`

This defines which tasks to run when a watched file event occurs.

#### Options
##### spawn
Type: `Boolean`  
Default: `true`

Whether to spawn task runs in a child process. Setting this option to `false` speeds up the reaction time of the watch (usually 500ms faster for most) and allows subsequent task runs to share the same context. Not spawning task runs can make the watch more prone to failing so please use as needed.

##### interrupt
Type: `Boolean`  
Default: `false`

As files are modified this watch task will spawn tasks in child processes. The default behavior will only spawn a new child process per target when the previous process has finished. Set the `interrupt` option to true to terminate the previous process and spawn a new one upon later changes.

##### debounceDelay
Type: `Integer`  
Default: `500`

How long to wait before emitting events in succession for the same filepath and status. For example if your `Gruntfile.js` file was `changed`, a `changed` event will only fire again after the given milliseconds.

##### interval
Type: `Integer`  
Default: `100`

The `interval` is passed to `fs.watchFile`. Since `interval` is only used by `fs.watchFile` and this watcher also uses `fs.watch`; it is recommended to ignore this option. *Default is 100ms*.

##### event
Type: `String|Array`  
Default: `'all'`

Specify the type of watch events that triggers the specified task. This option can be one or many of: `'all'`, `'changed'`, `'added'` and `'deleted'`.

##### reload
Type: `Boolean`  
Default: `false`

By default, if `Gruntfile.js` is being watched, then changes to it will trigger the watch task to restart, and reload the `Gruntfile.js` changes.
When `reload` is set to `true`, changes to *any* of the watched files will trigger the watch task to restart.
This is especially useful if your `Gruntfile.js` is dependent on other files.

##### forever
Type: `Boolean`  
Default: `true`

This is *only a task level option* and cannot be configured per target. By default the watch task will duck punch `grunt.fatal` and `grunt.warn` to try and prevent them from exiting the watch process. If you don't want `grunt.fatal` and `grunt.warn` to be overridden set the `forever` option to `false`.

##### dateFormat
Type: `Function`

This is *only a task level option* and cannot be configured per target. By default when the watch has finished running tasks it will display the message `Completed in 1.301s at Thu Jul 18 2013 14:58:21 GMT-0700 (PDT) - Waiting...`. You can override this message by supplying your own function.

##### atBegin
Type: `Boolean`  
Default: `false`

This option will trigger the run of each specified task at startup of the watcher.

##### livereload
Type: `Boolean|Number|Object`  
Default: `false`

Set to `true` or set `livereload: 1337` to a port number to enable live reloading. Default and recommended port is `35729`.

If enabled a live reload server will be started with the watch task per target. Then after the indicated tasks have run, the live reload server will be triggered with the modified files.

See also how to [enable livereload on your HTML](https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html).

Passing an object to `livereload` allows listening on a specific port and hostname/IP or over https connections (by specifying `key` and `cert` paths).

##### cwd
Type: `String|Object`  
Default: `process.cwd()`

Ability to set the current working directory. Defaults to `process.cwd()`. Can either be a string to set the cwd to match files and spawn tasks or an object to set each independently.

To strip off a path before emitting events:
```js
options: {
  cwd: {
    files: 'a/path',
    event: 'a/path'
  }
}
```
This will strip off `a/path` before emitting events. This option is useful for specifying the base directory to use with livereload.

##### livereloadOnError
Type: `Boolean`  
Default: `true`  

Option to prevent the livereload if the executed tasks encountered an error. If set to `false`, the livereload will only be triggered if all tasks completed successfully.

#### Usage Examples
```js
watch: {
    css: {
        files: "**/*.sass",
        tasks: [ "sass" ],
        options: {
            livereload: true,
        },
    },
},
```

### The `wp_deploy` task
See: [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)

#### Using our configuration
We implement the following tasks:
- `trunk`
    - The `options.plugin_slug` value is read from the Grunt configuration: `pluginSlug`.
    - The `options.build_dir` value is set to `artifact`.
    - The `options.plugin_main_file` value is read from the Grunt configuration: `pluginMainFile`.
    - The `options.deploy_trunk` value is set to `true`.
    - The `options.deploy_tag` value is set to `false`.
    - The `options.max_buffer` value is set to `10000 * 1024` (about 10MB).
    - The `options.tmp_dir` value is read from the Grunt configuration: `paths.svnCheckoutDir`.
- `master`
    - The `options.plugin_slug` value is read from the Grunt configuration: `pluginSlug`.
    - The `options.build_dir` value is set to `artifact`.
    - The `options.plugin_main_file` value is read from the Grunt configuration: `pluginMainFile`.
    - The `options.deploy_trunk` value is set to `true`.
    - The `options.deploy_tag` value is set to `false`.
    - The `options.assets_dir` value is read from the Grunt configuration: `paths.assets`.
    - The `options.max_buffer` value is set to `10000 * 1024` (about 10MB).
    - The `options.tmp_dir` value is read from the Grunt configuration: `paths.svnCheckoutDir`.

#### Overview
In your project's Gruntfile, add a section named `wp_deploy` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    wp_deploy: {
        your_target: {  // The name of your target.
            options: {} // Target-specific file lists and/or options.
        }
    }
} )
```

#### Options
##### plugin_slug
Type: `String`  
Default value: `false`

Your plug-in's slug as indicated by its repository url *https://wordpress.org/plugins/{plugin-slug}*

##### plugin_main_file
Type: `String`  
Default value: `false`

Use this option if the name of your plug-in's main file (the PHP file with WordPress plugin headers) differs from the slug name. Pass the full file name with extension, e.g.: *my-plugin.php*

##### svn_user
Type: `String`  
Default value: `false`

Your WordPress repository username. If not provided, you'll be prompted for this when the task runs.

##### build_dir
Type: `String`  
Default value: `false`

The directory where the plug-in exists as you want it on the repo.

##### assets_dir
Type: `String`  
Default value: `false`

The directory where the plug-in's assets (i.e. screenshots) exist. This gets copied into the 'assets' directory in the root of your WordPress SVN repo. Typically
this directory contains your plug-in's screenshots, which you want uploaded to the WordPress repo, but do not necessary want included in the plug-in distrubted 
to users. For more details see: [https://wordpress.org/plugins/about/faq/](https://wordpress.org/plugins/about/faq/).

##### svn_url
Type: `String`  
Default value: `https://plugins.svn.wordpress.org/{plugin-slug}/`

For flexibilty this plug-in can work with other repos. Simple provide the SVN url, using `{plugin-slug}` as placeholder indicating where the plug-in slug should be.

##### max_buffer
Type: `Integer`  
Default value: `200*1024`

Sets the maximum buffer for the SVN checkout of the repo. 

##### tmp_dir
Type: `String`  
Default value: `/tmp/`

Location where your SVN repository is checked out to. **Note:** Before the the repository is checked out `<tmp_dir>/<plugin_slug>` is deleted.

##### skip_confirmation
Type: `Bool`  
Default value: `false`

If `false`, you will be asked for confirmation before commiting the plug-in to the repository. This will give you the opportunity to inspect the `trunk` in the `options.tmp_dir` to see what is being committed.

##### deploy_trunk
Type: `Bool`  
Default value: `true`

Whether to deploy to trunk. This could be set to `false` to only commit the assets directory.

##### deploy_tag
Type: `Bool`  
Default value: `true`

Whether to deploy to a tag. You will need to have set to `options.deploy_trunk` to `true`. This can set to `false` to only deploy to trunk (e.g. when only updating the 'Tested up to' value and not deploying a release).

#### Usage Examples
```js
grunt.initConfig( {
    wp_deploy: {
        deploy: { 
            options: {
                plugin_slug: "your-plugin-slug",
                svn_user: "your-wp-repo-username",
                build_dir: "build",     // Relative path to your build directory.
                assets_dir: "wp-assets" // Relative path to your assets directory (optional).
            },
        }
    },
} )
```


### The `update-changelog-with-latest-pr-texts` task
#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.useEditDistanceComapair` value is set to `true`.
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    - The `options.commitChangelog` value is set to `true`,
    - The `useANewLineAfterHeader` value is set to `true`,
	- The `defaultChangelogEntries` value is set to `""`,
	- The `daysToAddForNextRelease` value is set to `14`,
    - The `useTodayasReleaseDate` value is set to  `false`,
    - The `options.addTheseExtraFiles`is set to a empty array [ ],

#### Overview
In your project's Gruntfile, add a section named `update-changelog-with-latest-pr-texts` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-changelog-with-latest-pr-texts: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

#### Options
##### useEditDistanceCompare
Type: `Boolean`  
Default: `false`

Setting this to `true` allows the deletion duplicate line items with a Distance Compare value higher than 90.

##### pluginSlug
Type: `String`  
Default value: ``


##### commitChangelog
Type: `Boolean`  
Default: `false`

Setting this to `true` will commit the changes made to git.

##### readmeFile
Type: `String`  
Default value: null

The source and destination file to update the changelog section in.

##### releaseInChangelog
Type: `String`  
Default value: null

Regular expression to match the correct changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchChangelogHeader
Type: `String`  
Default value: null

Regular expression to match the correct the header.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### newHeadertemplate
Type: `String`  
Default value: null

Template used to create a new changelog header.

_Note: Both `VERSIONNUMBER` and `DATESTRING` will be replaced by dynamic values_

##### matchCorrectHeader
Type: `String`  
Default value: null

Regular expression to match the correct header in the changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchCorrectLines
Type: `String`  
Default value: null

Regular expression to match the correct lines in the changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchCleanedChangelog
Type: `String`  
Default value: null

Regular expression to match the cleaned (removed older entries) changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### replaceCleanedChangelog
Type: `String`  
Default value: null

Regular expression to replace the cleaned (removed older entries) changelog section with the new.

##### defaultChangelogEntries
Type: `String`  
Default value: `""`

Optional value to add default entries to a new created section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### useANewLineAfterHeader
Type: `Boolean`  
Default: `true`

Setting this will effect the format of the resulting changelog.

##### daysToAddForNextRelease
Type: `Integer`
Default: `14`

Setting this will effect the release date guessing to pick the next tuesday after 7 days before 14 (if default is used).

##### addTheseExtraFiles:
Type: Array if `strings`
Default `[]`

Setting this will add that file content (parsed) to the changelog

##### useTodayasReleaseDate:
Type `Boolean`
Default: `false`

Setting this will set the release date (if not already set) to today

##### Usages Example
```js
update-changelog-with-latest-pr-texts: {
    "wordpress-seo": {
        options: {
            readmeFile: "./readme.txt",
            releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
            matchChangelogHeader:  /[=]= Changelog ==\n\n/ig,
            newHeadertemplate: "== Changelog ==\n\n" +"= " + "VERSIONNUMBER" + " =\nRelease Date: " + "DATESTRING"  + "\n\n",
            matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|= \\d+[\.\\d]+ =|= Earlier versions =))",
            matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
            matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
            replaceCleanedChangelog: "= Earlier versions =",
            pluginSlug: "wordpress-seo",
            defaultChangelogEntries: "",
            useANewLineAfterHeader: true,
            useEditDistanceCompare: true,
            commitChangelog: false,
        },
    },
}
```

### The `get-latest-pr-texts` task
This is a support task for the `update-changelog-with-latest-pr-texts` task.

#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    
#### Overview
In your project's Gruntfile, add a section named `get-latest-pr-texts` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-changelog-with-latest-pr-texts: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

##### pluginSlug
Type: `String`  
Default value: ``

##### Usages Example
```js
get-latest-pr-texts: {
    "wordpress-seo": {
        options: {
            pluginSlug: "wordpress-seo",
        },
    },
}
```

### The `extract-extra-pr-texts-from-yoast-cli-md` task
This is a support task for the `update-package-changelog` task.

#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    - The `options.outputFile` value is set to `"tmp/extracted.md"`,
	- The `options.deleteOutputFile`value is set to `false`,
	- The `options.findThesePackages`value is set to empty array,
	- The `options.findTheseAddons`value is set to empty array,
	- The `options.outputFolder`value is set to `"tmp/"`,


#### Overview
In your project's Gruntfile, add a section named `extract-extra-pr-texts-from-yoast-cli-md` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-changelog-with-latest-pr-texts: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

##### pluginSlug
Type: `String`  
Default value: ``

##### outputFile
Type: `String`  
Default value: `"tmp/extracted.md"`

ths sets the filename, for items that are left over 
	
##### deleteOutputFile
Type: `Boolean`  
Default value: `false`

If set to `true` the outputfile will be deleted (if exists)  during initialize

##### findThesePackages
Type: `Array` of `Array` of two `strings`
Default value: `[]` 

Find these package items need items need to have this form: [`packageheader to search for`,`filename to add found item`]
	
##### findTheseAddons
Type: `Array`  of `Array` of two `strings`
Default value: `[]`

Find these plugin items need items need to have this form:  [`pluginsheader to search for`,`filename to add found item`]

##### outputFolder
Type: `String`  
Default value: `"tmp/"`


Here the files contianing the items will be written to


##### Usages Example
```js
extract-extra-pr-texts-from-yoast-cli-md: {
    "wordpress-seo": {
        options: {
            pluginSlug: "wordpress-seo",
        },
    },
}
```

### The `update-package-changelog` task
This is a task.

#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.useEditDistanceCompare`value is set to `false`
	- The `options.commitChangelog`value is set to `false`
	- The `options.useANewLineAfterHeader`value is set to `false`
	- The `options.addTheseChangeLogs`value is set to `[  ]`

#### Overview
In your project's Gruntfile, add a section named `update-package-changelog` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-package-changelog: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

##### useEditDistanceCompare
Type: `Boolean`  
Default value: `false`

##### commitChangelog
Type: `Boolean`  
Default value: `foalse`

	
##### useANewLineAfterHeader
Type: `Boolean`  
Default value: `false`

If set to `true` the outputfile will be deleted (if exists)  during initialize

##### addTheseChangeLogs
Type: `Array`  of `Array` of two `strings`
Default value: `[]` 

Find these package items need items need to have this form: [`filename to chnagelog where to add`,`filename with items to add`]
	


##### Usages Example
```js
update-package-changelog: {
    "wordpress-seo": {
        options: {
            pluginSlug: "wordpress-seo",
        },
    },
}
```



### The `build-qa-changelog` task
#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.useEditDistanceComapair` value is set to `false`.
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    - The `options.useANewLineAfterHeader` value is set to `false`.
	- The `options.outputFile` is set to `.tmp/QA-Changelog.md`.
    - The `options.pluginSlug` value is from the Grunt configuration: `pluginSlug`.
    - The `options.addTheseExtraFiles`is set to a empty array [ ],

#### Overview
In your project's Gruntfile, add a section named `build-qa-changelog` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    build-qa-changelog: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

#### Options
##### useEditDistanceCompare
Type: `Boolean`  
Default: `false`

Setting this to `true` allows the deletion of duplicate lines with a Distance Compare value higher than 90.

##### pluginSlug
Type: `String`  
Default value: ``

##### outputFile
Type: `String`  
Default value: `.tmp/QA-Changelog.md`

The destination file to write the built changelog in.

##### useANewLineAfterHeader
Type: `Boolean`  
Default: `false`

Setting this will effect the format of the resulting changelog.

##### addTheseExtraFiles:
Type: `Array` of `strings`
Default `[]`

Setting this will add that file content (parsed) to the changelog

##### Usages Example
```js
update-changelog-with-latest-pr-texts: {
    "wordpress-seo": {
        options: {
            readmeFile: ".tmp/QA-Changelog.md",
            pluginSlug: "wordpress-seo",
            useANewLineAfterHeader: false,
            useEditDistanceComapair: false,
            addTheseExtraFiles: [ ],
        },
    },
}
```

### The `download-qa-changelog` task
This is a support task for the `build-qa-changelog` task.

#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    
#### Overview
In your project's Gruntfile, add a section named `get-latest-pr-texts` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-changelog-with-latest-pr-texts: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

##### pluginSlug
Type: `String`  
Default value: ``

##### Usages Example
```js
get-latest-pr-texts: {
    "wordpress-seo": {
        options: {
            pluginSlug: "wordpress-seo",
        },
    },
}
```
### The `update-changelog-to-latest` task
#### Using our configuration
We implement the following configuration:
- `options`
    - The `options.pluginSlug` value is  from the Grunt configuration: `pluginSlug`.
    - The `options.commitChangelog` value is set to `true`,
    - The `options.useANewLineAfterHeader` value is set to `true`,
	- The `options.defaultChangelogEntries` value is set to `""`,
	- The `options.daysToAddForNextRelease` value is set to `14`,
    - The `options.useTodayasReleaseDate` value is set to  `false`,
    - The `options.changelogToInject`value is set to  `""`,

#### Overview
In your project's Gruntfile, add a section named `update-changelog-to-latest` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig( {
    update-changelog-to-latest: {
        options: {},     // Global options.
        taskName: {      // The name of your task.
            options: {}, // Task-specific options.
        }
    }
} )
```

#### Options
##### pluginSlug
Type: `String`  
Default value: ``


##### commitChangelog
Type: `Boolean`  
Default: `false`

Setting this to `true` will commit the changes made to git.

##### readmeFile
Type: `String`  
Default value: null

The source and destination file to update the changelog section in.

##### releaseInChangelog
Type: `String`  
Default value: null

Regular expression to match the correct changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchChangelogHeader
Type: `String`  
Default value: null

Regular expression to match the correct the header.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### newHeadertemplate
Type: `String`  
Default value: null

Template used to create a new changelog header.

_Note: Both `VERSIONNUMBER` and `DATESTRING` will be replaced by dynamic values_

##### matchCorrectHeader
Type: `String`  
Default value: null

Regular expression to match the correct header in the changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchCorrectLines
Type: `String`  
Default value: null

Regular expression to match the correct lines in the changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### matchCleanedChangelog
Type: `String`  
Default value: null

Regular expression to match the cleaned (removed older entries) changelog section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### replaceCleanedChangelog
Type: `String`  
Default value: null

Regular expression to replace the cleaned (removed older entries) changelog section with the new.

##### defaultChangelogEntries
Type: `String`  
Default value: `""`

Optional value to add default entries to a new created section.

_Note: `VERSIONNUMBER` will be replaced by a dynamic value_

##### useANewLineAfterHeader
Type: `Boolean`  
Default: `true`

Setting this will effect the format of the resulting changelog.

##### daysToAddForNextRelease
Type: `Integer`
Default: `14`

Setting this will effect the release date guessing to pick the next tuesday after 7 days before 14 (if default is used).

##### useTodayasReleaseDate:
Type `Boolean`
Default: `false`

Setting this will set the release date (if not already set) to today

##### changelogToInject
Type: `String`  
Default value: `""`

Setting this will replace the items whith the file content in the changelog

##### Usages Example
```js
update-changelog-to-latest: {
    "wordpress-seo": {
        options: {
            readmeFile: "./readme.txt",
            releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
            matchChangelogHeader:  /[=]= Changelog ==\n\n/ig,
            newHeadertemplate: "== Changelog ==\n\n" +"= " + "VERSIONNUMBER" + " =\nRelease Date: " + "DATESTRING"  + "\n\n",
            matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|= \\d+[\.\\d]+ =|= Earlier versions =))",
            matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
            matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
            replaceCleanedChangelog: "= Earlier versions =",
            pluginSlug: "wordpress-seo",
            defaultChangelogEntries: "",
            useANewLineAfterHeader: true,
            changelogToInject: ".tmp/currentitems.txt"
            commitChangelog: false,
        },
    },
}
```



## Release History

### 2.3
- Adds `update-changelog-to-latest` Grunt task & config.

### 2.2.1
- FIXES a issue with `update-changelog-with-latest-pr-texts.js` selecting the todays date on a hotfix. 

### 2.2
- Adds `update-package-changelog` Grunt task & config.
- Adds `extract-extra-pr-texts-from-yoast-cli-md` Grunt task & config.
- Adds features to `build-qa-changelog` to use more input files
- Adds features to `update-changelog-with-latest-pr-texts.js` to use more input files

### 2.1.2
- Fixes a issue with Z cutting of changelog lines
- Fixes a issue with the install command. Props to [chrisschwartze](ttps://github.com/chrisschwartze).

### 2.1.1
- fix issue with finding correct yoast-cli option

### 2.1
- Adds `build-qa-changelog` Grunt task & config.
- Adds `download-qa-changelog` Grunt task & config.
- Adds `get-latest-pr-texts` Grunt task & config.
- Adds `update-changelog-with-latest-pr-texts` Grunt task & config.


### 2.0.0
- Removes watch configuration for JS & CSS. From now on plugins need to have their own `watch.js` file.
- Adds Grunt config file watching.
- Fixes Config/Shell PHPCS command
- Excludes Artifact and WordPress SVN checkout from POT file generation to prevent duplicates.

### 1.6.2
- Bump version of `grunt-contrib-compress` to add node 12 support.

### 1.6.1
- No longer use `.min` when generating RTL CSS files to be consistent with non-RTL files.

### 1.6
- Fix the call to `phpcs` to be useful.
- Breaking change: rename `build` to `build-default`.

### 1.5
- Makes postcss use the new [Yoast browserslist](https://github.com/Yoast/javascript/tree/develop/packages/browserslist-config) package to determine browsers we support.
- Update autoprefixer to prevent version clashes with browserslist.

### 1.4.2
- Fixes a bug where the stable version would not be updated in README.md when running the update-version task.

### 1.4.1
- Fixes a bug where the initializer regex in the update version config would never match.
- The update-version task now accepts both strings and regexes in `options.regEx`.

### 1.4.0
- Add .min as possible extension in rtlcss.
- Move developmentBuild to grunt configuration.

### 1.3.1
- Fixes the RTL configuration.

### 1.3.0
- Adds task configurations.
- Switches to Yoast `grunt-glotpress` variant.
- Updates `grunt-sass`.
- Adds dependency: `node-sass`.

### 1.2.0
- Updates `grunt-replace`.
- Adds dependency: `cssnano`.

### 1.1.0
- Adds grunt dependencies: `grunt`, `grunt-shell`, `grunt-replace`, `load-grunt-config`.
- Adds grunt contrib dependencies: `grunt-contrib-clean`, `grunt-contrib-compress`, `grunt-contrib-copy`, `grunt-contrib-cssmin`, `grunt-contrib-imagemin`, `grunt-contrib-watch`.
- Adds linting dependencies: `grunt-phpcs`, `grunt-eslint`.
- Adds css dependencies: `grunt-postcss`, `autoprefixer`, `grunt-sass`, `grunt-rtlcss`.
- Adds translations dependencies: `grunt-glotpress`, `grunt-wp-i18n`, `grunt-checktextdomain`.
- Adds deploy dependencies: `grunt-wp-deploy`, `time-grunt`.

### 1.0.0
- Initial creation of the plugin.
- Adds unit tests.
