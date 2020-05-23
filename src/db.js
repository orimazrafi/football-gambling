import mongoClient from "mongodb";
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017";
let db;

async function connect(callback) {
  mongoClient.MongoClient.connect(
    MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      db = client.db(process.env.DATABASE_NAME || "football-gambling");
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
