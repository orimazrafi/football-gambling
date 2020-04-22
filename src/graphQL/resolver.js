const db = require("../db");
let ObjectId = require("mongodb").ObjectID;
const log = console.log;

const resolvers = {
  Query: {
    groups: async () => {
      const groups = db.get().collection("groups");
      return await groups.find({}).toArray();
    },

    users: async () => {
      const users = db.get().collection("users");
      return await users.find({}).toArray();
    },
    group: async (_, { groupId, userId }) => {
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");

      if (groupId) return await groups.findOne({ _id: ObjectId(groupId) });
      let user = await users.findOne({ _id: ObjectId(userId) });
      if (user.groups.length > 0) {
        return await groups.findOne({ _id: ObjectId(user.groups[0]._id) });
      }
      return {
        message:
          "User Didn't choose any group to view neither he has group of it's own. ",
      };
    },
    leagues: async () => {
      const leagueDB = db.get().collection("league");
      return await leagueDB.find({}).toArray();
    },
    league: async (_, { leagueId }) => {
      const leagueDB = db.get().collection("league");
      let res = await leagueDB.findOne({
        _id: ObjectId(leagueId),
      });
      return res;
    },

    getUser: async (_, { userId }) => {
      const users = db.get().collection("users");
      let res = await users.findOne({ _id: ObjectId(userId) });
      return res;
    },
  },
  Group: {
    async users(parent) {
      const users = db.get().collection("users");
      return await parent.users.map(async (user) => {
        return await users.findOne({ _id: ObjectId(user._id) });
      });
    },
  },
  User: {
    async groups(parent) {
      const groups = db.get().collection("groups");
      return await parent.groups.map(async (group) => {
        return await groups.findOne({ _id: ObjectId(group._id) });
      });
    },
  },
  // League: {
  //   async groups(parent) {
  //     const groups = db.get().collection("groups");
  //     return await parent.groups.map(async (group) => {
  //       return await groups.findOne({ _id: ObjectId(group._id) });
  //     });
  //   },
  // },
  Mutation: {
    getUserId: async (_, { user }) => {
      const { name, image, email } = user;
      const users = db.get().collection("users");
      let userRe = await users.findOne({ email: user.email });
      if (!userRe) {
        const res = await users.insertOne({ name, email, image, groups: [] });
        return res.ops[0];
      } else {
        return userRe;
      }
    },

    createGroup: async (_, { group }) => {
      const {
        name,
        limitParticipate,
        maxParticipate,
        image,
        password,
        admin,
        league,
      } = group;
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      const leagueDB = db.get().collection("league");

      const groupWithSameName = await groups.findOne({ name });
      if (groupWithSameName)
        throw new Error("Group Name Is Taken! try another one.");
      const res = await groups.insertOne({
        name,
        image,
        limitParticipate,
        maxParticipate,
        password,
        admin,
        users: [{ _id: admin }],
        league: { _id: league },
      });

      //ToDo add results field!
      let leagueObject = await leagueDB.findOne({
        _id: ObjectId(league),
      });
      await users.updateOne(
        { _id: ObjectId(res.ops[0].admin) },
        {
          $push: { groups: { _id: res.ops[0]._id } },
          $set: { results: leagueObject },
        }
      );
      return await groups.find({}).toArray();
    },
    addUserToGroup: async (_, { userToGroup }) => {
      const { userId, groupId, groupPassword } = userToGroup;
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      const leagueDB = db.get().collection("league");

      let user = await groups.findOne({
        _id: groupId,
        "users._id": userId,
      });

      if (user)
        throw new Error("There is already user with that id in this group!");

      let res = await groups.findOne({ _id: ObjectId(groupId) });
      if (res.password) {
        if (res.password !== groupPassword)
          throw new Error("you need to provide a valid password!");
      }
      await groups.updateOne(
        { _id: ObjectId(groupId) },
        { $push: { users: { _id: userId } } }
      );

      let league = await leagueDB.findOne({
        _id: ObjectId(res.league._id),
      });
      let userResult = await users.findOne({ _id: ObjectId(userId) });

      if (userResult.results._id) {
        await users.updateOne(
          { _id: ObjectId(userId) },
          { $push: { groups: { _id: groupId } } }
        );
      } else {
        await users.updateOne(
          { _id: ObjectId(userId) },
          { $push: { groups: { _id: groupId } }, $set: { results: league } }
        );
      }

      return await groups.find({}).toArray();
    },
    leaveGroup: async (_, { userId, groupId }) => {
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");

      await groups.updateOne(
        { _id: ObjectId(groupId) },
        {
          $pull: {
            users: { _id: userId },
          },
        }
      );

      await users.updateOne(
        { _id: ObjectId(userId) },
        {
          $pull: {
            groups: { _id: groupId },
          },
        }
      );
      let res = await users.findOne({ _id: ObjectId(userId) });
      return res;
    },
    createLeague: async (_, { league }) => {
      const { name, image, numberOfMathces } = league;
      const leagueDB = db.get().collection("league");
      const res = await leagueDB.insertOne({
        name,
        image,
        numberOfMathces,
        games: [],
      });
      return res.ops[0];
    },
    addGameToLeague: async (_, { game }) => {
      const { eventDate, homeTeam, awayTeam } = game;
      const leagueDB = db.get().collection("league");
      await leagueDB.updateOne(
        { _id: ObjectId("5e9b0436ad4872327d1d4f51") },
        { $push: { games: { eventDate, homeTeam, awayTeam } } }
      );
      let res = await leagueDB.findOne({
        _id: ObjectId("5e9b0436ad4872327d1d4f51"),
      });
      return res;
    },
    addGamble: async (_, { gamble }) => {
      const { userId, leagueId, results } = gamble;
      const users = db.get().collection("users");
      await users.updateOne(
        {
          $and: [
            { _id: ObjectId(userId) },
            { "results._id": ObjectId(leagueId) },
          ],
        },
        { $set: { "results.games": results } }
      );
      let res = await users.findOne({ _id: ObjectId(userId) });
      return res;
    },
  },
};
module.exports = resolvers;
