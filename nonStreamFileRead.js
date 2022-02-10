const fs = require("fs");

const copyFileWithStream = (src, dest, cb) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on("finish", cb);
};

copyFileWithStream("./data/src.txt", "./data/dest.txt", () =>
  console.log("コピー完了")
);
