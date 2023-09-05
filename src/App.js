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

function App() {
  const [user,setUser]=useState(null)
  // const [loginUser,setLoginUser]=useState(null)
  // const user = null
  const userInfo = tryParse(localStorage.getItem('userData'))
  console.log(userInfo)

  const handleUserInfo = (data)=>{
    setUser(data)
  }
  console.log(user)

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

  if (!userInfo) {
    return <Login />;
  }
  return (
    <div>
      <Router>
        <Routes>
          {/* Protected Route */}
          {/* <Route element={<RequireAuth />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="users/:id" element={<Single />} />

          {/* <Route
            path="/users/new"
            element={<New inputs={userInputs} title="Add New User" />}
          /> */}

          <Route path="/branchdept" element={<BranchList />} />
          <Route path="/accountsetup" element={<AccountSetupList />} />
          <Route path="/budgetsetup" element={<BudgetSetupList />} />
          {/* <Route path="/products/:id" element={<Single />} />
          <Route
            path="/products/new"
            element={<New inputs={productInputs} title="Add New Product" />}
          /> */}
          {/* </Route> */}
          {/* Public Route
          <Route exact path="/login" element={<Login />} /> */}

          {/* Catch */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
