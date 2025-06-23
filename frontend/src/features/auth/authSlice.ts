import { createSlice } from "@reduxjs/toolkit";
import type { UserCredentials } from "../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: UserCredentials | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserCredentials>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
