const { ApolloServer } = require("apollo-server");

const log = console.log;
const PORT = process.env.PORT || 8080;
const db = require("./db");

const resolvers = require("./graphQL/resolvers/index");
const typeDefs = require("./graphQL/resources/index");
const startServer = async () => {
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
  });

  db.connect(() => {
    log("app is connected to mongoDB");
  });
  server.listen({ port: PORT }, () => {
    log(`app is listening on port : ${PORT}`);
  });
};
function get() {
  return db;
}
startServer();
