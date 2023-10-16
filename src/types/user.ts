type UserRole = "customer" | "admin";

export type JWTToken = {
  access_token: string;
  refresh_token: string;
};

export interface LoginCredential {
  email: string;
  password: string;
}

export interface AuthorizedUser extends LoginCredential {
  id: number;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface RegisterUser extends LoginCredential {
  name: string;
  avatar: string;
}
