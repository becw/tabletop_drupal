Tabletop and Handlebars.js for Drupal
==

This module provides a field that lets you pull in data from a Google Spreadsheet using Tabletop and display it using Handlebars.js.

To use this module:

* Publish your Google Spreadsheet using the "Publish to web" option in the spreadsheet's "File" menu
* In Drupal:
  * Install the module
  * Download the Tabletop and Handlebar.js libraries
  * Create a test content type
  * Add the 'Tabletop' field to the new content type
  * Create a new piece of content and paste the Google Spreadsheet URL or key into the 'key' field.

**THIS MODULE HAS SEVERAL SECURITY ISSUES. It's currently a proof-of-concept and has many bugs on top of its security issues.**

Installing Tabletop and Handlebar.js libraries in Drupal
--

Download the libraries:

* https://github.com/jsoma/tabletop
* http://handlebarsjs.com/

Place the downloaded libraries inside Drupal at <code>sites/all/libraries</code> -- if you examine the directory, you should find the actual javascript files at:

* <code>sites/all/libraries/tabletop/src/tabletop.js</code>
* <code>sites/all/libraries/handlebars.js</code>
