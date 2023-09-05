import { useEffect } from "react";
import "./branchform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";
import {
  initialBranchFValues,
  branchType,
} from "../../components/component-utils/initValues";

const BranchForm = ({ addOrEdit, recordForEdit }) => {
  // VALIDATION
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("branch_dept_name" in fieldValues)
      temp.branch_dept_name = fieldValues.branch_dept_name
        ? ""
        : "This field is required.";
    if ("branch_code" in fieldValues)
      temp.branch_code = fieldValues.branch_code
        ? ""
        : "This field is required.";
    if ("branch_dept_type" in fieldValues)
      temp.branch_dept_type =
        fieldValues.branch_dept_type.length !== 0
          ? ""
          : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  // IMPORTING USEFORM CUSTOM COMPONENT
  const { values, handleInputChange, errors, setErrors, setValues, resetForm } =
    useForm(initialBranchFValues, true, validate);

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
      const { id, branch_dept_name, branch_dept_type, branch_code } =
        recordForEdit;

      setValues({ id, branch_dept_name, branch_dept_type, branch_code });
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="branch_dept_name"
            label="Branch Name"
            value={values.branch_dept_name}
            onChange={handleInputChange}
            error={errors.branch_dept_name}
            size="small"
          />
          <Controls.Input
            name="branch_code"
            label="Code"
            value={values.branch_code}
            onChange={handleInputChange}
            error={errors.branch_code}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="branch_dept_type"
            label="Type"
            value={values.branch_dept_type}
            onChange={handleInputChange}
            options={branchType}
            error={errors.branch_dept_type}
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

export default BranchForm;
