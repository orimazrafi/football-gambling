const mongoClient = require("mongodb").MongoClient;
const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017";
let db;

async function connect(callback) {
  mongoClient.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      db = client.db("football-gambling");
      callback();
    }
  );
}
function get() {
  return db;
}
function close() {
  mongodb.close();
}
module.exports = {
  connect,
  get,
  close,
};
