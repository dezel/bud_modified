import {
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
} from "../slice/accountsetupSlice";
import { userRequest } from "../../utils/requestMethod";

// GET ALL ACCOUNTS
export const getAllAccounts = async (dispatch) => {
  dispatch(getAccountsStart());

  try {
    const res = await userRequest.get("/accounts/allaccounts");
    dispatch(getAccountsSuccess(res.data.recordset));
    // console.log(res.data);
  } catch (err) {
    dispatch(getAccountsFailure());
//console.log(err);
  }
};

// export const removeUser = async (dispatch) => {
//   // dispatch(removeUser)
// };

export const createNewAccount = async (dispatch, account) => {
  await dispatch(addAccountStart());
  try {
    const res = await userRequest.post("/accounts/createaccount", account);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let created_at = `${year}-${month}-${day}`;

    dispatch(
      addAccountSuccess({
        ...account,
        id: res.data.recordset[0].insert_id,
        created_at,
      })
    );
    // console.log({ ...user, id: res.data.recordset[0].insert_id });
  } catch (err) {
    dispatch(addAccountFailure());
//console.log(err);
  }
};

export const updateAccount = async (dispatch, id, account) => {
  dispatch(updateAccountStart());
  try {
    await userRequest.put(`/accounts/updateaccount/${id}`, account);

    dispatch(updateAccountSuccess({ id, account }));
  } catch (err) {
//console.log("Error", err);
    dispatch(updateAccountFailure());
  }
};
export const deleteAccount = async (dispatch, id) => {
  dispatch(deleteAccountStart());
  try {
    await userRequest.delete(`/accounts/deleteaccount/${id}`);
    dispatch(deleteAccountSuccess(id));
  } catch (err) {
//console.log("Error", err);
    dispatch(deleteAccountFailure());
  }
};
