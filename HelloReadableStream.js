const { Stream } = require("stream");

class HelloReadableStream extends Stream.Readable {
  constructor(options) {
    super(options);
    this.language = ["JavaScript", "Python", "Java", "C#"];
  }

  _read(size) {
    console.log("_read()");
    let language;
    while ((language = this.language.shift())) {
      if (!this.push(`Hello, ${language}\n`)) {
        //後続にデータを流す
        console.log("Pose");
        return;
      }
    }
    console.log("End");
    this.push(null);
  }
}

module.exports = HelloReadableStream;
