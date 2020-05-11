import GroupStore from "../../store/group";
export const checkGroupNameExistResolver = async (obj, args, req) => {
  const { name } = args;

  const groupWithSameName = await GroupStore.findByName(name);
  if (groupWithSameName)
    return GroupStore.response(false, "Group name is already taken.", {});
  return GroupStore.response(true, "This is good name ", {});
};
