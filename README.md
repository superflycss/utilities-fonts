# Font utilities

[![Greenkeeper badge](https://badges.greenkeeper.io/superflycss/utilities-fonts.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/superflycss/utilities-fonts.svg?branch=master)](https://travis-ci.org/superflycss/utilities-fonts)

## Installation

See [Installation](https://github.com/superflycss/superflycss/#installation).

## Usage

General [usage instructions](https://github.com/superflycss/superflycss/#usage).  

The Google fonts are located in individual sub packages.  For example '@superflycss/utilities-fonts/lato'.  The reason for this is
that browser performance is sensitive to the number of custom fonts loaded.  For example when all Google fonts are loaded for all possible font weight values the page usually crashes or becomes completely unresposive.

To load the top level module and the `lato`  font first install `npm i -S @superflycss/utilities-fonts` and then:

``` css
@import '@superflycss/utilities-fonts';
@import '@superflycss/utilities-fonts/lato';

...

```

``` html
<h1 class="u-font-lato">A Font Lato Heading!</h1>
<h1 class="u-font-lato-fw800">A Bold Font Lato Heading!</h1>
<h1 class="u-font-lato-fs800-fw800">A Big and Bold Font Lato Heading!</h1>
```

Now run the build with `sfc build` and `postcss font-magician` will have created font face rules for the `lato` font across the range of [SuperflyCSS Font Variable](https://github.com/superflycss/variables-fonts)  sizes and weights.

## Distribution

A custom script `src/main/js/index.js` is used to generate the Google Font utility subpackages.  Running the script creates a subpackage (Directory) for each google font in `./dist`.  Note that the subpackages do not generate into `src/main/css` in order to keep this directory clean and workable, and to avoid committing the 800+ generated modules to the github repository.

```
git clone git@github.com:superflycss/utilities-fonts.git
node src/main/js/index.js
sfc dist
cd dist
npm publish
```


## Tests

[Superfly CSS Utilities Fonts Tests](https://superflycss.github.io/utilities-fonts/target/test/html/)
