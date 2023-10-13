import { useState } from "react";
import "./usersform.scss";
import { Grid } from "@mui/material";
import { Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";


import Select from 'react-select'
import { userRequest } from "../../utils/requestMethod";
import ConfirmationDialog from "../../modals/ConfirmationDialog";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { tryParse } from "../../utils/tryParse";


const UsersFormEdit = ({ user }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  console.log(user)

  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')

  const [isSuperUser, setIsSuperUser] = useState(user.is_supervuser)
  const [isActive, setIsactive] = useState(user.is_active)
  const [entity, setEntity] = useState()
  const [subEntity, setSubEntity] = useState()
  const [branches, setBranches] = useState()
  const [companyName, setCompanyName] = useState('')

  const branchLookup = (entityId) => {

    // console.log()

    const entities = tryParse(localStorage.getItem('branches'))
    console.log(entities)
    const branchFor = entities.filter(entity => entity.fields.entity === entityId)

    // console.log(branchFor)


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

    // if (password !== confirmPassword){
    //   setMessage("Passwords do not match")
    //   setShowConfirmation(true)
    //   return
    // }

    // if(!isSuperUser && !entity && !subEntity){
    //   setMessage("Please confirm company and branch")
    //   setShowConfirmation(true)
    //   return
    // }

    // let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{1,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    // if (!password.match(passwordRegex)){
    //   // setMessage("Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    //   setMessage("Password does not meet the minimum password requirement.")
    //   setShowConfirmation(true)
    //   return
    // }

    const postData = {
      first_name: firstName,
      last_name: lastName,
      // password: password,
      // username: username,
      is_superuser: isSuperUser,
      is_active: isActive,
      person: {
        entity: isSuperUser ? 1 : entity,
        sub_entity: isSuperUser ? 1 : subEntity
      }
    }

    // console.log(postData)
    userRequest.post('/signup', postData)
      .then((res) => {
        setShowConfirmation(true)
        setMessage('User added successfully')
        // console.log(res)

        setFirstName('')
        setLastName('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setIsSuperUser(false)
        setIsactive(false)

      })
      .catch((err) => {
        console.log(err.response.data.username[0])
        setMessage(err.response.data.username[0])

        setShowConfirmation(true)
      })
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
    // console.log(entity)
    branchLookup(e.value)
  }



  const defaultCompany = () => {
    console.log(user)
    const companyId = user.person.entity

    let companies = tryParse(localStorage.getItem('companies'))
    // console.log(companies)
    let userCompany = companies.filter(company => company.id === companyId)
    console.log(userCompany)

   
    return {
      value: userCompany[0].id,
      label: userCompany[0].name
    }

  }


  const defaultBranch =() =>{
    const branchId = user.person.sub_entity
    console.log(branchId)
    let branches = tryParse(localStorage.getItem('branches'))
    console.log(branches)
    // console.log(branches)
    let userBranch = branches.filter(branch=>branch.pk === branchId)
    
    console.log(userBranch)

    return {
      value: userBranch[0].pk,
      label: userBranch[0].fields.branch_name
    }
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
            value={firstName}

          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            size="small"
            value={lastName}
          />
          {/* <Controls.Input
            name="username"
            label="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            value={username}
          /> */}
          {/* <Controls.Input
            name="password"
            label="Password"
            type="password"
            required
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Controls.Input
            name="confirmPassword"
            required
            label="Confirm Password"
            type="password"
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          /> */}
          <FormControlLabel
            control={<Checkbox checked={isSuperUser} onChange={(e) => setIsSuperUser(e.target.checked)} />}
            label="Is administrator"
          />
          <FormControlLabel
            control={<Checkbox checked={isActive} onChange={(e) => setIsactive(e.target.checked)} />}
            label="Is active"
          />
          {
            !isSuperUser ?
              <>

                <Select
                  defaultValue={defaultCompany()}
                  options={companyLookup()}
                  onChange={
                    (e) => {
                      handleCompanyChange(e)
                    }
                  }
                  required
                />
                <div style={{ color: "white" }}>-</div>
                <Select
                  defaultValue={defaultBranch()}
                  options={branches}
                  onChange={(e) => setSubEntity(e.value)}
                  required
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
            {
              showConfirmation && (
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

export default UsersFormEdit;
