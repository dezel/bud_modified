import { useEffect, useState } from "react";
import "./usersform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";
import companyData from "./companyData";
// import { AsyncSelect } from 'react-select/async';
import AsyncSelect, { useAsync } from 'react-select';
import axios from 'axios';
import Select from 'react-select'
import { publicRequest, userRequest } from "../../utils/requestMethod";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import CompanyDropDownForm from "./CompanyDropDownForm";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const UsersForm = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  let options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  const [selectedOption, setSelectedOption] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [companyOptions, setCompanyOptions] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCompanyOption, setSelectedCompanyOptions] = useState('')
  const [isSuperUser, setIsSuperUser] = useState()

  const getCompanyData = async () => {
    await userRequest.get('/get_entities')
      .then((res) => {
        setCompanyOptions(res.data)
        console.log(companyOptions)
      })
  }



  useEffect(() => {
    getCompanyData()
  }, [])

  console.log(companyOptions)

  const [entity, setEntity] = useState()


  const HandleOptionChange = () => {
    return (
      <option>
        {companyOptions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.label}
          </option>
        ))}
      </option>
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
        entity: 1,
        sub_entity: 1
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
  const loadOptions = (inputValue) => {
    // make a GET request to the API endpoint with input value as parameter
    return userRequest.get('get_entities')
      .then(response => {
        const data = response.data;
        const options = data.map(post => {
          return {
            value: post.id,
            label: post.name
          };
        });


        return options;
      })
      .catch(error => {
        const message = error.message;
        console.error(message);
      });
  };

  const handleOnChange = (e) => {
    setSelectedOption(e.target.value)
    console.log(e.target.value)
  }


  const handleCompanySelect = (e) => {
    setSelectedCompanyOptions(e.target.value)
  }
  useEffect(() => {
    loadOptions()
  }, [])
  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
          <Controls.Input
            name="password"
            label="Password"
            type="password"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Controls.Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            <FormControlLabel
              control={<Checkbox checked={isSuperUser} onChange={(e) =>setIsSuperUser(e.target.checked)} />}
              label="Is administrator"
            />
          <CompanyDropDownForm />
          {/* <select key={setSelectedCompanyOptions} onChange={handleCompanySelect}>
            <option key="Cash" value="Cash">Please Select</option>
            {<HandleOptionChange />}
          </select> */}
          {/* <select key={setSelectedCompanyOptions} onChange={handleCompanySelect}>
            <option key="Cash" value="Cash">Cash</option>
            {companyOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.label}
              </option>
            ))}
          </select> */}
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
