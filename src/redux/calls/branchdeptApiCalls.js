import {
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
} from "../slice/branchdeptSlice";
import { userRequest } from "../../utils/requestMethod";

// GET ALL USERS
export const getAllBranchDept = async (dispatch) => {
  dispatch(getBranchDeptStart());

  try {
    const res = await userRequest.get("/branchdept/allbranchdept");
    dispatch(getBranchDeptSuccess(res.data.recordset));
    // console.log(res.data);
  } catch (err) {
    dispatch(getBranchDeptFailure());
//console.log(err);
  }
};

// export const removeUser = async (dispatch) => {
//   // dispatch(removeUser)
// };

export const createNewBranchDept = async (dispatch, branchdept) => {
  await dispatch(addBranchDeptStart());
  try {
    const { branch_dept_name, branch_dept_type, branch_code, created_by } =
      branchdept;
    const sanitized_input = {
      branchdeptname: branch_dept_name,
      branchdepttype: branch_dept_type,
      createdby: created_by,
      branchcode: branch_code,
    };

    const res = await userRequest.post(
      "/branchdept/createbranchdept",
      sanitized_input
    );

    dispatch(
      addBranchDeptSuccess({
        ...branchdept,
        id: res.data.recordset[0].insert_id,
      })
    );
    // console.log({ ...user, id: res.data.recordset[0].insert_id });
  } catch (err) {
    dispatch(addBranchDeptFailure());
//console.log(err);
  }
};

export const updateBranchDept = async (dispatch, id, branchdept) => {
  dispatch(updateBranchDeptStart());
  try {
    const { branch_dept_name, branch_dept_type, branch_code } = branchdept;
    const sanitized_input = {
      branchdeptname: branch_dept_name,
      branchdepttype: branch_dept_type,
      branchcode: branch_code,
    };

    await userRequest.put(
      `/branchdept/updatebranchdept/${id}`,
      sanitized_input
    );

    dispatch(updateBranchDeptSuccess({ id, branchdept }));
  } catch (err) {
//console.log("Error", err);
    dispatch(updateBranchDeptFailure());
  }
};
export const deleteBranchDept = async (dispatch, id) => {
  dispatch(deleteBranchDeptStart());
  try {
    await userRequest.delete(`/branchdept/deletebranchdept/${id}`);
    dispatch(deleteBranchDeptSuccess(id));
  } catch (err) {
//console.log("Error", err);
    dispatch(deleteBranchDeptFailure());
  }
};
