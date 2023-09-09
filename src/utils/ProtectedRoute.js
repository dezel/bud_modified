import { Outlet } from "react-router-dom";
import Login from "../pages/login/Login";
import { tryParse } from "./tryParse";

const ProtectedRoutes = () => {
  let user;
  user = tryParse(localStorage.getItem('userData'))

  return user.token ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;


