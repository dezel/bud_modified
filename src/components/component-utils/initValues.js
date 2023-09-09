export const initialFValues = {
  id: 0,
  first_name: "",
  last_name:"",
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

export const entity = [
  { id: "male", title: "Marbon Pharmacy" },
  { id: "female", title: "Narut Pharmacy" },
];

export const sub_entity = [
  {id:1, title: "Circle"},
  {id:2, title:"Agbogbloshie"}
]
//User Type
export const userType = [
  { id: 17, title: "Admin" },
  { id: 18, title: "Standard" },
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
