const Store = require("../../store");
const usersResolver = async (obj, args, req) =>
  await Store.getAllDocuments("groups");

module.exports = usersResolver;
