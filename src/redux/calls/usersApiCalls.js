import {
  loginFailure,
  loginStart,
  loginSuccess,
  setUserFromStorage,
  logOut,
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
} from "../slice/userSlice";
import { publicRequest, userRequest } from "../../utils/requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    await dispatch(loginSuccess(res.data));
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  } catch (error) {
    dispatch(loginFailure());
    console.log(error);
  }
};

export const setUserFromLocalStorage = async (dispatch, user) => {
  await dispatch(setUserFromStorage(user));
};

export const logout = async (dispatch) => {
  await dispatch(logOut());
  localStorage.setItem("currentUser", JSON.stringify({}));
};

// GET ALL USERS
export const getAllUsers = async (dispatch) => {
  dispatch(getUsersStart());

  // try {
  //   const res = await userRequest.get("/users/allusers");
  //   dispatch(getUsersSuccess(res.data.recordset));
  //   // console.log(res.data);
  // } catch (err) {
  //   dispatch(getUsersFailure());
  //   console.log(err);
  // }
};

export const removeUser = async (dispatch) => {
  // dispatch(removeUser)
};

export const createNewUser = async (dispatch, user) => {
  await dispatch(addUsersStart());
  try {
    const { fullname, gender, password, staffId, userType, username } = user;
    const sanitized_user = {
      fullname,
      username,
      password,
      staffID: staffId,
      gender,
      type: userType,
    };
    const return_user = {
      fullname,
      username,
      user_type_id: userType,
      user_status: "active",
      gender,
      staff_id: staffId,
    };
    const res = await userRequest.post("/auth/createuser", sanitized_user);
    dispatch(
      addUsersSuccess({ ...return_user, id: res.data.recordset[0].insert_id })
    );
    // console.log({ ...user, id: res.data.recordset[0].insert_id });
  } catch (err) {
    dispatch(addUsersFailure());
  }
};

export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUsersStart());
  try {
    let { id, fullname, gender, password, staffId, userType, username } = user;
    const sanitized_user = {
      fullname,
      username,
      password,
      userstatus: "active",
      staffID: staffId,
      gender,
      usertypeid: userType,
    };
    user = {
      id,
      fullname,
      username,
      password,
      user_type_id: userType,
      user_status: "active",
      gender,
      staff_id: staffId,
    };

    await userRequest.put(`/users/updateusers/${id}`, sanitized_user);

    dispatch(updateUsersSuccess({ id, user }));
  } catch (err) {
    console.log("Error", err);
    dispatch(updateUsersFailure());
  }
};
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    await userRequest.delete(`/users/removeuser/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    console.log("Error", err);
    dispatch(deleteUsersFailure());
  }
};
