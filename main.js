const { Stream } = require("stream");

class HelloReadableStream extends Stream.Readable {
  constructor(options) {
    super({ readableObjectMode: true, ...options });
    // this.language = ["JavaScript", "Python", "Java", "C#"];
    this.language = [
      { language: "JavaScript" },
      { language: "Python" },
      { language: "Java" },
      { language: "C#" },
    ];
  }

  _read(size) {
    console.log("_read()");
    let language;
    while ((language = this.language.shift())) {
      if (!this.push(`Hello, ${language.language}\n`)) {
        //後続にデータを流す
        console.log("Pose");
        return;
      }
    }
    console.log("End");
    this.push(null);
  }
}

class LineTransform extends stream.Transform {
  remaining = "";
  constractor(options) {
    super({ readableObjectMode: true, ...options });
  }

  _transform(chunk, encoding, callback) {
    console.log("_transform()");
  }
}
const test = async () => {
  const helloReadableStream = new HelloReadableStream();
  for await (const data of helloReadableStream) {
    console.log(data.toString());
  }
};
// helloReadableStream
//   .on("readable", () => {
//     console.log("readable");
//     let chunk;
//     while ((chunk = helloReadableStream.read()) != null) {
//       console.log({
//         data: `${chunk}`,
//       });
//     }
//   })
//   .on("end", () => console.log("end"));
test();
