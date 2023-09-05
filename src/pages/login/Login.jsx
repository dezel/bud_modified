import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../redux/calls/usersApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.scss";
// import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../utils/requestMethod";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../home/Home";


const Login = ({setLoginInfo}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo]= useState(null)
  
const [user, setUser] = useState();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state.from.pathname || "/";
 


  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/login",{username,password});
      await setUserInfo(res.data)
      localStorage.setItem('userData',JSON.stringify(userInfo))
      setUser(localStorage.getItem('userData'))
    } catch (err) {
      console.log(err);
    }

  };

  console.log(userInfo);

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">Login</h1>
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
        </form>
      </div>
    </div>
  );
} 

export default Login;
