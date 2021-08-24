Changes compared to 16.6

Enhancements:
* Upgrades our REST API to include individual keys/values for all of our meta tags, data and schema output. Read all about it in [this in-depth explanation about our REST API](https://yoa.st/rest-api). [#17162](https://github.com/Yoast/wordpress-seo/pull/17162)

Bugfixes:
* Fixes a bug where a database entry would be added in the indexables table every time a WooCommerce order was created.  [#17191](https://github.com/Yoast/wordpress-seo/pull/17191)
* Fixes a bug where the SEO optimization could run indefinitely when the database contained at least 25 faulty indexables without a permalink. [#17185](https://github.com/Yoast/wordpress-seo/pull/17185)
* Fixes a bug where the Advanced section and Schema tab wouldn't be visible in the metabox for Editors. Props to [jordif](https://github.com/jordif). [#17170](https://github.com/Yoast/wordpress-seo/pull/17170)

Non user facing:
* Fixes an unreleased bug where a deprecation warning was shown when calling the WordPress helper using the `YoastSEO()->helpers->wordpress` helpers surface. [#17232](https://github.com/Yoast/wordpress-seo/pull/17232)
* Fixes passing the context correctly to the presenters filter. [#17230](https://github.com/Yoast/wordpress-seo/pull/17230)
* Fixes the `cf_`, `ct_`, `ct_desc`, `tag`, `category` and `parent_title` replacement variables in the REST API. [#17229](https://github.com/Yoast/wordpress-seo/pull/17229)
* Enhances code deprecation by safely redirecting to the new version of a class. [#17228](https://github.com/Yoast/wordpress-seo/pull/17228)
* Fixes a check that attempted to use the global post for checking if a post is password protected. [#17225](https://github.com/Yoast/wordpress-seo/pull/17225)
* Fixes a bug where the post type was verified incorrectly [#17224](https://github.com/Yoast/wordpress-seo/pull/17224)
* Fixes the Yoast head API route when used with URLs including unicode characters. [#17223](https://github.com/Yoast/wordpress-seo/pull/17223)
* Adds `Meta_Tags_Context` to the `wpseo_frontend_presenters` filter. [#17215](https://github.com/Yoast/wordpress-seo/pull/17215)
* Changed the zip creation to replace "/" with "-" in branch name [#17213](https://github.com/Yoast/wordpress-seo/pull/17213)
* Added Jenkinsfile to automatically build zip files [#17208](https://github.com/Yoast/wordpress-seo/pull/17208)
* Fixes a bug where fatal errors would occur in add-ons. [#17207](https://github.com/Yoast/wordpress-seo/pull/17207)
* None needed as this only changes things for premium users. [#17195](https://github.com/Yoast/wordpress-seo/pull/17195)
* Improves documentation for the `wpseo_schema_{identifier/type}` filter. [#17186](https://github.com/Yoast/wordpress-seo/pull/17186)
* Renames the Job closing date block to Job application closing date. [#17182](https://github.com/Yoast/wordpress-seo/pull/17182)
* Introduces a WordPress helper to get the WordPress version number. [#17168](https://github.com/Yoast/wordpress-seo/pull/17168)
* Introduces the `block_categories_all` filter as an alternative to `block_categories` for users with WordPress 5.8 or higher. [#17168](https://github.com/Yoast/wordpress-seo/pull/17168)
* Cleans up some code that caused an override of the global variable $tabs. [#17164](https://github.com/Yoast/wordpress-seo/pull/17164)
* Renames `Job Posting` to `JobPosting` in the context of Schema. [#17157](https://github.com/Yoast/wordpress-seo/pull/17157)
* Removes unnecessary validation logic and constants. [#17155](https://github.com/Yoast/wordpress-seo/pull/17155)
* Moves function for checking whether plugin is network activated, and function for getting home url with a network activation check, to `url-helper.php`. [#17143](https://github.com/Yoast/wordpress-seo/pull/17143)
* Updates the Recipe ingredients block and the Recipe instructions block. [#17142](https://github.com/Yoast/wordpress-seo/pull/17142)

