//GroupInterface
export interface Group {
  _id?: string;
  name: string;
  password: string;
  passwordConfirm?: string;
  limitParticipate: string;
  maxParticipate: number;
  image?: string;
  users?: User[];
  league: League;
}
export interface UserGames {
  id: string;
  games: Game[];
}
export interface GroupUsersAndLeague {
  image: string;
  name: string;
  league: {
    image: string;
    name: string;
    games: Game[];
  };
  users: {
    _id: string;
    image: string;
    name: string;
    results: Game[];
  };
}
export interface GroupFullObject {
  group: {
    _id: string;
    name: string;
    image: string;
    users: User[];
    chat: {
      sender: string;
      image: string;
      time: string;
      message: string;
    };
    results: UserWithResultsAndWinningAndScorer;
    league: League;
    password: string;
    limitParticipate: string;
    maxParticipate: number;
  };
}
export interface GroupWithStringLeague {
  name: string;
  password: string;
  passwordConfirm: string;
  limitParticipate: string;
  maxParticipate: number;
  image?: string;
  league: string | League;
}

export interface GroupInput {
  name: string;
  userId: string;
  groupId: string;
  password: string;
  image: string;
}
export interface JoinGroupDetails {
  name: string;
  groupId: string | undefined;
  password: string;
  image: string | undefined;
}

export interface GroupBlur {
  name: boolean;
  passwordConfirm: boolean;
  league: boolean;
}
//AuthInterface
export interface AuthAuthenticate {
  isAuthenticated: () => void;
}
export interface AuthType {
  auth?: any;
}
export interface AuthLogout {
  logout: () => void;
}
//HistoryInterface
export interface HistoryGroupId {
  location: { state: { groupId: string } };
}

//UserInterface
export interface UserGambels {
  user: {
    _id: string;
    bestScorer: string;
    winningTeam: string;
    results: {
      _id: string;
      games: Game[];
      teams: Team[];
      players: Player[];
    };
  };
}
export interface UserWithOpponents {
  user: {
    user: {
      _id: string;
      results: { name: string; image: string };
      opponent: {
        name: string;
        image: string;
      };
    };
  };
}
export interface UserWithOpponentsNoRedux {
  _id: string;
  results: { name: string; image: string };
  opponent: {
    name: string;
    image: string;
  };
}

export interface User {
  _id?: string;
  name: string;
  image: string;
  score: number;
  groups: Group[];
}
export interface UserWithResultsAndWinningAndScorer {
  results: {
    _id: string;
    games: Game[];
  };
  winningTeam: string;
  bestScorer: string;
}
export interface UserFromGmail {
  name: string;
  image: string;
  email: string;
}

export interface UserScore {
  id: string;
  score: number;
  name: string;
}
export interface UserResults {
  _id: string;
  image: string;
  name: string;
  results: {
    games: Game[];
  };
}
export interface UserWithFullResults {
  _id: string;
  winningTeam: string;
  bestScorer: string;
  results: {
    games: Game[];
    _id: string;
    players: [];
    teams: Team[];
  };
}

export interface UserWithWinningAndScorerResult {
  results: {
    _id: string;
  };
  winningTeam: string;
  bestScorer: string;
}
//LeagueInterface

export interface League {
  _id: string;
}

export interface LeagueOfGroup {
  league: {
    games: Game[];
  };
}

export interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
}

export interface Player {
  name: string;
  image: string;
  team: string;
}
export interface Game {
  awayTeam: Team;
  eventDate: string;
  homeTeam: Team;
}
export interface Team {
  name: string;
  score: string;
  image: string;
}

export interface MessageInfo {
  sender: string;
  message: string;
  image: string;
  time: string;
}
export interface GroupWithChat {
  _id: string;
  name: string;
  image: string;
  users: any;
  chat: any;
  results: any;
  league: any;
  password: string;
  limitParticipate: string;
  maxParticipate: string;
}
export interface NewMessage {
  newMessage: {
    messageInfo: MessageInfo;
  };
}
export interface GroupHistory {
  location: {
    state: {
      groupId: string;
      chat: MessageInfo[];
      users: any;
    };
  };
}
export interface OpponentsHistory {
  location: {
    state: {
      group: any;
      gambler: any;
      score: number;
      bullseye: number;
    };
  };
}
