const db = require("../db");
// let ObjectId = require("mongodb").ObjectID;
const Store = require("../graphQL/store/index");
const log = console.log;

const resolvers = {
  Query: {
    groups: async () => {
      return await Store.getAllDocuments("groups");
    },
    users: async () => {
      return await Store.getAllDocuments("users");
    },
    group: async (_, { groupId, userId }) => {
      if (groupId) return await Store.findOne("groups", groupId);
      let user = await Store.findOne("users", userId);
      if (user.groups.length > 0) {
        return await Store.findOne("groups", user.groups[0]._id);
      }
      return {
        message:
          "User Didn't choose any group to view neither he has group of it's own. ",
      };
    },
    leagues: async () => {
      return await Store.getAllDocuments("league");
    },
    league: async (_, { leagueId }) => {
      // const leagueDB = db.get().collection("league");
      // let res = await leagueDB.findOne({
      //   _id: ObjectId(leagueId),
      // });
      // return res;
      return await Store.findOne("league", leagueId);
    },

    getUser: async (_, { userId }) => {
      // const users = db.get().collection("users");
      // let res = await users.findOne({ _id: ObjectId(userId) });
      let res = await Store.findOne("users", userId);
      if (!res) {
        return Store.userResponse(
          false,
          "user was not found with that id.",
          {}
        );
        // return {
        //   success: false,
        //   message: "user was not found with that id.",
        //   user: {},
        // };
      }
      return Store.userResponse(true, "user gamble games were fetched.", res);

      // return {
      //   success: true,
      //   message: "user gamble games were fetched.",
      //   user: res,
      // };
    },
  },
  Group: {
    async users(parent) {
      // const users = db.get().collection("users");
      return await parent.users.map(async (user) => {
        return await Store.findOne("users", user._id);
        //  await users.findOne({ _id: ObjectId(user._id) });
      });
    },
  },
  User: {
    async groups(parent) {
      // const groups = db.get().collection("groups");
      return await parent.groups.map(async (group) => {
        return await Store.findOne("groups", group._id);
        // await groups.findOne({ _id: ObjectId(group._id) });
      });
    },
  },
  Mutation: {
    getUserId: async (_, { user }) => {
      try {
        const { name, image, email } = user;
        // const users = db.get().collection("users");
        // let userRe = await users.findOne({ email: user.email });
        let userResponse = Store.findByEmail("users", email);
        // log(user);
        if (!userResponse) {
          // const res = await users.insertOne({ name, email, image, groups: [] });
          const firstLoggedUser = await Store.initialUser(name, email, image);
          return Store.userResponse(
            true,
            "user created for first!",
            firstLoggedUser.ops[0]
          );
          // {
          //   success: true,
          //   message: "user created for first!",
          //   user: firstLoggedUser.ops[0],
          // };
        } else {
          return Store.userResponse(true, "user was fetched!", userResponse);
          // return {
          //   success: true,
          //   message: "user was fetched!",
          //   user,
          // };
        }
      } catch (err) {
        return Store.userResponse(false, err.message, userResponse);
        // return {
        //   success: false,
        //   message: err.message,
        //   user: userRe,
        // };
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
      // const groups = db.get().collection("groups");
      // const users = db.get().collection("users");
      // const leagueDB = db.get().collection("league");

      const groupWithSameName = await Store.findByName("groups", name);
      // groups.findOne({ name });
      let groupArray = await Store.getAllDocuments("groups");
      // groups.find({}).toArray();
      if (groupWithSameName) return;
      Store.groupResponse(
        false,
        "Group Name Is Taken! try another one.",
        groupArray
      );
      // {
      //   success: false,
      //   message: "Group Name Is Taken! try another one.",
      //   group: groupArray,
      // };
      let user = await Store.findOne("users", admin);
      // users.findOne({ _id: ObjectId(admin) });

      // log(user, admin);
      if (user.groups.length > 3) {
        // log(user.groups);
        return Store.groupResponse(
          false,
          "one user can't have more then 3 groups",
          groupArray
        );

        //  {
        //   success: false,
        //   message: "one user can't have more then 3 groups",
        //   group: groupArray,
        // };
      }
      const res = await Store.addGroup(
        name,
        image,
        limitParticipate,
        maxParticipate,
        password,
        admin,
        league
      );

      // await groups.insertOne({
      //   name,
      //   image,
      //   limitParticipate,
      //   maxParticipate,
      //   password,
      //   admin,
      //   users: [{ _id: admin }],
      //   league: { _id: league },
      // });
      await Store.updateGroup(res.ops[0]._id, "5e9ab80b36d4382cd60e29db");
      // await groups.updateOne(
      //   { _id: ObjectId(res.ops[0]._id) },
      //   {
      //     $push: { users: { _id: "5e9ab80b36d4382cd60e29db" } },
      //   }
      // );

      let leagueObject = await Store.findOne("league", league);
      // let leagueObject
      //  = await leagueDB.findOne({
      //   _id: ObjectId(league),
      // });
      await Store.updateUser(res.ops[0].admin, res.ops[0]._id, leagueObject);
      //update the monkey
      await Store.updateUser(
        "5e9ab80b36d4382cd60e29db",
        res.ops[0]._id,
        leagueObject
      );
      // await users.updateOne(
      //   { _id: ObjectId(res.ops[0].admin) },
      //   {
      //     $push: { groups: { _id: res.opfs[0]._id } },
      //     $set: { results: leagueObject },
      //   }
      // );
      // await users.updateOne(
      //   { _id: ObjectId("5e9ab80b36d4382cd60e29db") },
      //   {
      //     $push: { groups: { _id: res.ops[0]._id } },
      //     $set: { results: leagueObject },
      //   }
      // );
      groupArray = await Store.getAllDocuments("groups");
      return Store.groupResponse(true, "Group was created!", groupArray);
      // {
      //   success: true,
      //   message: "Group was created!",
      //   group: groupArray,
      // };
    },
    addUserToGroup: async (_, { userToGroup }) => {
      const { userId, groupId, groupPassword } = userToGroup;
      // const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      // const leagueDB = db.get().collection("league");
      // let user = await groups.findOne({
      //   _id: ObjectId(groupId),
      //   "users._id": userId,
      // });
      let group = await Store.getAllDocuments("groups");
      let user = await Store.findSubDocument("groups", groupId, userId);
      if (user)
        return Store.groupResponse(
          false,
          "There is already user with that id in this group!",
          group
        );
      // return {
      //   success: false,
      //   message: "There is already user with that id in this group!",
      // };

      let res = await Store.findOne("groups", groupId);
      // await groups.findOne({ _id: ObjectId(groupId) });
      if (res.password) {
        if (res.password !== groupPassword)
          return Store.groupResponse(
            false,
            "you need to provide a valid password!",
            group
          );
        // return {
        //   success: false,
        //   message: "you need to provide a valid password!",
        // };
      }
      await Store.updateGroup(groupId, userId);
      // await groups.updateOne(
      //   { _id: ObjectId(groupId) },
      //   { $push: { users: { _id: userId } } }
      // );
      // let league = await leagueDB.findOne({
      //   _id: ObjectId(res.league._id),
      // });
      let league = await Store.findOne("league", res.league._id);
      let userResult = await users.findOne({ _id: ObjectId(userId) });

      if (userResult.results._id) {
        await Store.updateUserWithOutResult(userId, groupId);
        // await users.updateOne(
        //   { _id: ObjectId(userId) },
        //   { $push: { groups: { _id: groupId } } }
        // );
      } else {
        await Store.updateUser(userId, groupId, league);
        // users.updateOne(
        //   { _id: ObjectId(userId) },
        //   { $push: { groups: { _id: groupId } }, $set: { results: league } }
        // );
      }

      return await Store.groupResponse(
        true,
        "user was added to the group.",
        Store.getAllDocuments("groups")
      );

      // await {
      //   success: true,
      //   message: "user was added to the group.",
      //   group: groups.find({}).toArray(),
      // };
    },
    leaveGroup: async (_, { userId, groupId }) => {
      // const groups = db.get().collection("groups");
      const users = db.get().collection("users");
      Store.pullFromGroup(groupId);
      await Store.pullFromGroup(groupId, userId);
      //  groups.updateOne(
      //   { _id: ObjectId(groupId) },
      //   {
      //     $pull: {
      //       users: { _id: userId },
      //     },
      //   }
      // );
      await Store.pullFromUser(userId, groupId);

      // await users.updateOne(
      //   { _id: ObjectId(userId) },
      //   {
      //     $pull: {
      //       groups: { _id: groupId },
      //     },
      //   }
      // );
      // let res = await
      // users.findOne({ _id: ObjectId(userId) });
      return Store.findOne("users", userId);

      // res;
    },
    createLeague: async (_, { league }) => {
      const { name, image, numberOfMathces } = league;
      // const leagueDB = db.get().collection("league");
      const res = await Store.addLeague(name, image, numberOfMathces);
      // const res = await leagueDB.insertOne({
      //   name,
      //   image,
      //   numberOfMathces,
      //   games: [],
      // });
      return res.ops[0];
    },
    addGameToLeague: async (_, { game }) => {
      const { eventDate, homeTeam, awayTeam } = game;
      // const leagueDB = db.get().collection("league");
      await Store.updateGame(
        "5e9b0436ad4872327d1d4f51",
        eventDate,
        homeTeam,
        awayTeam
      );
      // await leagueDB.updateOne(
      //   { _id: ObjectId("5e9b0436ad4872327d1d4f51") },
      //   { $push: { games: { eventDate, homeTeam, awayTeam } } }
      // );
      // let res =await Store.findOne("league","5e9b0436ad4872327d1d4f51")
      // let res = await leagueDB.findOne({
      //   _id: ObjectId("5e9b0436ad4872327d1d4f51"),
      // });
      return await Store.findOne("league", "5e9b0436ad4872327d1d4f51");
    },
    addGamble: async (_, { gamble }) => {
      const { userId, leagueId, results } = gamble;
      // const users = db.get().collection("users");
      await Store.addGamble(userId, leagueId, results);
      // await users.updateOne(
      //   {
      //     $and: [
      //       { _id: ObjectId(userId) },
      //       { "results._id": ObjectId(leagueId) },
      //     ],
      //   },
      //   { $set: { "results.games": results } }
      // );
      let res = await Store.findOne("users", userId);
      // await users.findOne({ _id: ObjectId(userId) });
      return {
        success: true,
        message: "gamble was added",
        user: res,
      };
    },
  },
};
module.exports = resolvers;
