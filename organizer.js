const fs = require("fs");
const path = require("path");

const types = {
  Images: [".jpg", ".png", ".jpeg", ".gif"],
  Documents: [".pdf", ".docx", ".txt"],
  Audio: [".mp3", ".wav"],
  Videos: [".mp4", ".mkv"]
};

const folderPath = process.argv[2];
if (!folderPath) {
  console.log("Please provide a folder path!");
  process.exit(1);
}

const files = fs.readdirSync(folderPath);

function getCategory(ext) {
  for (let type in types) {
    if (types[type].includes(ext)) return type;
  }
  return "Others";
}

files.forEach((file) => {
  const ext = path.extname(file);
  const category = getCategory(ext);

  const srcPath = path.join(folderPath, file);
  const destFolder = path.join(folderPath, category);

  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder);
  }

  const destPath = path.join(destFolder, file);
  fs.renameSync(srcPath, destPath);

  console.log(`Moved ${file} → ${category}`);
});

console.log("All files organized successfully!");
