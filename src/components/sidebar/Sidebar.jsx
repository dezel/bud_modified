import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
// import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Welcome from "../../pages/login/Welcome";
import { useNavigate } from "react-router-dom";
import InitializeUser from "../../pages/login/InitializeUser";
import { tryParse } from "../../utils/tryParse";


const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userData')
    navigate('/login')

  }

  const user = tryParse(localStorage.getItem('userData'))
  console.log(user.user.is_superuser)

  // console.log(InitializeUser)
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Republic Bank</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN </p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span className="dashboard">Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS </p>
          {
            user.user.is_superuser &&
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span className="dashboard">Users</span>
              </li>
            </Link>
          }
          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <HomeWorkIcon className="icon" />
              <span className="dashboard">Transactions</span>
            </li>
          </Link>
          <Link to="/funeralDonation" style={{ textDecoration: "none" }}>
            <li>
              <HomeWorkIcon className="icon" />
              <span className="dashboard">Funeral</span>
            </li>
          </Link>
          {/* <Link to="/branchdept" style={{ textDecoration: "none" }}>
            <li>
              <HomeWorkIcon className="icon" />
              <span className="dashboard">Branches/Depts</span>
            </li>
          </Link> */}
          {/* <Link to="/accountsetup" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptLongIcon className="icon" />
              <span className="dashboard">Account Setup</span>
            </li>
          </Link> */}
          {/* <Link to="/budgetsetup" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span className="dashboard">Budgets</span>
            </li>
          </Link> */}
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span className="dashboard">Delivery</span>
          </li> */}
          <p className="title"> </p>
          {/* <li>
            <InsertChartIcon className="icon" />
            <span className="dashboard">Stats</span>
          </li> */}
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span className="dashboard">Notification</span>
          </li>
          <p className="title">SERVICE </p>
          <li>
            <SettingsSystemDaydreamIcon className="icon" />
            <span className="dashboard">System Heath</span>
          </li> */}
          {/* <li>
            <PsychologyIcon className="icon" />
            <span className="dashboard">Logs</span>
          </li> */}
          {
            user.user.is_superuser && <li>
              <SettingsApplicationsIcon className="icon" />
              <span className="dashboard">Setup</span>
            </li>
          }

          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span className="dashboard">Profile</span>
            </li>
          </Link>


          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span className="dashboard" >Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        {/* <div className="colorOption"></div>
        <div className="colorOption"></div> */}
      </div>
    </div>
  );
};

export default Sidebar;
