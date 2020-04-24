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
      if (!res) {
        return {
          success: false,
          message: "user was not found with that id.",
          user: {},
        };
      }
      return {
        success: true,
        message: "user gamble games were fetched.",
        user: res,
      };
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
  Mutation: {
    getUserId: async (_, { user }) => {
      try {
        const { name, image, email } = user;
        const users = db.get().collection("users");
        let userRe = await users.findOne({ email: user.email });
        if (!userRe) {
          const res = await users.insertOne({ name, email, image, groups: [] });
          return {
            success: true,
            message: "user created for first!",
            user: res.ops[0],
          };
        } else {
          return {
            success: true,
            message: "user was fetched!",
            user: userRe,
          };
        }
      } catch (err) {
        return {
          success: false,
          message: err.message,
          user: userRe,
        };
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
      let groupArray = await groups.find({}).toArray();
      if (groupWithSameName)
        return {
          success: false,
          message: "Group Name Is Taken! try another one.",
          group: groupArray,
        };
      let user = await users.findOne({ _id: ObjectId(admin) });

      log(user, admin);
      if (user.groups.length > 2) {
        log(user.groups);
        return {
          success: false,
          message: "one user can't have more then 3 groups",
          group: groupArray,
        };
      }
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
      await groups.updateOne(
        { _id: ObjectId(res.ops[0]._id) },
        {
          $push: { users: { _id: "5e9ab80b36d4382cd60e29db" } },
        }
      );
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
      await users.updateOne(
        { _id: ObjectId("5e9ab80b36d4382cd60e29db") },
        {
          $push: { groups: { _id: res.ops[0]._id } },
          $set: { results: leagueObject },
        }
      );
      groupArray = await groups.find({}).toArray();
      return {
        success: true,
        message: "Group was created!",
        group: groupArray,
      };
    },
    addUserToGroup: async (_, { userToGroup }) => {
      const { userId, groupId, groupPassword } = userToGroup;
      const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      const leagueDB = db.get().collection("league");
      let user = await groups.findOne({
        _id: ObjectId(groupId),
        "users._id": userId,
      });
      if (user)
        return {
          success: false,
          message: "There is already user with that id in this group!",
        };

      let res = await groups.findOne({ _id: ObjectId(groupId) });
      if (res.password) {
        if (res.password !== groupPassword)
          return {
            success: false,
            message: "you need to provide a valid password!",
          };
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

      return await {
        success: true,
        message: "user was added to the group.",
        group: groups.find({}).toArray(),
      };
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
      return {
        success: true,
        message: "gamble was added",
        user: res,
      };
    },
  },
};
module.exports = resolvers;
