const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const log = console.log;
const PORT = process.env.PORT || 8080;
const db = require("./db");

const resolvers = require("./graphQL/resolver");
const typeDefs = require("./graphQL/schema");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
  // db = await MongoClient(MONGO_URL);
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

// const morgan = require("morgan");
// const log = console.log;
// app.use(morgan("tiny"));
