import type { UserCredentials } from "../../types/types";
import { apiSlice } from "./apiSlice";

type AllUsersResultType = {
  users: Array<UserCredentials>
}

const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<AllUsersResultType, void>({
      query: () => "/user/get-users",
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useLazyGetUserQuery,
} = adminApiSlice;
