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

const UsersForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  let options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [companyOptions, setCompanyOptions] = useState({})


  const getCompanyData = () => {
    return userRequest.get('/get_entities').then(res => (setCompanyOptions(res.data)))
  }

  useEffect(() => {
    getCompanyData()
  }, [])

  const [entity, setEntity] = useState()
  
  const loadOptions = (inputValue) => {
    // make a GET request to the API endpoint with input value as parameter
    return axios.get('http://localhost:8000/get_entities')
      .then(response => {
        console.log(response.data)
        const data = response.data;
        setEntity(data)
        // map the data array to an array of objects with value and label keys
        // react-select needs these keys to understand the options
        const options = data.map(post => {
          return {
            value: post.id,
            label: post.title
          };
        });
        // return the options array
        return options;
      })
      .catch(error => {
        // handle the error
        // get the message from the error object
        const message = error.message;
        // display an error message or do something else
        console.error(message);
      });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
 
    const postData = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      username: username,
      person: {
        entity: 1,
        sub_entity: 1
      }
    }  
    userRequest.post('/signup', postData)

    .then((res) => console.log(res.data))
    .then()
    .catch((err)=>console.log(err.messages))
    console.log(postData)
  };


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
          <div className="form-wrapper">

          </div>

          {/* <Select
            size="small"

            options={companyOptions}
          /> */}
        </Grid>
        {/* <Grid item xs={6}>
          <AsyncSelect // async select component
            name="subEntity"
            cacheOptions // enable caching of loaded options
            defaultOptions // enable loading of default options on initial render
            loadOptions={loadOptions} // function to load options from API
            onChange={setSelectedOption} // function to update selected option state
            onClick={loadOptions}
            value={selectedOption} // value of selected option state
            size="small"
          />
          <AsyncSelect // async select component
            name="entity"
            cacheOptions // enable caching of loaded options
            defaultOptions // enable loading of default options on initial render
            loadOptions={loadOptions} // function to load options from API
            onChange={setSelectedOption} // function to update selected option state
            onClick={loadOptions}
            value={selectedOption} // value of selected option state
            size="small"
          />
        </Grid>*/}
        <Grid item xs={6}>

          <div className="button-group">
            <Controls.Button
              className="button"
              type="submit"
              text="Submit"
              size="small"
            />
          </div>
        </Grid> 
      </div>
    </Form>
  );
};

export default UsersForm;
