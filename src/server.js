// const { ApolloServer } = require("apollo-server-lambda");
import { ApolloServer, PubSub } from "apollo-server";
const log = console.log;
const PORT = process.env.PORT || 8080;

const db = require("./db");
import * as firebaseMessageInit from "./firebase";
const resolvers = require("./graphQL/resolvers/index");
const typeDefs = require("./graphQL/resources/index");
const pubsub = new PubSub();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub }),
  });
  firebaseMessageInit.connect();
  db.connect(() => {
    log("app is connected to mongoDB");
  });
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
function get() {
  return db;
}
startServer();
