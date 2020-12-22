var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
const PLI = require("@superflycss/pli");
const del = require("del");

//================================
//PARSE Google Fonts JSON
//Obtained from the Google Fonts API
//See:
//https://fireflysemantics.medium.com/obtaining-a-json-document-with-all-google-fonts-9e9ea5cbd80
//================================
const DOCUMENT = JSON.parse(
  fs.readFileSync("./src/main/json/google-fonts.json", "utf-8")
);
const ITEMS = DOCUMENT.items;

function createCSSImportSnippets() {
  //================================
  //Array containing
  //each import statement
  //================================
  const imports = [];

  ITEMS.forEach((font) => {
    //================================
    //Dasherize the font name
    //================================
    const dashedFontName = font.family.replace(/\s+/g, "-").toLowerCase();

    const cssimport = `@import "@superflycss/utilities-fonts/google/${dashedFontName}";`;
    imports.push(cssimport);
  });
  return imports.join("\n");
}

saveImportSnippets(createCSSImportSnippets());

/**
 * Will delete `index.css` before saving it again.
 * @param {*} css The css string to be saved
 */
function saveImportSnippets(css) {
  let destdir = `./src/main/snippets/imports/`;
  let file = path.join(destdir, "/index.css");
  del.sync(file);
  mkdirp.sync(destdir);
  fs.writeFileSync(file, css);
}
