const axios = require("axios");
const http = require("http");

// http.get("http://localhost:3000/auth/fromAxios", (res) => {
//   res.on("data", (chunk) => {
//     console.log(chunk);
//   });
// });

const useAxios = async (path) => {
  return await axios.get(`http://localhost:3000/auth/${path}`);
};

// useAxios("test").then((res) => {
//   console.log(res.data);
// });

module.exports = useAxios;
