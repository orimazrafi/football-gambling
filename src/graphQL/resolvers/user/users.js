const GroupStore = require("../../store/group");

const usersResolver = async () => await GroupStore.getAllGroups();

module.exports = usersResolver;
