import { useEffect } from "react";
import "./usersform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";
import {
  initialFValues,
  gender,
  userType,
} from "../../components/component-utils/initValues";

const UsersForm = ({ addOrEdit, recordForEdit }) => {
  // VALIDATION
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required.";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required.";
    if ("staffId" in fieldValues)
      temp.staffId = fieldValues.staffId ? "" : "This field is required.";
    if ("userType" in fieldValues)
      temp.userType =
        fieldValues.userType.length !== 0 ? "" : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  // IMPORTING USEFORM CUSTOM COMPONENT
  const { values, handleInputChange, errors, setErrors, setValues, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Adding or Editing
      addOrEdit(values, resetForm);
    }
    // console.log(validate());
  };

  useEffect(() => {
    if (recordForEdit !== null) {
      const { id, fullname, username, staff_id, user_type_id, gender } =
        recordForEdit;

      const record = {
        id: id,
        fullname,
        username,
        password: "",
        staffId: staff_id,
        userType: user_type_id,
        gender,
      };
      setValues(record);
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="fullname"
            label="Full Name"
            value={values.fullname}
            onChange={handleInputChange}
            error={errors.fullname}
            size="small"
          />
          <Controls.Input
            name="username"
            label="Username"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
            size="small"
          />
          <Controls.Input
            name="staffId"
            label="Staff ID"
            value={values.staffId}
            onChange={handleInputChange}
            error={errors.staffId}
            size="small"
          />
          <Controls.Input
            name="password"
            label="Password"
            value={values.password}
            type="password"
            onChange={handleInputChange}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="userType"
            label="User Type"
            value={values.userType}
            onChange={handleInputChange}
            options={userType}
            error={errors.userType}
            size="small"
          />
          <Controls.Select
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            options={gender}
            size="small"
          />
          <div className="button-group">
            <Controls.Button
              className="button"
              type="submit"
              text="Submit"
              size="small"
            />
            <Controls.Button
              className="button"
              text="reset"
              color="secondary"
              onClick={resetForm}
              size="small"
            />
          </div>
        </Grid>
      </div>
    </Form>
  );
};

export default UsersForm;
