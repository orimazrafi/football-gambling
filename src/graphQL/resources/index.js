import Game from "../resources/Game";
import Group from "../resources/Group";
import League from "../resources/League";
import Team from "../resources/Team";
import User from "../resources/User";
import Player from "../resources/Player";
import MessageInfo from "../resources/response/MessageInfo";

import Mutations from "../resources/Mutations";
import Queries from "../resources/Queries";
import Subscription from "../resources/Subscription";
import { GambleInput } from "../resources/Input/GambleInput";
import { GameInput } from "../resources/Input/GameInput";
import { GroupInput } from "../resources/Input/GroupInput";
import { LeagueInput } from "../resources/Input/LeagueInput";
import { TeamInput } from "../resources/Input/TeamInput";
import { UserInput } from "../resources/Input/UserInput";
import { UserToGroupInput } from "../resources/Input/UserToGroupInput";
import { GambleUpdateResponse } from "../resources/response/GambleUpdateResponse";
import { GroupResponse } from "../resources/response/GroupResponse";
import { UserResponse } from "../resources/response/UserResponse";
import { UserSearchResponse } from "../resources/response/UserSearchResponse";
import { LeagueResponse } from "../resources/response/LeagueResponse";
import { RandomGambleInput } from "../resources/Input/RandomGambleInput";
import { UserMessageResponse } from "../resources/response/UserMessageResponse";
import { UserTypingResponse } from "../resources/response/UserTypingResponse";
import { gql } from "apollo-server";

const typeDefs = gql`
    ${Game},
    ${Group},
    ${League},
    ${Team},
    ${User},
    ${Player},
    ${Queries},
    ${Subscription},
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
    ${UserSearchResponse},
    ${LeagueResponse},
    ${UserMessageResponse},
    ${UserTypingResponse},
    ${MessageInfo}
`;
module.exports = typeDefs;
