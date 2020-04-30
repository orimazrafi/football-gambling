const LeagueStore = require("../../store/league");
const leaguesResolver = async () => await LeagueStore.getAlleagues();
module.exports = leaguesResolver;
