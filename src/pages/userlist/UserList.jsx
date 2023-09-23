import "./userlist.scss";
import { useState, useEffect } from "react";
import Sidebar from "./../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UsersForm from "./UsersForm";
import PageHeader from "../../components/pageheader/PageHeader";
import useTable from "./../../components/useTable";
import Controls from "../../components/controls/Controls";
import Popup from "../../modals/Popup";
import Notification from "../../components/notifications/Notification";
import Accordion from "../home/Accordion";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../../redux/calls/usersApiCalls";

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
import { publicRequest, userRequest } from "../../utils/requestMethod";
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

// INITIALIZE TABLE HEAD INFO
const headCells = [
  { id: "fullname", label: "Full Name" },
  { id: "username", label: "Username" },
  { id: "gender", label: "Gender", disableSorting: true },
  { id: "staffId", label: "Staff ID" },
  { id: "userStatus", label: "Status", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const UserList = () => {
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

  // GET USERS DATA
  const [usersData, setUsersData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // GET USERS DATA FOR EZEKIEL

  let queryData = {
    transaction_date: "2023-08-24",
    person: {
      entity: 1,
      sub_entity: 1
    }
  }

  const getUsersDataForEzekiel = async () => {
    const res = await userRequest.post('/get_receipts', queryData)
    console.log('Response', res)
    return res.data

  }

  // useEffect(()=>{
  //   const data = getUsersDataForEzekiel()
  //   setUsersData(data)
  // },[])

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

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   try {
  //     //getAllUsers(dispatch);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch]);

  // const users = useSelector((state) => state.user.allusers);
  const users = []

  // SET USERS DATA
  // useEffect(() => {
  //   if (users) {
  //     setUsersData(users);
  //   }
  // }, [users]);

  // console.log(usersData);

  // TABLE DATA
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(usersData, filterFn);

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

  // ADD OR EDITING USERS
  // const addOrEdit = (user, resetForm) => {
  //   if (user.id === 0) {
  //     createNewUser(dispatch, user);
  //     resetForm();
  //     setOpenPopup(false);
  //     setNotify({
  //       isOpen: true,
  //       message: "Submitted Successfully",
  //       type: "success",
  //     });
  //   } else {
  //     updateUser(dispatch, user.id, user);
  //     resetForm();
  //     setOpenPopup(false);
  //     setNotify({
  //       isOpen: true,
  //       message: "Submitted Successfully",
  //       type: "success",
  //     });
  //   }

  // if user_id = 0 then perform insert
  // else perform update operation
  // ADD DATA INTO DB
  // code ...
  //};

  return (
    <div className="userlist">
      <Sidebar />
      <div className="userlistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<PeopleOutlineTwoTone className="headerIcon" />}
            mainTitle="Users"
            subTitle="Users Information"
          />
          <div className="userlistpaper">
            <Toolbar>
              <Controls.Input
                id="search"
                name="search"
                className="search-users"
                label="Search Users"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
                className="add-button"
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Toolbar>
            {/* <TblContainer>
            <TblHead headCells={headCells} />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>{user.fullname}</StyledTableCell>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{user.gender}</StyledTableCell>
                  <StyledTableCell>{user.staff_id}</StyledTableCell>
                  <StyledTableCell>{user.user_status}</StyledTableCell>
                  <StyledTableCell>
                    <Controls.ActionButton
                      style={btnPrimary}
                      onClick={() => {
                        openInPopup(user);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      style={btnSecondary}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </TblContainer> */}
            <Accordion />
          </div>
          <Popup
            title="Users Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <UsersForm recordForEdit={{}} />
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
