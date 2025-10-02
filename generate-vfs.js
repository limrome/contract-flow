// generate-vfs.js
const fs = require("fs");
const path = require("path");
const pdfMake = require("pdfmake/build/pdfmake");
const fontsDir = path.resolve(__dirname, "fonts");

const files = fs.readdirSync(fontsDir);
const vfs = {};

files.forEach((file) => {
  const filePath = path.join(fontsDir, file);
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString("base64");
  vfs[file] = base64;
});

const output = `window.pdfMake = window.pdfMake || {}; window.pdfMake.vfs = ${JSON.stringify(vfs, null, 2)};`;

fs.writeFileSync("src/vfs_fonts.js", output);
console.log("✅ VFS успешно сгенерирован в src/vfs_fonts.js");
