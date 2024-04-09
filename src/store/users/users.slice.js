import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, getOneUser, getUsers } from "./users.actions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    error: false,
    loading: false,
    users: [],
    currentUser: null,
    oneUser: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

  },
});