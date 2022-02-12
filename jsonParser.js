const input = '{"test": "test"},{"test": "test"},';
const input2 = '{"test": "test"';
const input3 = input2 + "}";
const lines = input.split("},");
for (const line of lines) {
  let lineConvert = line.replace("[", "");
  let json = lineConvert + "}";
  // console.log(json);
  if (json.length === 1) {
    break;
  }
  console.log(JSON.parse(json));
}

// console.log(JSON.parse(input3));
