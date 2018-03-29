# Grunt-Yoast-tasks

> The plugin that contains all custom Yoast tasks

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-yoast-tasks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( "grunt-yoast-tasks" );
```

## The 'set-version' task

### Overview
In your project's Gruntfile, add a section named `yoast_tasks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    yoast_tasks: {
        options: {
            // Task-specific options go here.
        },
           your_target: {
            // Target-specific file lists and/or options go here.
        }
    }
});
```

### Options

#### options.base
Type: `String`
Default value: `''`

The JSON file base object for the target to be in.

#### options.target
Type: `String`
Default value: `''`

The child of the options.base object to replace the version string in.

#### src
Type: `String`
Default value: `''`

The source JSON file to set the version in.

### Usage Examples

```js
packageJSON: {
	options: {
	    base: "someOrganisation",
	    target: "pluginVersion",
	},
	src: "tmp/testPackage.json",
}
```


## The 'update-version' task

### Overview
In your project's Gruntfile, add a section named `yoast_tasks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  yoast_tasks: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.version
Type: `String`
Default value: `''`

The string value that will be the new version string.

#### options.regex
Type: `String`
Default value: `''`

A regex string that is used to find the line to be updated in the file.

#### options.preVersionMatch
Type: `String`
Default value: `''`

A prefix to the version string, for example a regex capture group.
#### options.postVersionMatch
Type: `String`
Default value: `''`

A postfix to the version string, for example a regex capture group.

### Usage Example
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

## Release History
### 0.1.0
- initial creation of the plugin
- added unit tests
