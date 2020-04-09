export interface Group {
  name: string;
  password?: string;
  passwordConfirm?: string;
  limitParticipate: string;
  maxParticipate?: number;
  image?: string;
}
export interface GroupBlur {
  name: boolean;
  passwordConfirm: boolean;
}
