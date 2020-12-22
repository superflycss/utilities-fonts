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
const DOCUMENT = JSON.parse(fs.readFileSync("./src/main/json/google-fonts.json", "utf-8"));
const ALL_UTILITIES = []
const ITEMS = DOCUMENT.items;
ITEMS.forEach((font) => {
  defineFontUtility(font);
});

function defineFontUtility(font) {
  //================================
  //Array containing
  //each variant instance.
  //================================
  const utilities = [];

  //================================
  //Dasherize the font name
  //================================
  const dashedFontName = font.family.replace(/\s+/g, "-").toLowerCase();

  //================================
  //Iterate over the variants
  //of the font
  //================================
  font.variants.forEach((variant) => {
    variant = variant.split(/(\d+)/);

    //================================
    //Dasherize the variant name
    //For example 700italic >> 700-italic
    //================================
    if (variant.length) {
      variant = variant.filter(Boolean).sort().join("-");
    }

    //================================
    //Normalize all variant names
    //For italic and normal the 400
    //is implied.
    //================================
    variant = variant == "italic" ? "400-italic" : variant;
    variant = variant.replace("regular", 400);
    const class_name = `.u-font-${dashedFontName}-${variant}`;
    let utility

    if (class_name.includes("italic")) {
      utility = createItalicUtility(
        class_name,
        font.family,
        variant.substring(0, 3)
      );
    } else {
      utility = createNormalUtility(
        class_name,
        font.family,
        variant.substring(0, 3)
      );
    }
    utilities.push(utility);
    ALL_UTILITIES.push(utility)

    const packageCSS = utilities.join("\n");
    const packagedir = `/google/${dashedFontName}`;
    let dir = path.join(PLI.src.main.css, packagedir);
    saveCSS(packageCSS, dir);
  });
  const ALl_CSS = ALL_UTILITIES.join('\n')
  saveCSS(ALl_CSS, PLI.src.main.css);
}

/**
 * Will delete `index.css` before saving it again.
 * @param {*} css The css string to be saved
 * @param {*} dir The directory to save to
 */
function saveCSS(css, dir) {
  let file = path.join(dir, "/index.css");
  del.sync(file);
  mkdirp.sync(dir);
  fs.writeFileSync(file, css);
}

function createNormalUtility(className, fontFamily, weight) {
  return `${className} {
          font-family: '${fontFamily}' !important;
          font-weight: ${weight} !important;
}`;
}

function createItalicUtility(className, fontFamily, weight) {
  return `${className} {
        font-family: '${fontFamily}' !important;
        font-weight: ${weight} !important;
        font-style: italic !important;
}`;
}