const { Stream } = require("stream");

class HelloReadableStream extends Stream.Readable {
  constructor(options) {
    super(options);
    this.language = ["JavaScript", "Python", "Java", "C#"];
  }

  _read(size) {
    // console.log("_read()");
    let language;
    while ((language = this.language.shift())) {
      // console.log("language is ", language);
      if (!this.push(`Hello, ${language}\n`)) {
        //後続にデータを流す
        // console.log("Pose");
        return;
      }
    }
    // console.log("End");
    this.push(null);
  }
}

class HelloTransformStream extends Stream.Transform {
  remaining = "";
  constructor(optinos) {
    super({ objectMode: false, ...optinos });
  }

  _transform(chunk, encoding, callback) {
    // console.log("_transform()");
    const lines = (chunk + this.remaining).split(/\n/);
    this.remaining = lines.pop();
    for (const line of lines) {
      // this.push({ message: line, delay: 0 });
      this.push(line);
    }
    callback();
  }
  _flush(callback) {
    console.log("_flush()");
    // this.push({ message: this.remaining, delay: 0 });
    this.push(this.remaining);
    callback();
  }
}

class HelloWritableStream extends Stream.Writable {
  constructor(optinos) {
    super({ objectMode: false, ...optinos });
    this.count = 0;
  }
  _write(chunk, encoding, callback) {
    console.log("_write()");
    const { message, delay } = chunk;
    this.count += 1;
    // this.senders.forEach((send) => send(count, message));
    // this.sender(this.count, message);
    // try {
    //   callback(this.count, message);
    // } catch (error) {
    //   console.log(error);
    // }

    // this.count++;

    // console.log(message);
    // console.log(this.count);
    // setTimeout(() => {
    //   console.log(message);
    //   callback();
    // }, 0);
    // console.log("message is ", message);
  }
}

module.exports = {
  HelloReadableStream,
  HelloTransformStream,
  HelloWritableStream,
};
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
