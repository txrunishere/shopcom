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
  isLoading: boolean;
  width?: string;
};

type ModelComponentType = {
  children: ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  handleFn: () => void;
};

type ProductModelState = ICommon & {
  category?: ICategory;
  productName: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  status: boolean;
  rating: number;
  categoryId: string;
  reviews?: Array<ReviewModelState>;
};

type ProductReturnType = {
  success: boolean;
  products: Array<ProductModelState>;
};

type ProductMutationReturnType = {
  success: boolean;
  message: string;
  product: ProductModelState;
};

type ProductQueryArgType = {
  productName: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  status: boolean;
  rating: number;
  categoryId: string;
};

type ReviewModelState = ICommon & {
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  product?: ProductModelState;
  user?: UserCredentials;
};

type ProductCardModel = {
  productName: string;
  description: string;
  image: string;
  price: number;
  reviews: number;
  rating: number;
  productId: string;
};

export type {
  UserCredentials,
  CategoryResult,
  CategoryReturnType,
  CategoryFormType,
  ModelComponentType,
  ICategory,
  ProductModelState,
  ReviewModelState,
  ProductReturnType,
  ProductMutationReturnType,
  ProductQueryArgType,
  ProductCardModel,
};
