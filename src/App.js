import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import BranchList from "./pages/branchlist/BranchList";
import UserList from "./pages/userlist/UserList";
import Single from "./pages/single/Single";
import AccountSetupList from "./pages/accountsetup/AccountSetupList";
import BudgetSetupList from "./pages/budgetsetup/BudgetSetupList";
// import New from "./pages/new/New";
import NotFound from "./pages/notfound/NotFound";
// import { userInputs, productInputs } from "./formSource";
// import { useSelector, useDispatch } from "react-redux";
// import { setUserFromLocalStorage } from "./redux/calls/usersApiCalls";
import "./style/dark.scss";
import { tryParse } from "./utils/tryParse";
import axios from "axios";
import { getType } from "@reduxjs/toolkit";
import Welcome from "./pages/login/Welcome";
import ProtectedRoutes from "./utils/ProtectedRoute";
import TransactionList from "./transactions/TransactionList";
import Profile from "./profile/Profile";
function App() {
  // let userInfo

  // const [user,setUser]=useState(null)
  // const [cred,setCred] = useState(null)
 
  

  // const handleUserInfo = (data)=>{
  //   setUser(data)
  // }


  // useEffect(()=>{
  //    userInfo= tryParse(localStorage.getItem('userData'))
  //     if(userInfo){
  //       handleUserInfo(userInfo)
  //     }
  //   },[userInfo])

  // console.log('Credentials',cred)

  // const [entity, setEntity] = useState([])
  // const header = {
  //   headers: {
  //     'Authorization': 'Token bda3016ad3fb7516abb9665f0ab2db1f9f7f65eb',
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // }

  // useEffect(() => {
  //   console.log(userInfo)
  //   axios.get('http://localhost:8000/get_entity/'+userInfo.user.person.entity,
  //     header
  //   )
  //     .then(
  //       response => {
  //         setEntity(response.data)
  //       })
  // }, [])

  // console.log(entity)

  // const dispatch = useDispatch();
  // parse or null
  // useEffect(()=>{
  //   if(user){
  //     setLoginUser("something")
  //   }else{
  //     setLoginUser(null)
  //   }
  // },[user])


  // useEffect(() => {
  //   const potentialUser = tryParse(localStorage.getItem("currentUser"));
  //   try {
  //     if (potentialUser.id) {
  //       setUserFromLocalStorage(dispatch, potentialUser);
  //     }
  //   } catch (err) {
  //     return;
  //   }
  // }, [dispatch]);
  // const user = useSelector((state) => state.user.currentUser);
  // console.log(user);

  // if (!user) {
  //   return <Login />;
  // }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          {/* Protected Route */}
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserList />} />

          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/profile" element={<Profile />} />
        
          {/* Catch */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
