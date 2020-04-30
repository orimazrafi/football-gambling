const db = require("../../db");
let ObjectId = require("mongodb").ObjectID;

const groups = () => db.get().collection("groups");
const users = () => db.get().collection("users");
const league = () => db.get().collection("league");

const getAllDocuments = (document) =>
  db.get().collection(document).find({}).toArray();

const findById = async (collection, id) =>
  await db
    .get()
    .collection(collection)
    .findOne({ _id: ObjectId(id) });

module.exports = {
  groups,
  users,
  league,
  getAllDocuments,
  findById,
};
