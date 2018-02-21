# grunt-yoast-tasks

> the plugin that contains all custom yoast tasks

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

## The "set-version" task

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

The json file base object for the target to be in.

#### options.target
Type: `String`
Default value: `''`

The target to replace the version string in.

#### options.target
Type: `String`
Default value: `''`

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


## The "update-version" task

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

The string value that is used to set the new version with

#### options.regEx
Type: `String`
Default value: `''`

A regEx string that is used to find the line to be updated in the file.

#### options.preVersionMatch
Type: `String`
Default value: `''`

The part that has to come before the version.

#### options.preVersionMatch
Type: `String`
Default value: `''`

The part that has to come after the version.

### Usage Example
```js
readme: {
	options: {
	    version: "1.1",
	    regEx: /(Stable tag: )(\d+(\.\d+){0,3})([^\n^\.\d]?.*?)(\n)/,
	    preVersionMatch: "$1",
	    postVersionMatch: "$5",
	},
    src: "tmp/README.md",
},

```

## Release History
_(Nothing yet)_
