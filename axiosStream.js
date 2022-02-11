const axios = require("axios");
const fs = require("fs");

const twitterStream = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/",
    {
      responseType: "stream",
    }
  );
  // console.log("res", res.data);
  console.log("test");
  console.log(typeof res.data);
  return res.data;
};

twitterStream().then((res) => {
  // console.log("res", res);
  let count = 0;
  res.on("data", (chunk) => {
    console.log("count is ", count);
    count++;
    // console.log(chunk.toString());
    res.pipe(fs.createWriteStream("dest.txt"));
  });
});

// twitterStream((res) => {
//   console.log("res", res);
// });

module.exports = twitterStream;
