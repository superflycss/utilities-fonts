var fs = require("fs");
const save = require("./save");

const DOCUMENT = JSON.parse(
  fs.readFileSync("./src/main/json/google-fonts.json", "utf-8")
);
const ITEMS = DOCUMENT.items;
save(dashedFontNames(), `./src/main/snippets/names/`, 'names.js')

function dashedFontNames() {
  //================================
  //Array containing
  //each dashed font name
  //================================
  const names = [];

  ITEMS.forEach((font) => {
    //================================
    //Dasherize the font name
    //================================
    const dashedFontName = font.family.replace(/\s+/g, "-").toLowerCase();

    names.push(`'${dashedFontName}'`);
  });
  return `const names = [${names.join(",")}]`;
}
