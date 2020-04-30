const Store = require("./index");
let ObjectId = require("mongodb").ObjectID;

const findById = (id) => Store.findById("groups", id);
const getAllGroups = () => Store.getAllDocuments("groups");

const response = (success, message, response) => ({
  success,
  message,
  group: response,
});

const add = async (
  name,
  image,
  limitParticipate,
  maxParticipate,
  password,
  admin,
  league
) =>
  await Store.groups().insertOne({
    name,
    image,
    limitParticipate,
    maxParticipate,
    password,
    admin,
    users: [{ _id: admin }],
    league: { _id: league },
  });

const update = async (groupId, userId) =>
  await Store.groups().updateOne(
    { _id: ObjectId(groupId) },
    {
      $push: { users: { _id: userId } },
    }
  );
const findByName = async (name) => await Store.groups().findOne({ name });

const pullFromGroup = async (groupId, userId) =>
  await Store.groups().updateOne(
    { _id: ObjectId(groupId) },
    {
      $pull: {
        users: { _id: userId },
      },
    }
  );

const findSubDocument = async (id, subId) =>
  await Store.groups().findOne({ _id: ObjectId(id), "users._id": subId });

module.exports = {
  getAllGroups,
  findById,
  add,
  response,
  update,
  pullFromGroup,
  findSubDocument,
  findByName,
};
