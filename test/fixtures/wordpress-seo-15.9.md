# Yoast/wordpress-seo: 15.9 - 30 changelog items

[Yoast/wordpress-seo]

Non user facing:

* Bump JS packages [#16686](https://github.com/Yoast/wordpress-seo/pull/16686)
* Puts the schema blocks integration behind a feature flag. [#16676](https://github.com/Yoast/wordpress-seo/pull/16676)
* Bumps `@yoast/schema-blocks` to `1.4.0-rc2`. [#16671](https://github.com/Yoast/wordpress-seo/pull/16671)
* Fixes a bug where the plugin name was always shown as `Yoast SEO` in the taxonomy metabox in Internet Explorer, also for users of Yoast SEO Premium. [#16658](https://github.com/Yoast/wordpress-seo/pull/16658)
* Adds a helper function to retrieve the plugin name, and simplifies the code in several places by calling this function. [#16658](https://github.com/Yoast/wordpress-seo/pull/16658)
* Bumps JS packages. [#16655](https://github.com/Yoast/wordpress-seo/pull/16655)
* Puts the recipe schema blocks behind a feature flag. [#16650](https://github.com/Yoast/wordpress-seo/pull/16650)
* Hides debug logging behind an abstraction; default to logging only errors. [#16648](https://github.com/Yoast/wordpress-seo/pull/16648)
* Get the translatable strings from the schema blocks package [#16647](https://github.com/Yoast/wordpress-seo/pull/16647)
* Bumps JS packages. [#16642](https://github.com/Yoast/wordpress-seo/pull/16642)
* Moves some schema blocks related CSS to Premium. [#16641](https://github.com/Yoast/wordpress-seo/pull/16641)
* Adds filter to apply hidden fields from addons to Elementor integration. [#16626](https://github.com/Yoast/wordpress-seo/pull/16626)
* Adds selectors for the editorContext editor type. [#16626](https://github.com/Yoast/wordpress-seo/pull/16626)
* Adds a isElementorEditor boolean to the redux store. [#16626](https://github.com/Yoast/wordpress-seo/pull/16626)
* Added extra CSS for the schema template blocks. [#16621](https://github.com/Yoast/wordpress-seo/pull/16621)
* Refactors the light switch toggle by introducing a presenter class. [#16613](https://github.com/Yoast/wordpress-seo/pull/16613)
* Fixes a fatal that would occur in development versions of the plugin when activating or deactivating one of our addons. [#16608](https://github.com/Yoast/wordpress-seo/pull/16608)
* Removes the loading of the Premium structured data block templates from the Free code. [#16607](https://github.com/Yoast/wordpress-seo/pull/16607)
* Adds a schema blocks analysis check in the editor's general sidebar and the pre-publishing check when schema blocks are present in the post. [#16598](https://github.com/Yoast/wordpress-seo/pull/16598)
* Introduces "New" badges and Help link in a Badge_Presenter class and a Help_Link_Presenter class. [#16597](https://github.com/Yoast/wordpress-seo/pull/16597)
* Adds ability to render disabled form elements. [#16595](https://github.com/Yoast/wordpress-seo/pull/16595)
* Removes the `address` block and schema templates from Free (they are now in Premium). [#16582](https://github.com/Yoast/wordpress-seo/pull/16582)
* Stores schema block validation in the yoast-seo/editor store. [#16573](https://github.com/Yoast/wordpress-seo/pull/16573)
* Replaces the CSS for the schema blocks with an CSS-import from the schema-blocks monorepo package.  [#16476](https://github.com/Yoast/wordpress-seo/pull/16476)
* Adds a way to inject Schema IDs into Schema produced by our Schema blocks. [#16470](https://github.com/Yoast/wordpress-seo/pull/16470)
* Implements the schema data generated from the schema blocks [#16410](https://github.com/Yoast/wordpress-seo/pull/16410)
* Fixes a bug where the templates aren't parsed correctly [#16397](https://github.com/Yoast/wordpress-seo/pull/16397)
* Adds the possibility to load the premium schema-templates. [#16302](https://github.com/Yoast/wordpress-seo/pull/16302)
* Merges the schema feature branch into trunk. The feature is behind a feature-flag (`YOAST_SEO_SCHEMA_BLOCKS`). [#16054](https://github.com/Yoast/wordpress-seo/pull/16054)

Enhancements:

* Performance: prevents database queries for the homepage indexable. [#16637](https://github.com/Yoast/wordpress-seo/pull/16637)
* Improves interoperability and consistency in database queries. [#16580](https://github.com/Yoast/wordpress-seo/pull/16580)
* Replaces the image uploads with the new ImageSelect component. [#16575](https://github.com/Yoast/wordpress-seo/pull/16575)

Bugfixes:

* Fixes a bug where the disabled style of the switch toggles didn't look right. [#16606](https://github.com/Yoast/wordpress-seo/pull/16606)

