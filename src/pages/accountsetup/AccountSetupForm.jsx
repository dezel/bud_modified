import { useEffect } from "react";
import "./accountsetupform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";
import { initialAccountSetupFValues } from "../../components/component-utils/initValues";

const AccountSetupForm = ({ addOrEdit, recordForEdit }) => {
  // VALIDATION
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("account_name" in fieldValues)
      temp.account_name = fieldValues.account_name
        ? ""
        : "This field is required.";
    if ("accpac_code" in fieldValues)
      temp.accpac_code = fieldValues.accpac_code
        ? ""
        : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  // IMPORTING USEFORM CUSTOM COMPONENT
  const { values, handleInputChange, errors, setErrors, setValues, resetForm } =
    useForm(initialAccountSetupFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Adding or Editing
      // console.log(values);
      addOrEdit(values, resetForm);
    }
    // console.log(validate());
  };

  useEffect(() => {
    if (recordForEdit !== null) {
      const { id, account_name, accpac_code, created_at, fullname } =
        recordForEdit;

      setValues({ id, account_name, accpac_code, created_at, fullname });
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="account_name"
            label="Account Name"
            value={values.account_name}
            onChange={handleInputChange}
            error={errors.account_name}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="accpac_code"
            label="Code"
            value={values.accpac_code}
            onChange={handleInputChange}
            error={errors.accpac_code}
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

export default AccountSetupForm;
