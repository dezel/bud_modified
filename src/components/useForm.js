import React, { useState } from "react";

export const useForm = (initialFValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  };
};

// Form
export const Form = ({ children, ...rest }) => {
  return (
    <form autoComplete="off" {...rest}>
      {children}
    </form>
  );
};
