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
      // console.log("language is ", language);
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

class HelloTransformStream extends Stream.Transform {
  remaining = "";
  constructor(optinos) {
    super({ objectMode: true, ...optinos });
  }

  _transform(chunk, encoding, callback) {
    // const useAxios = require("./testAxios");

    console.log("_transform()");
    const lines = (chunk + this.remaining).split(/\n/);
    this.remaining = lines.pop();
    for (const line of lines) {
      this.push({ message: line, delay: 0 });
    }
    callback();
  }
  _flush(callback) {
    console.log("_flush()");
    this.push({ message: this.remaining, delay: 0 });
    callback();
  }
}

class HelloWritableStream extends Stream.Writable {
  constructor(optinos) {
    super({ objectMode: true, ...optinos });
  }

  _write(chunk, encoding, callback) {
    console.log("_write()");
    const { message, delay } = chunk;
    console.log(message);
    // setTimeout(() => {
    //   console.log(message);
    //   callback();
    // }, delay);
    // console.log("message is ", message);
  }
}

const readableStream = new HelloReadableStream({ highWaterMark: 0 });
readableStream
  .pipe(
    new HelloTransformStream({
      writableHighWaterMark: 0,
      readableHighWaterMark: 0,
    })
  )
  .pipe(new HelloWritableStream({ highWaterMark: 0 }));

// const readableStream = new HelloReadableStream({ highWaterMark: 64 });
// readableStream
//   .pipe(
//     new HelloTransformStream({
//       writableHighWaterMark: 64,
//       readableHighWaterMark: 64,
//     })
//   )
//   .pipe(new HelloWritableStream({ highWaterMark: 64 }));
