import { Outlet } from "react-router-dom";
import Login from "../pages/login/Login";

const RequireAuth = () => {
  let user;
  if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)) {
    user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
  }

  return user.currentUser ? <Outlet /> : <Login />;
};

export default RequireAuth;
