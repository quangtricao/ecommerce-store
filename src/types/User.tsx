export type UserLoginObject = {
  email: string;
  password: string;
};

export type TokenObject = {
  access_token: string;
  refresh_token: string;
};

export type UserInLocalStorage = {
  email: string,
  access_token: string,
  refresh_token: string,
}