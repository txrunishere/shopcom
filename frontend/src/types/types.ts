type IUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCredentials = IUser & {
  username: string;
  email: string;
};

export type {
  UserCredentials
}
