const { Stream } = require("./sampleReadableStream");
const axios = require("axios");
const useAxios = require("./testAxios");
class AsyncTransformStream extends Stream.Transform {
  remaining = "";
  constructor(optinos) {
    super({ objectMode: true, ...options });
  }

  _transform(chunk, encoding, callback) {
    console.log("transform");
    const res = useAxios(chunk.toString());
    console.log(res.data);
  }
}
