const Store = require("../../store/index");
import GroupStore from "../../store/group";
const UserStore = require("../../store/user");
const MAXIMUM_GROUPS_WHICH_USER_IS_ADMIN = 2;
const MONKEY_ID = "5e9ab80b36d4382cd60e29db";
export const createGroupResolver = async (obj, args, req) => {
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

  let numberOfgroupWhichUserIsAdmin = 0;
  const groups = await GroupStore.getAllGroups();
  await groups.forEach(async (group) => {
    if (group.admin === user._id.toString()) {
      numberOfgroupWhichUserIsAdmin++;
    }
  });
  if (numberOfgroupWhichUserIsAdmin > MAXIMUM_GROUPS_WHICH_USER_IS_ADMIN) {
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
  await GroupStore.update(res.ops[0]._id, MONKEY_ID);

  let leagueObject = await Store.findById("league", league);

  await UserStore.update(
    res.ops[0].admin,
    res.ops[0]._id.toString(),
    leagueObject
  );
  await UserStore.update(MONKEY_ID, res.ops[0]._id.toString(), leagueObject);

  groupArray = await GroupStore.getAllGroups();
  return GroupStore.response(true, "Group was created!", groupArray);
};
