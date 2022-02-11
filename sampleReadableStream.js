const { Stream } = require("stream");
const axios = require("axios");
class SampleReeadableStream extends Stream.Readable {
  constructor(options) {
    super({ objectMode: true }, options);

    // super(options);
  }

  async _read(size) {
    //   //const chunk = "test. This is chunk test";
    //   const chunk = [
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //     {
    //       test: "test",
    //     },
    //     {
    //       test: "test1",
    //     },
    //     {
    //       test: "test2",
    //     },
    //   ];
    //   // console.log("chunk is", chunk);
    //   this.push(chunk, "utf-8");
    //   this.push(null);
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments/1",
      {
        // responseType: "stream",
      }
    );
    console.log("sampleReadableStream", res.data);
    this.push(res.data);
    this.push(null);
    // if (res._last) {
    //   this.push(null);
    // }
  }
}

module.exports = SampleReeadableStream;
