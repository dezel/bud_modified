import "./profile.scss";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { Form } from "../components/useForm";
import { Grid } from "@mui/material";
import PageHeader from "../components/pageheader/PageHeader";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import Popup from "../modals/Popup";
import Notification from "../components/notifications/Notification";
import { tryParse } from "../utils/tryParse";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI TABLE IMPORTS
import { styled } from "@mui/material/styles";
import {
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  EditOutlined,
  Search,
  PeopleOutlineTwoTone,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { publicRequest, userRequest } from "../utils/requestMethod";
import ConfirmationDialog from "../modals/ConfirmationDialog";

// // IMPORT INITIAL FORM VALUE
// import { initialFValues } from "../../components/component-utils/initValues";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight: "300",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#fffbf2",
    cursor: "pointer",
  },
}));





const Profile = () => {
  // STLYES FOR PRIMARY AND SECONDARY BUTTONS
  const btnPrimary = {
    minWidth: 0,
    margin: "3px",
    backgroundColor: "#3c44b126",
    color: "#333996",
  };

  const btnSecondary = {
    minWidth: 0,
    margin: "3px",
    backgroundColor: " #f8324526",
    color: "#f83245",
  };
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')

  // GET USERS DATA
  const [transactions, setTransactions] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  //   {
  //     "new_password":"Pass1234!",
  //     "username":"mikey",
  //     "password":"Pass1234?",
  //     "email": "mikey@mail.com"
  // }


  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('reached')
    const userInfo = tryParse(localStorage.getItem('userData'))
    // console.log(userInfo)

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/

    if (!newPassword.match(passwordRegex)) {
      // setMessage("Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
      setMessage("Password does not meet the minimum password requirement.")
      setShowConfirmation(true)
      // console.log('print regex')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match")
      setShowConfirmation(true)
    }



    const postData = {
      new_password: newPassword,
      password: oldPassword,
      username: userInfo.user.username
    }


    userRequest.post('/change_password', postData)
      .then(() => {
        alert("Password changed successfully. Please log in again")
        navigate('/login')
      })

  };


  // POP UP MODAL
  const [openPopup, setOpenPopup] = useState(false);

  // SET RECORDS FOR EDIT
  const [recordForEdit, setRecordForEdit] = useState(null);

  // NOTIFICATION
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });




  // TABLE DATA
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(transactions, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullname.toLowerCase().includes(target.value)
          );
      },
    });
  };

  // SET OPEN IN POPUP I.E RECORDS FOR EDIT
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    // console.log(recordForEdit);
  };

  const handleCancel =()=>{
    setShowConfirmation(false)
  }

  return (
    <div className="userlist">
      <Sidebar />
      <div className="userlistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<PeopleOutlineTwoTone className="headerIcon" />}
            mainTitle="Profile"
            subTitle=""
          />
          <div className="userlistpaper">
            <Toolbar>
              <Controls.Button
                text="Change Password"
                variant="outlined"

                size="small"
                className="add-button"
                onClick={() => {
                  setOpenPopup(true);

                }}
              />
            </Toolbar>
          </div>
          <Popup
            title="Change Password"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <Form onSubmit={handleSubmit}>
              <div className="form-wrapper">
                <Grid item xl={2}>
                  <Controls.Input
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    onChange={(e) => (setOldPassword(e.target.value))}
                    size="small"
                  />
                  <Controls.Input
                    name="newPassword"
                    label="New Password"
                    type="password"
                    onChange={(e) => (setNewPassword(e.target.value))}
                    size="small"
                  />
                  <Controls.Input
                    name="confirmPassword"
                    label="Confirm Password"
                    size="small"
                    type="password"
                    onChange={(e) => (setConfirmPassword(e.target.value))}
                  />
                  <div className="button-group">
                    <Controls.Button
                      className="button"
                      type="submit"
                      text="Save"
                      size="small"
                      onClick={handleSubmit}
                    />
                  </div>
                </Grid>
              </div> 
              {showConfirmation &&
            (<ConfirmationDialog message={message} onConfirm={handleCancel} />)
          }

            </Form>
          </Popup>
         
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
