const GroupStore = require("../../store/group");

const groupsResolver = async () => await GroupStore.getAllGroups();
module.exports = groupsResolver;
