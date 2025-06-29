import { apiSlice } from "./apiSlice";
import type { ProductReturnType, ProductMutationReturnType } from "../../types/types";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listProduct: builder.query<ProductReturnType, void>({
      query: () => `/product/`,
    }),
    listTopProducts: builder.query<ProductReturnType, void>({
      query: () => "/products/top",
    }),
    createProduct: builder.mutation<ProductMutationReturnType, FormData>({
      query: (data) => ({
        url: "/product/",
        method: "POST",
        body: data
      })
    })
  }),
});

export const { useListProductQuery, useCreateProductMutation } = productApiSlice;
