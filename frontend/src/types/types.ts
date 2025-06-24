type IUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCredentials = IUser & {
  username: string;
  email: string;
  isAdmin: boolean
};

export type {
  UserCredentials
}
