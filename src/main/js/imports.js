var fs = require("fs");
const save = require('./save')

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
save(createCSSImportSnippets(), `./src/main/snippets/imports/` )

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

