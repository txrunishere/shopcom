type IUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCredentials = IUser & {
  password: string;
  email: string;
};

export type {
  UserCredentials
}
