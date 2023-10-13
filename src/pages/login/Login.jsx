import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../redux/calls/usersApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { publicRequest } from "../../utils/requestMethod";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { tryParse } from "../../utils/tryParse";
import './loginBackground.css'
// import {background} from './ridge_court.jpg'
// import Home from "../home/Home";
import { Alert, AlertTitle } from '@mui/material'
import './errorMessage.scss'

const Login = ({ setLoginInfo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState('')
  localStorage.removeItem('userData')
  const user = tryParse(localStorage.getItem('userData'))
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state.from.pathname || "/";



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/login", { username, password });
      // console.log(res.data)
      localStorage.setItem('userData', JSON.stringify(res.data))

      navigate('/home')
    } catch (err) {
      // console.log(err);
      setLoginError('Username or password incorrect')
      // setLoginError(err.response.data.detail)
    }
  };

  if (user) {
    return <Navigate replace to="/home" />;
  }

  const myStyle = {
    // backgroundImage: background,
    height: '100vh',
    marginTop: '-70px',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="login-container">
      <div className="container" >
        <div className="wrapper">
          <h1 className="title">Login</h1>
          {/* <CircularProgress/> */}
          <form className="loginForm" onSubmit={handleLogin}>
            <input
              type="type"
              placeholder="Username"
              className="input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="Password"
              placeholder="Password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton">Login</button>
            <div>{loginError && <p className="error-message">{loginError}</p>}</div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
