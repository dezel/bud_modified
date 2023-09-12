import "./navbar.scss";
import { useState, useEffect } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ListIcon from "@mui/icons-material/List";
import Welcome from "../../pages/login/Welcome";
import { publicRequest } from "../../utils/requestMethod";
import { tryParse } from "../../utils/tryParse";


const Navbar = () => {

  const userData = tryParse(localStorage.getItem('userData'))
  const companyData = tryParse(localStorage.getItem('company'))

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search" />
          <SearchIcon className="icon" />
        </div>
        {/* <div className="items">
          <div className="item">
            <LanguageIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://media.istockphoto.com/photos/young-businessman-using-a-digital-tablet-in-a-modern-office-picture-id1297050085?b=1&k=20&m=1297050085&s=170667a&w=0&h=qMD31Wgkm5BeZHWqV7TjdY0ck8bQG0GT_6rcYVTNPqQ="
              alt="profile"
              className="avatar"
            />
          </div>
        </div> */}
        <div className="item">
          <Welcome 
          user={userData.user}
          
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
