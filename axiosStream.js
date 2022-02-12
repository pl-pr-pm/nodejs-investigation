const axios = require("axios");
const fs = require("fs");

// axiosにてReadable Streamを取得し、Writable Streamに流すことはできたが、Streamがオブジェクト
const twitterStream = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/",
    {
      responseType: "stream",
      // headers: { "Content-Type": "application/json" },
    }
  );

  // console.log("test");
  // console.log(typeof res.data);
  // console.log(res);
  return res.data;
};

const { Stream } = require("./sampleReadableStream");
const useAxios = require("./testAxios");
class AsyncTransformStream extends Stream.Transform {
  remaining = "";
  constructor(optinos) {
    super({ objectMode: true, ...optinos });
  }

  _transform(chunk, encoding, callback) {
    // let cc = 0;
    //console.log("transform");
    console.log(chunk.toString());
    // cc++;
    // console.log("count", cc);
    // useAxios("test").then((res) => {
    //   console.log(res.data);
    // });
  }
}

twitterStream().then((res) => {
  res.pipe(new AsyncTransformStream());
});

// 単純な出力
// twitterStream().then((res) => {
//   // let count = 0;
//   let remaining = "";
//   res.on("data", (chunk) => {
//     // console.log("count is ", count);
//     // count++;
//     console.log(chunk.toString()); // やっぱりStreamだから切れるよね
//     // console.log(chunk.toString());
//     // res.pipe(fs.createWriteStream("dest.txt"));
//     // }, <- 単位でsplitして pushするようにする？
//     // const lines = (chunk.toString() + remaining).split("},");
//     // remaining = lines.pop();
//     // for (const line of lines) {
//     //   // let lineConvert = line.replace("[", "");
//     //   // let jsonLine = lineConvert + "}";
//     //   // console.log(jsonLine);
//     //   // if (jsonLine.length === 1) {
//     //   //   break;
//     //   // }
//     //   // console.log(JSON.parse(jsonLine));
//     //   // console.log(JSON.parse(line + "\n}"));
//     //   console.log("line", line); // <- split はできたが、当たり前だが、stringなので、キーで特定の値抽出することはできない
//   });
//   // });
// });

// twitterStream().then((res) => {
//   // let count = 0;
//   let remaining = "";
//   res.on("data", (chunk) => {
//     // console.log("count is ", count);
//     // count++;
//     // console.log(chunk.toString()); // やっぱりStreamだから切れるよね
//     // console.log(chunk.toString());
//     // res.pipe(fs.createWriteStream("dest.txt"));
//     // }, <- 単位でsplitして pushするようにする？
//     // const lines = (chunk.toString() + remaining).split("},");
//     // remaining = lines.pop();
//     // console.log(remaining);
//     for (const line of lines) {
//       // let lineConvert = line.replace("[", "");
//       // let jsonLine = lineConvert + "}";
//       // console.log(jsonLine);
//       if (jsonLine.length === 1) {
//         break;
//       }
//       console.log(JSON.parse(jsonLine));
//       console.log(JSON.parse(line + "\n}"));
//       console.log("line", line); // <- split はできたが、当たり前だが、stringなので、キーで特定の値抽出することはできない
//     }
//   });
// });

//module.exports = twitterStream;
