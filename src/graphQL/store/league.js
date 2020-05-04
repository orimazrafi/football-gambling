const Store = require("./index");
let ObjectId = require("mongodb").ObjectID;

const findById = (id) => Store.findById("league", id);
const getAlleagues = () => Store.getAllDocuments("league");

const response = (success, message, response) => ({
  success,
  message,
  league: response,
});

const add = async (name, image, numberOfMathces) =>
  await Store.league().insertOne({
    name,
    image,
    numberOfMathces,
    games: [],
  });

const updateGame = async (leagueId, eventDate, homeTeam, awayTeam) =>
  await Store.league().updateOne(
    { _id: ObjectId(leagueId) },
    { $push: { games: { eventDate, homeTeam, awayTeam } } }
  );

module.exports = {
  add,
  response,
  findById,
  getAlleagues,
  add,
  updateGame,
};
