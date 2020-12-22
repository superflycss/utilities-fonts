# Font utilities

## Installation

```
npm i @superflycss/utilities-fonts
```

## Usage


The Google fonts are located in individual sub packages.  For example `@superflycss/utilities-fonts/lato`.  


To import it using the following CSS declaration:
``` css
@import '@superflycss/utilities-fonts/lato';
...

```

To use the `lato` font at normal weight apply the utility
like this:

``` html
<h1 class="u-font-lato-400">A Font Lato Heading Normal Font Weight (400)</h1>
```

To use the italic `lato` font at normal weight apply the utility like this:

``` html
<h1 class="u-font-lato-400-italic">A Font Lato Heading Normal Font Weight (400)</h1>
```


Now run the build with `sfc build` and `postcss font-magician` will create the font face rules in the target build file.

## Dependency Install

This will install all dependencies
including the SuperflyCSS CLI.

```
npm run i
```

## Clone

```
git clone git@github.com:superflycss/utilities-fonts.git
```

## Build

```
npm run pub
```

## Publish

```
npm run pub
```

## Related Articles

- [Quickly Generate Google Fonts Preview](https://medium.com/@jmatix/quickly-generate-google-fonts-preview-954dc9974a62)

## Gists

This gist can be used for snippets.  It contains all the generated utlities.
- [Gists Containing All Generated Utilities](https://gist.github.com/fireflysemantics/101780f51487d055355359f33fbf1e30#file-superflycss-google-fonts-css)

## Snippets

This snippet contains `@import` statements for all the font utility pakcage.  This enables developers to quickly add imports for the fonts of their choosing. 

- [Imports for all Font Utility Packages](https://github.com/superflycss/utilities-fonts/tree/master/src/main/snippets/imports/index.css)

