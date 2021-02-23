# Yoast/wordpress-seo: 16.0 - 8 changelog items

[Yoast/wordpress-seo]

Non user facing:

* Bump JS packages [#16687](https://github.com/Yoast/wordpress-seo/pull/16687)
*  Some initialization in the plugin is no longer performed on the `plugins_loaded` hook but rather as soon as the file loads. This will make the initialization overall more secure and reliable. [#16677](https://github.com/Yoast/wordpress-seo/pull/16677)
* The Migration_Runner class now accepts an optional `$version` argument to the `run_migrations` function allowing it to be used in addons. [#16675](https://github.com/Yoast/wordpress-seo/pull/16675)
* Fixes a bug where a deprecation notice would be shown when in a WordPress development environment and visiting a page. [#16660](https://github.com/Yoast/wordpress-seo/pull/16660)
* Adds the possibility to insert permanent dismissable Alerts. [#16643](https://github.com/Yoast/wordpress-seo/pull/16643)
* Removes deprecated functions and classes that were deprecated before version 13.0 [#16604](https://github.com/Yoast/wordpress-seo/pull/16604)

Bugfixes:

* Fixes a bug where invalid breadcrumbs may show PHP warnings.  [#16657](https://github.com/Yoast/wordpress-seo/pull/16657)
* Fixes a fatal error when a post ancestor is not an indexable. [#16656](https://github.com/Yoast/wordpress-seo/pull/16656)

