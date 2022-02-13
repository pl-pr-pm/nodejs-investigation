const express = require('express');
const { Stream } = require('stream');
const readableStream = require('./HelloStream');
let sseId = 1;
let sseSenders = [];

const app = express();

app.get('/api/test', (request, response) => {
  request.socket.setTimeout(0);
  response.set({
    'Content-Type': 'text/event-stream',
  });
  const send = (id, data) => {
    response.write(`id: ${id}\ndata: ${data}\n\n`);
    sseSenders.push(send);
  };
  // send(sseId, 'Hello');
  // while (true) {

  //   console.log('in loop ');
  // }

  send(sseId, 'Hello');

  request.on('close', () => {
    response.end();
  });
});

async function onUpdatesSSE() {
  sseId += 1;
  const data = 'updated';
  let chunk;
  for await (const line of new readableStream()) {
    sseSenders.forEach((send) => send(sseId, line));
  }
}

app.get('/api/update', async (request, response) => {
  await onUpdatesSSE();
  response.end();
});
app.listen(3000);
