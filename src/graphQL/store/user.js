const Store = require("./index");
let ObjectId = require("mongodb").ObjectID;

const findById = (id) => Store.findById("users", id);
const getAllUsers = () => Store.getAllDocuments("users");
const findByEmail = async (email) => await Store.users().findOne({ email });

const response = (success, message, response) => ({
  success,
  message,
  user: response,
});

const create = async (name, email, image) =>
  await Store.users().insertOne({ name, email, image, groups: [] });

const update = async (userId, groupId, leagueObject) => {
  await Store.users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
      $set: { results: leagueObject },
    }
  );
};
const updateUserWithOutResult = async (userId, groupId) =>
  await Store.users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
    }
  );
const updateUser = async (userId, groupId, league) =>
  await Store.users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
    }
  );
const pullFromUser = async (userId, groupId) =>
  await Store.groups().updateOne(
    { _id: ObjectId(userId) },
    {
      $pull: {
        groups: { _id: groupId },
      },
    }
  );
module.exports = {
  getAllUsers,
  updateUser,
  create,
  findById,
  response,
  pullFromUser,
  update,
  updateUserWithOutResult,
  findByEmail,
};
