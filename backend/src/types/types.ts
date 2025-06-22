interface IUser {
  username: string;
  email: string;
  id: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type {
  IUser
}