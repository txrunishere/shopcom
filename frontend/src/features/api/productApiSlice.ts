import { apiSlice } from "./apiSlice";
import type {
  ProductReturnType,
  ProductMutationReturnType,
} from "../../types/types";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listProduct: builder.query<ProductReturnType, void>({
      query: () => `/product/`,
      providesTags: ['Product']
    }),
    listTopProducts: builder.query<ProductReturnType, void>({
      query: () => "/products/top",
    }),
    getProductById: builder.query({
      query: ({ productId }) => `/product/${productId}`,
    }),
    createProduct: builder.mutation<ProductMutationReturnType, FormData>({
      query: (data) => ({
        url: "/product/",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.productId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"]
    })
  }),
});

export const {
  useListProductQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useListTopProductsQuery,
  useDeleteProductMutation
} = productApiSlice;
