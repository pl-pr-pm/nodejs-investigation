const axios = require("axios");
const fs = require("fs");

// axiosにてReadable Streamを取得し、Writable Streamに流すことはできたが、Streamがオブジェクト
const twitterStream = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/",
    {
      responseType: "stream",
    }
  );

  console.log("test");
  console.log(typeof res.data);
  return res.data;
};

twitterStream().then((res) => {
  let count = 0;
  res.on("data", (chunk) => {
    console.log("count is ", count);
    count++;
    console.log("!!!!", chunk.toString()); // やっぱりStreamだから切れるよね
    // console.log(chunk.toString());
    res.pipe(fs.createWriteStream("dest.txt"));
    // }, <- 単位でsplitして pushするようにする？
  });
});

module.exports = twitterStream;
