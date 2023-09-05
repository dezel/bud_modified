export const initialFValues = {
  id: 0,
  fullname: "",
  username: "",
  password: "",
  userType: "",
  gender: "",
  staffId: "",
};

// Gender
export const gender = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];

//User Type
export const userType = [
  { id: 17, title: "Admin" },
  { id: 18, title: "Procurement" },
];

export const branchType = [
  { id: "branch", title: "Branch" },
  { id: "department", title: "Department" },
];

export const initialBranchFValues = {
  id: 0,
  branch_dept_name: "",
  branch_dept_type: "",
  branch_code: "",
};
export const initialAccountSetupFValues = {
  id: 0,
  account_name: "",
  accpac_code: "",
};
