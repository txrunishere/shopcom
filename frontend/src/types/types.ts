type ICommon = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCredentials = ICommon & {
  username: string;
  email: string;
  isAdmin: boolean;
};

type CategoryResult = {
  success: boolean;
  categories: Array<ICommon & { categoryName: string }>;
};

type CategoryReturnType = {
  success: boolean;
  message: string;
  category: CategoryResult;
};

export type { UserCredentials, CategoryResult, CategoryReturnType };
