import { createSlice } from "@reduxjs/toolkit";

const branchdeptSlice = createSlice({
  name: "branchdept",
  initialState: {
    isFetching: null,
    error: false,
    allbranchdept: [],
  },
  reducers: {
    getBranchDeptStart: (state) => {
      state.isFetching = true;
    },
    getBranchDeptSuccess: (state, action) => {
      state.isFetching = false;
      state.allbranchdept = action.payload;
      state.error = false;
    },
    getBranchDeptFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addBranchDeptStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addBranchDeptSuccess: (state, action) => {
      state.isFetching = false;
      state.allbranchdept.push(action.payload);
      state.error = false;
    },
    addBranchDeptFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateBranchDeptStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateBranchDeptSuccess: (state, action) => {
      state.isFetching = false;
      state.allbranchdept[
        state.allbranchdept.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.branchdept;
      state.error = false;
    },
    updateBranchDeptFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE BRANCHDEPT
    deleteBranchDeptStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteBranchDeptSuccess: (state, action) => {
      state.isFetching = false;
      state.allbranchdept.splice(
        state.allbranchdept.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteBranchDeptFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBranchDeptStart,
  getBranchDeptSuccess,
  getBranchDeptFailure,
  addBranchDeptStart,
  addBranchDeptSuccess,
  addBranchDeptFailure,
  updateBranchDeptStart,
  updateBranchDeptSuccess,
  updateBranchDeptFailure,
  deleteBranchDeptStart,
  deleteBranchDeptSuccess,
  deleteBranchDeptFailure,
} = branchdeptSlice.actions;
export default branchdeptSlice.reducer;
