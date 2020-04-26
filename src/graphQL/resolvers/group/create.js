const Store = require("../../store/index");
/**
 * if args.id - return author by id as list
 * else - return sll authors as list
 */
const createGroupResolver = async (obj, args, req) => {
  const {
    name,
    limitParticipate,
    maxParticipate,
    image,
    password,
    admin,
    league,
  } = args.group;

  const groupWithSameName = await Store.findByName("groups", name);
  let groupArray = await Store.getAllDocuments("groups");
  if (groupWithSameName) return;
  Store.groupResponse(
    false,
    "Group Name Is Taken! try another one.",
    groupArray
  );

  let user = await Store.findOne("users", admin);

  if (user.groups.length > 3) {
    return Store.groupResponse(
      false,
      "one user can't have more then 3 groups",
      groupArray
    );
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

  await Store.updateGroup(res.ops[0]._id, "5e9ab80b36d4382cd60e29db");

  let leagueObject = await Store.findOne("league", league);

  await Store.updateUser(res.ops[0].admin, res.ops[0]._id, leagueObject);
  //monkey
  await Store.updateUser(
    "5e9ab80b36d4382cd60e29db",
    res.ops[0]._id,
    leagueObject
  );

  groupArray = await Store.getAllDocuments("groups");
  return Store.groupResponse(true, "Group was created!", groupArray);
};
module.exports = createGroupResolver;
