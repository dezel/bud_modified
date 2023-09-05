import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: null,
    error: false,
    allusers: [],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      state.allusers = [];
    },
    setUserFromStorage: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allusers = action.payload;
      state.error = false;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allusers.push(action.payload);
      state.error = false;
    },
    addUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allusers[
        state.allusers.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.user;
      state.error = false;
    },
    updateUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE USERS
    deleteUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allusers.splice(
        state.allusers.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  setUserFromStorage,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUsersStart,
  addUsersSuccess,
  addUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
} = userSlice.actions;
export default userSlice.reducer;
