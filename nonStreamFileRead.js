const fs = require("fs");

const copyFile = (src, dest, cb) => {
  fs.readFile(src, (err, data) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(dest, data, cb);
  });
};

copyFile("./data/src.txt", "./data/dest.txt", (err) => console.log(err));
