const Store = require("../../store");
const groupsResolver = async (obj, args, req) =>
  await Store.getAllDocuments("groups");
module.exports = groupsResolver;
