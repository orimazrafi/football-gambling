export interface Group {
  _id: string;
  name: string;
  password: string;
  passwordConfirm?: string;
  limitParticipate: string;
  maxParticipate: number;
  image: string;
  users?: User[];
}
export interface GroupBlur {
  name: boolean;
  passwordConfirm: boolean;
}
export interface User {
  _id?: string;
  name: string;
  image?: string;
  groups: Group[];
}
