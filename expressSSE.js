const express = require("express");
const { Stream } = require("stream");
const { HelloReadableStream, HelloTransformStream } = require("./HelloStream");

const app = express();

app.get("/api/node", async (request, response) => {
  response.set({
    // "Content-Type": "text/event-stream",
    "Content-Type": "application/json",
  });

  let resArray = [];
  let buf = new HelloReadableStream().pipe(new HelloTransformStream());
  count = 0;
  for await (const line of buf) {
    resArray.push(line);

    console.log(line);
    console.log(resArray);
  }

  response.send(resArray);

  request.on("close", () => {
    response.end();
  });
});

app.listen(3001);
