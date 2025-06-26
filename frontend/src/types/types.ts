import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

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
  category: ICommon & {
    categoryName: string;
  };
};

type ICategory = ICommon & {
  categoryName: string;
};

type CategoryFormType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleFn: (e: FormEvent<HTMLFormElement>) => void;
  deleteFn?: () => void;
  buttonText?: string;
  isLoading: boolean,
  width?: string,
};

type ModelComponentType = {
  children: ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  handleFn: () => void;
};

export type {
  UserCredentials,
  CategoryResult,
  CategoryReturnType,
  CategoryFormType,
  ModelComponentType,
  ICategory
};
