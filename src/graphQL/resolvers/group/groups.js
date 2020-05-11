import GroupStore from "../../store/group";
export const groupsResolver = async () => await GroupStore.getAllGroups();
