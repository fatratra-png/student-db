export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface UserInput {
  email: string;
  password: string;
}

export interface PublicUser {
  id: number;
  email: string;
  created_at: Date;
}
