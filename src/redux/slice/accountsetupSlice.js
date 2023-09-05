import { createSlice } from "@reduxjs/toolkit";

const accountsetupSlice = createSlice({
  name: "accounts",
  initialState: {
    isFetching: null,
    error: false,
    allaccounts: [],
  },
  reducers: {
    getAccountsStart: (state) => {
      state.isFetching = true;
    },
    getAccountsSuccess: (state, action) => {
      state.isFetching = false;
      state.allaccounts = action.payload;
      state.error = false;
    },
    getAccountsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addAccountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addAccountSuccess: (state, action) => {
      state.isFetching = false;
      state.allaccounts.push(action.payload);
      state.error = false;
    },
    addAccountFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateAccountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateAccountSuccess: (state, action) => {
      state.isFetching = false;
      state.allaccounts[
        state.allaccounts.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.account;
      state.error = false;
    },
    updateAccountFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE BRANCHDEPT
    deleteAccountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteAccountSuccess: (state, action) => {
      state.isFetching = false;
      state.allaccounts.splice(
        state.allaccounts.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteAccountFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFailure,
  addAccountStart,
  addAccountSuccess,
  addAccountFailure,
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} = accountsetupSlice.actions;
export default accountsetupSlice.reducer;
