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
export interface GroupBlur {
  name: boolean;
  passwordConfirm: boolean;
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
  logo: string;
}
