const Store = require("./index");
const TITLE = "Notification Title";
const BODY = "This is an example notification";
const ICON =
  "https://res.cloudinary.com/dyloyoawh/image/upload/v1587922124/images_dbvkd0.png";
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
const updateUser = async (userId, groupId, monkey) =>
  await Store.users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
      $set: {
        results: monkey.results,
        bestScorer: monkey.bestScorer,
        winningTeam: monkey.winningTeam,
      },
    }
  );
const updateUserMessageToken = async (userId, messageToken) =>
  await Store.users().updateOne(
    { _id: ObjectId(userId) },
    {
      $set: { messageToken },
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
const addGamble = async (userId, leagueId, results, winningTeam, bestScorer) =>
  await Store.users().updateOne(
    {
      $and: [{ _id: ObjectId(userId) }, { "results._id": ObjectId(leagueId) }],
    },
    {
      $set: {
        "results.games": results,
        winningTeam,
        bestScorer,
      },
    }
  );
const getAllUsersToken = async () =>
  await Store.users().distinct("messageToken");
const setNotificationPayload = async (title, body) =>
  (payload = {
    notification: {
      title: title || TITLE,
      body: body || BODY,
      icon: ICON,
    },
  });

const getRandomIndex = (arrayLeangth) =>
  Math.floor(Math.random() * arrayLeangth);
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
  getRandomIndex,
  updateUserMessageToken,
  getAllUsersToken,
  setNotificationPayload,
  addGamble,
};
