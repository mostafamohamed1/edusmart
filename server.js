const StaticServer = require("static-server");

const server = new StaticServer({
  rootPath: "./dist",
  port: 8000,
});

server.start(() =>
  console.log(`Server Started On Port http://localhost:${server.port}`)
);
