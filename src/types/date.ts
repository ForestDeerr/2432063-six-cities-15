export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type User = {
  avatarUrl: string;
  isPro: boolean;
  userName: string;
};

export type UserLogIn = UserData & {
  avatarUrl: string;
  isPro: boolean;
  name: string;
};
