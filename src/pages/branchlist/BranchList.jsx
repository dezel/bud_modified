import { useState, useEffect } from "react";
import "./branchlist.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import BranchForm from "./BranchForm";
import Controls from "../../components/controls/Controls";
import PageHeader from "./../../components/pageheader/PageHeader";
import Popup from "../../modals/Popup";
import Notification from "../../components/notifications/Notification";
import useTable from "./../../components/useTable";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllBranchDept,
  createNewBranchDept,
  updateBranchDept,
  deleteBranchDept,
} from "../../redux/calls/branchdeptApiCalls";

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
import { EditOutlined, Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

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
  { id: "branch_dept_name", label: "Branch/Department" },
  { id: "branch_dept_type", label: "Type" },
  { id: "branch_code", label: "Code", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const BranchList = () => {
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

  // GET BRANCH DATA
  const [branchdeptData, setBranchDeptData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // POP UP MODAL
  const [openPopup, setOpenPopup] = useState(false);

  // SET RECORDS FOR EDIT
  const [recordForEdit, setRecordForEdit] = useState(null);

  //   NOTIFICATION
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      getAllBranchDept(dispatch);
    } catch (err) {
//console.log(err);
    }
  }, [dispatch]);

  const branchdept = useSelector((state) => state.branchdept.allbranchdept);
  const currentUser = useSelector((state) => state.user.currentUser);
  //   console.log(currentUser);

  // SET USERS DATA
  useEffect(() => {
    if (branchdept) {
      setBranchDeptData(branchdept);
    }
  }, [branchdept]);

  // TABLE DATA
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(branchdeptData, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.branch_dept_name.toLowerCase().includes(target.value)
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
  const addOrEdit = (branchdept, resetForm) => {
    if (branchdept.id === 0) {
      createNewBranchDept(dispatch, {
        ...branchdept,
        created_by: currentUser.id,
      });
      resetForm();
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    } else {
      updateBranchDept(dispatch, branchdept.id, branchdept);
      resetForm();
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }

    // if user_id = 0 then perform insert
    // else perform update operation
    // ADD DATA INTO DB
    // code ...
  };

  // REMOVE USER
  const handleRemove = (branchdept) => {
    if (window.confirm("Are you sure you want to delete? You can't undo.")) {
      const { id } = branchdept;
      deleteBranchDept(dispatch, id);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    }
  };

  return (
    <div className="branchlist">
      <Sidebar />
      <div className="branchlistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<HomeWorkIcon className="headerIcon" />}
            mainTitle="Branches/Departments"
            subTitle="Branches and Departments Information"
          />
          <div className="branchlistpaper">
            <Toolbar>
              <Controls.Input
                className="search-branchdept"
                label="Search Employees"
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
            <TblContainer>
              <TblHead headCells={headCells} />
              <TableBody>
                {recordsAfterPagingAndSorting().map((branchdept) => (
                  <StyledTableRow key={branchdept.id}>
                    <StyledTableCell>
                      {branchdept.branch_dept_name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {branchdept.branch_dept_type}
                    </StyledTableCell>
                    <StyledTableCell>{branchdept.branch_code}</StyledTableCell>

                    <StyledTableCell>
                      <Controls.ActionButton
                        style={btnPrimary}
                        onClick={() => {
                          openInPopup(branchdept);
                        }}
                      >
                        <EditOutlined fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        style={btnSecondary}
                        onClick={() => handleRemove(branchdept)}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </div>
          <Popup
            title="Branch Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <BranchForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      </div>
    </div>
  );
};

export default BranchList;
