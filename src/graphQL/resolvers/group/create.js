const Store = require("../../store/index");
const GroupStore = require("../../store/group");
const UserStore = require("../../store/user");

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

  const groupWithSameName = await GroupStore.findByName(name);
  let groupArray = await await GroupStore.getAllGroups();
  if (groupWithSameName) return;
  GroupStore.response(
    false,
    "Group Name Is Taken! try another one.",
    groupArray
  );

  let user = await UserStore.findById(admin);

  if (user.groups.length > 3) {
    return GroupStore.response(
      false,
      "one user can't have more then 3 groups",
      groupArray
    );
  }
  const res = await GroupStore.add(
    name,
    image,
    limitParticipate,
    maxParticipate,
    password,
    admin,
    league
  );
  //push the monkey boot
  let monkeyId = "5e9ab80b36d4382cd60e29db";
  await GroupStore.update(res.ops[0]._id, monkeyId);

  let leagueObject = await Store.findById("league", league);

  await UserStore.update(
    res.ops[0].admin,
    res.ops[0]._id.toString(),
    leagueObject
  );
  await UserStore.update(monkeyId, res.ops[0]._id.toString(), leagueObject);

  groupArray = await GroupStore.getAllGroups();
  return GroupStore.response(true, "Group was created!", groupArray);
};
module.exports = createGroupResolver;
