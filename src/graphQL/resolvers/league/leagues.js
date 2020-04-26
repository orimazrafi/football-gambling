const Store = require("../../store");
const leaguesResolver = async () => await Store.getAllDocuments("league");
module.exports = leaguesResolver;
