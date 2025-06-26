import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Category"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1", credentials: "include" }),
  endpoints: () => ({}),
});
