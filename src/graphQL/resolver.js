const db = require("../db");
var ObjectId = require("mongodb").ObjectID;
const log = console.log;

const resolvers = {
  Query: {
    groups: async () => {
      console.log("d");
      const groups = db.get().collection("groups");
      const res = await groups.find({}).toArray();
      return res;
    },
    group: async (_, { groupId }) => {
      console.log("d", _, groupId);
      const groups = db.get().collection("groups");
      const res = await groups.findOne({ _id: ObjectId(groupId) });
      return res;
    },
    users: async (parent, args) => {
      const users = db.get().collection("users");
      const res = await users.find({}).toArray();

      return res;
    },
    user: async (_, { groupId }) => {
      console.log("_s");
      const users = db.get().collection("users");

      const res = await users.findOne({ _id: ObjectId(groupId) });
      console.log(res);
      return res;
    },
  },
  Mutation: {
    createGroup: async (_, { group }) => {
      const { name, maxParticipante, image, password, admin } = group;

      const groups = db.get().collection("groups");
      const users = db.get().collection("users");

      const groupRes = await groups.findOne({ name });
      if (groupRes) return { message: "Group Name Is Taken!" };
      const res = await groups.insertOne({
        name,
        image,
        maxParticipante,
        password,
        admin,
        users: [{ _id: admin }],
      });
      await users.updateOne(
        { _id: ObjectId(res.ops[0].admin) },
        { $push: { groups: { _id: res.ops[0]._id } } }
      );
      return res.ops[0];
    },
    addUserToGroup: async (_, { userId, groupId }) => {
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      let userRes = await groups.findOne({
        _id: ObjectId(groupId),
        "users._id": userId,
      });
      if (userRes) return;
      await groups.updateOne(
        { _id: ObjectId(groupId) },
        { $push: { users: { _id: userId } } }
      );
      await users.updateOne(
        { _id: ObjectId(userId) },
        { $push: { groups: { _id: groupId } } }
      );
      const res = await users.findOne({ _id: ObjectId(userId) });
      return res;
    },
    createUser: async (_, { user }) => {
      const users = db.get().collection("users");
      const { name, image } = user;

      const res = await users.insertOne({ name, image, groups: [] });
      console.log(res.ops[0]);
      return res.ops[0];
    },
  },
};
module.exports = resolvers;
