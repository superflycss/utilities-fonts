var fs = require("fs");
const del = require("del");
var path = require("path");
var mkdirp = require("mkdirp");

/**
 * Will delete `index.css` before saving it again.
 * @param {*} css The css string to be saved
 * @param {*} dir The directory to save to
 */
function save(css, dir, fileName) {
  fileName = fileName ? fileName : "/index.css"
  let file = path.join(dir, fileName);
  del.sync(file);
  mkdirp.sync(dir);
  fs.writeFileSync(file, css);
}
module.exports = save;