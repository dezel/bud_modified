import {
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
} from "../slice/budgetsetupSlice";
import { userRequest } from "../../utils/requestMethod";

// GET ALL ACCOUNTS
export const getAllBudgets = async (dispatch) => {
  dispatch(getBudgetsStart());

  try {
    const res = await userRequest.get("/accounts/allaccounts");
    dispatch(getBudgetsSuccess(res.data.recordset));
    // console.log(res.data);
  } catch (err) {
    dispatch(getBudgetsFailure());
    console.log(err);
  }
};

// export const removeUser = async (dispatch) => {
//   // dispatch(removeUser)
// };

export const createNewBudget = async (dispatch, budget) => {
  await dispatch(addBudgetStart());
  try {
    const res = await userRequest.post("/budgets/createbudget", budget);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let created_at = `${year}-${month}-${day}`;

    dispatch(
      addBudgetSuccess({
        ...budget,
        id: res.data.recordset[0].insert_id,
        created_at,
      })
    );
    // console.log({ ...user, id: res.data.recordset[0].insert_id });
  } catch (err) {
    dispatch(addBudgetFailure());
    console.log(err);
  }
};

export const updateBudget = async (dispatch, id, account) => {
  dispatch(updateBudgetStart());
  try {
    await userRequest.put(`/budgets/updatebudget/${id}`, account);

    dispatch(updateBudgetSuccess({ id, account }));
  } catch (err) {
    console.log("Error", err);
    dispatch(updateBudgetFailure());
  }
};
export const deleteBudget = async (dispatch, id) => {
  dispatch(deleteBudgetStart());
  try {
    await userRequest.delete(`/accounts/deletebudget/${id}`);
    dispatch(deleteBudgetSuccess(id));
  } catch (err) {
    console.log("Error", err);
    dispatch(deleteBudgetFailure());
  }
};
