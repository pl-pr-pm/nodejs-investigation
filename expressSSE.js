const express = require("express");
const { Stream } = require("stream");
const { HelloReadableStream, HelloTransformStream } = require("./HelloStream");

const app = express();

app.get("/api/node", (request, response) => {
  response.set({
    // "Content-Type": "text/event-stream",
    "Content-Type": "application/json",
  });
  const send = (id, data) => {
    response.write(`id: 2\ndata: ` + data + `\n\n`);
  };

  let resArray = [];
  let buf = new HelloReadableStream().pipe(new HelloTransformStream());
  count = 0;
  buf.on("data", (chunk) => {
    count += 1;
    send(count, chunk);
    console.log(resArray);
  });

  request.on("close", () => {
    response.end();
  });
});

app.listen(3001);
