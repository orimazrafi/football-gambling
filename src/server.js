const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const log = console.log;
const PORT = process.env.PORT || 8080;
const db = require("./db");

const resolvers = require("./graphQL/resolver");
const typeDefs = require("./graphQL/schema");
const CLIENT_URI = process.env.CLIENT_URI || "http://localhost:3000";
const startServer = async () => {
  const app = express();
  var corsOptions = {
    origin: CLIENT_URI,
    credentials: true,
  };

  app.use(cors(corsOptions));
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });
  db.connect(() => {
    log("app is connected to mongoDB");
  });
  app.listen({ port: PORT }, () => {
    log(`app is listening on port : ${PORT}`);
  });
};
function get() {
  return db;
}
startServer();
