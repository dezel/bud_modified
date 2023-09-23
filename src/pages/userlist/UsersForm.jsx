import { useState } from "react";
import "./usersform.scss";
import { Grid } from "@mui/material";
import { Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";


import Select from 'react-select'
import { userRequest } from "../../utils/requestMethod";
import ConfirmationDialog from "../../modals/ConfirmationDialog";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { tryParse } from "../../utils/tryParse";


const UsersForm = () => {
  // const [selectedOption, setSelectedOption] = useState(null);


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')

  const [isSuperUser, setIsSuperUser] = useState()
  const [entity, setEntity] = useState()
  const [subEntity, setSubEntity] = useState()
  const [branches, setBranches] = useState()

  const branchLookup = (entityId) => {

    console.log()

    const entities = tryParse(localStorage.getItem('branches'))

    const branchFor = entities.filter(entity => entity.fields.entity === entityId)

    console.log(branchFor)


    const newOptions = branchFor.map(
      option => {
        return {
          value: option.pk,
          label: option.fields.branch_name

        }
      }
    )
    setBranches(newOptions)
    return newOptions
  }

  const companyLookup = () => {

    let companies = tryParse(localStorage.getItem('companies'))



    return companies.map(
      company => {
        return {
          value: company.id,
          label: company.name
        }
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      username: username,
      is_superuser: isSuperUser,
      person: {
        entity: entity,
        sub_entity: subEntity
      }
    }

    console.log(postData)
    userRequest.post('/signup', postData)
      .then((res) => {
        setShowConfirmation(true)
        setMessage('User added successfully')
        // console.log(res)
      })
      .then()
      .catch((err) => console.log(err.messages))
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
  };
  const handleCancel = () => {
    // Close the confirmation dialog without performing the action
    setShowConfirmation(false);
  };



  const handleCompanyChange = (e) => {

    setEntity(e.value)
    console.log(entity)
    branchLookup(e.value)
  }


  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            required
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="username"
            label="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="password"
            label="Password"
            type="password"
            required
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Controls.Input
            name="confirmPassword"
            required
            label="Confirm Password"
            type="password"
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={isSuperUser} onChange={(e) => setIsSuperUser(e.target.checked)} />}
            label="Is administrator"
          />

          {
            !isSuperUser ?
              <>

                <Select
                  defaultValue={{ label: "Select Company", value: 0 }}
                  options={companyLookup()}
                  onChange={
                    (e) => {
                      handleCompanyChange(e)
                    }
                  }
                />
                <Select
                  defaultValue={{ label: "Select Branch", value: 0 }}
                  options={branches}
                  onChange={(e) => setSubEntity(e.value)}
                />
              </> : <></>
          }

        </Grid>
        <Grid item xs={6}>
          <div className="button-group">
            <Controls.Button
              className="button"
              type="submit"
              text="Submit"
              size="small"
            />
            {showConfirmation && (
              <ConfirmationDialog
                message={message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>
        </Grid>
      </div>
    </Form>
  );
};

export default UsersForm;
