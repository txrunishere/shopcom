import type { CategoryResult, CategoryReturnType } from "../../types/types";
import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listCategories: builder.query<CategoryResult, void>({
      query: () => "/category",
      providesTags: ["Category"]
    }),
    createCategory: builder.mutation<CategoryReturnType, { categoryName: string }>(
      {
        query: (data) => ({
          url: "/category",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Category"]
      }
    ),
    updateCategory: builder.mutation<CategoryReturnType, { categoryId: string, categoryName: string }>({
      query: ({ categoryId, categoryName }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        body: {
          categoryName
        }
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation<Omit<CategoryReturnType, "category">, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]

    })
  }),
});

export const {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
