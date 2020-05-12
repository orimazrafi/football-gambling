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
export interface League {
  _id: string;
}
export interface GroupWithId {
  _id: string;
  name: string;
  password: string;
  passwordConfirm?: string;
  limitParticipate: string;
  maxParticipate: number;
  image?: string;
  users?: User[];
}
export interface GroupInput {
  name: string;
  userId: string;
  groupId: string;
  password: string;
  image: string;
}

export interface GroupBlur {
  name: boolean;
  passwordConfirm: boolean;
  league: boolean;
}
export interface User {
  _id?: string;
  name: string;
  image: string;
  score: number;
  groups: Group[];
}
export interface UserFromGmail {
  name: string;
  image: string;
  email: string;
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
export interface UserGames {
  id: string;
  games: Game[];
}
export interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
}
