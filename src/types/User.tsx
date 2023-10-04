export type LoginObject = {
  email: string;
  password: string;
};

export type AuthorizedUserObject = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type CreateUserObject = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type SuccessUserCreate = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
};
