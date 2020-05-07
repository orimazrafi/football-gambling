const Game = require("../resources/Game");
const Group = require("../resources/Group");
const League = require("../resources/League");
const Team = require("../resources/Team");
const User = require("../resources/User");
const Player = require("../resources/Player");
import { Subscription } from "./Subscription";
const Mutations = require("../resources/Mutations");
const Queries = require("../resources/Queries");
const GambleInput = require("../resources/Input/GambleInput");
const GameInput = require("../resources/Input/GameInput");
const GroupInput = require("../resources/Input/GroupInput");
const LeagueInput = require("../resources/Input/LeagueInput");
const TeamInput = require("../resources/Input/TeamInput");
const UserInput = require("../resources/Input/UserInput");
const UserToGroupInput = require("../resources/Input/UserToGroupInput");
const GambleUpdateResponse = require("../resources/response/GambleUpdateResponse");
const GroupResponse = require("../resources/response/GroupResponse");
const UserResponse = require("../resources/response/UserResponse");
import { UserTypingResponse } from "../resources/response/UserTypingResponse";
const UserSearchResponse = require("../resources/response/UserSearchResponse");
const LeagueResponse = require("../resources/response/LeagueResponse");
const RandomGambleInput = require("../resources/Input/RandomGambleInput");
import { UserMessageResponse } from "../resources/response/UserMessageResponse";
import { MessageInfo } from "../resources/response/MessageInfo";
import { gql } from "apollo-server";
const typeDefs = gql`
    ${Game},
    ${Group},
    ${League},
    ${Team},
    ${User},
    ${Player},
    ${Subscription},
    ${Queries},
    ${Mutations},
    ${GambleInput},
    ${GameInput},
    ${GroupInput},
    ${LeagueInput},
    ${TeamInput},
    ${UserInput},
    ${RandomGambleInput},
    ${UserToGroupInput},
    ${GambleUpdateResponse},
    ${GroupResponse},
    ${UserResponse},
    ${UserMessageResponse},
    ${MessageInfo},
    ${UserTypingResponse},
    ${UserSearchResponse},
    ${LeagueResponse}
`;
module.exports = typeDefs;
