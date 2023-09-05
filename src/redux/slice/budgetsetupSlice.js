import { createSlice } from "@reduxjs/toolkit";

const budgetsetupSlice = createSlice({
  name: "budgets",
  initialState: {
    isFetching: null,
    error: false,
    allbudgets: [],
  },
  reducers: {
    getBudgetsStart: (state) => {
      state.isFetching = true;
    },
    getBudgetsSuccess: (state, action) => {
      state.isFetching = false;
      state.allaccounts = action.payload;
      state.error = false;
    },
    getBudgetsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addBudgetStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addBudgetSuccess: (state, action) => {
      state.isFetching = false;
      state.allbudgets.push(action.payload);
      state.error = false;
    },
    addBudgetFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateBudgetStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateBudgetSuccess: (state, action) => {
      state.isFetching = false;
      state.allbudgets[
        state.allbudgets.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.budget;
      state.error = false;
    },
    updateBudgetFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE BRANCHDEPT
    deleteBudgetStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteBudgetSuccess: (state, action) => {
      state.isFetching = false;
      state.allbudgets.splice(
        state.allbudgets.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteBudgetFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBudgetsStart,
  getBudgetsSuccess,
  getBudgetsFailure,
  addBudgetStart,
  addBudgetSuccess,
  addBudgetFailure,
  updateBudgetStart,
  updateBudgetSuccess,
  updateBudgetFailure,
  deleteBudgetStart,
  deleteBudgetSuccess,
  deleteBudgetFailure,
} = budgetsetupSlice.actions;
export default budgetsetupSlice.reducer;
