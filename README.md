# Font utilities

[![Greenkeeper badge](https://badges.greenkeeper.io/superflycss/utilities-fonts.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/superflycss/utilities-fonts.svg?branch=master)](https://travis-ci.org/superflycss/utilities-fonts)

## Installation

See [Installation](https://github.com/superflycss/superflycss/#installation).

## Usage

In general see [Usage](https://github.com/superflycss/superflycss/#usage).  

The google font utilities must be imported one by one.  The reason for this is that
that browser performance is sensitive to the number of custom fonts loaded.  For example
if all Google fonts were loaded for all possible font weight values the page usually crashes or becomes completely unresposive.

To load the top level module and the `lato`  font first install `npm i -S @superflycss/utilities-fonts` and then:

``` css
@import '@superflycss/utilities-fonts';
@import '@superflycss/utilities-fonts/u-font-lato';

...

```

Now run the build with `sfc build` and `postcss font-magician` will have created font face rules for the `lato` font across the range of [SuperflyCSS Font Variable](https://github.com/superflycss/variables-fonts)  sizes and weights.

## Distribution

There is a script that generates the Google Font imports in `src/main/js/index.js`.  
Make sure the [SuperflyCSS CLI]() is installed.

```
git clone git@github.com:superflycss/utilities-fonts.git
sfc dist
node src/main/js/index.js
npm publish
```



## Tests

[Superfly CSS Utilities Fonts Tests](https://superflycss.github.io/utilities-fonts/target/test/html/)
