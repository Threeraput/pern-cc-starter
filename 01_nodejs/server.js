import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("You just bilt a server in node.js");
});

server.listen(3000, () => {
  console.log("Server is runnig on port http://localhost:3000");
});
