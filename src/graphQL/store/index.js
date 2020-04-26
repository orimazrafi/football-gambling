const db = require("../../db");
let ObjectId = require("mongodb").ObjectID;

const groups = () => db.get().collection("groups");
const users = () => db.get().collection("users");
const league = () => db.get().collection("league");
const findOne = async (collection, id) =>
  await db
    .get()
    .collection(collection)
    .findOne({ _id: ObjectId(id) });
const findByEmail = async (collection, email) =>
  await db.get().collection(collection).findOne({ email });
const findByName = async (collection, name) =>
  await db.get().collection(collection).findOne({ name });
const findSubDocument = async (collection, id, subId) =>
  await db
    .get()
    .collection(collection)
    .findOne({ _id: ObjectId(id), "users._id": subId });

const getAllDocuments = (document) =>
  db.get().collection(document).find({}).toArray();
const createUser = async (name, email, image) =>
  await users().insertOne({ name, email, image, groups: [] });
const userResponse = (success, message, response) => ({
  success,
  message,
  user: response,
});
const groupResponse = (success, message, response) => ({
  success,
  message,
  group: response,
});
const leagueResponse = (success, message, response) => ({
  success,
  message,
  league: response,
});

const addGroup = async (
  name,
  image,
  limitParticipate,
  maxParticipate,
  password,
  admin,
  league
) =>
  await groups().insertOne({
    name,
    image,
    limitParticipate,
    maxParticipate,
    password,
    admin,
    users: [{ _id: admin }],
    league: { _id: league },
  });
const addLeague = async (name, image, numberOfMathces) =>
  await leagues().insertOne({
    name,
    image,
    numberOfMathces,
    games: [],
  });

const updateGroup = async (groupId, userId) =>
  await groups().updateOne(
    { _id: ObjectId(groupId) },
    {
      $push: { users: { _id: userId } },
    }
  );

const addGamble = async (userId, leagueId, results) =>
  await users().updateOne(
    {
      $and: [{ _id: ObjectId(userId) }, { "results._id": ObjectId(leagueId) }],
    },
    { $set: { "results.games": results } }
  );

const updateGame = async (leagueId, eventDate, homeTeam, awayTeam) =>
  await league().updateOne(
    { _id: ObjectId(leagueId) },
    { $push: { games: { eventDate, homeTeam, awayTeam } } }
  );

const pullFromGroup = async (groupId, userId) =>
  await groups().updateOne(
    { _id: ObjectId(groupId) },
    {
      $pull: {
        users: { _id: userId },
      },
    }
  );
const pullFromUser = async (userId, groupId) =>
  await groups().updateOne(
    { _id: ObjectId(userId) },
    {
      $pull: {
        groups: { _id: groupId },
      },
    }
  );

const updateUser = async (userId, groupId, leagueObject) =>
  await users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
      $set: { results: leagueObject },
    }
  );
const updateUserWithOutResult = async (userId, groupId) =>
  await users().updateOne(
    { _id: ObjectId(userId) },
    {
      $push: { groups: { _id: groupId } },
    }
  );

module.exports = {
  groups,
  users,
  league,
  getAllDocuments,
  findOne,
  findByEmail,
  findByName,
  createUser,
  userResponse,
  groupResponse,
  leagueResponse,
  addGroup,
  updateGroup,
  updateUser,
  findSubDocument,
  updateUserWithOutResult,
  pullFromGroup,
  pullFromUser,
  addLeague,
  updateGame,
  addGamble,
};
