const sampleReadableStream = require("./sampleReadableStream");
const readStream = new sampleReadableStream();

// readStream.on("readable", () => {
//   let chunk;
//   while ((chunk = readStream.read()) != null) {
//     // console.log(`chunk is received ${chunk}`);
//     console.log(chunk);
//   }
// });

// readStream
//   .on("data", (chunk) => {
//     console.log("loading..");
//     console.log(chunk);
//   })
//   .on("end", () => process.stdout.write("End of stream"));

const twitterStream = require("./axiosStream");

const test = async () => {
  const resStream = await twitterStream();
  resStream
    .on("data", (chunk) => {
      console.log("loading..");
      console.log(chunk);
    })
    .on("end", () => process.stdout.write("End of stream"));
};

test();
