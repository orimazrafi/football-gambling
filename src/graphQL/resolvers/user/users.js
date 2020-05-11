import GroupStore from "../../store/group";

export const usersResolver = async () => await GroupStore.getAllGroups();
