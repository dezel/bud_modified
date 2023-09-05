import "./budgetsetuplist.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PageHeader from "./../../components/pageheader/PageHeader";
import Controls from "../../components/controls/Controls";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import useTable from "./../../components/useTable";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllAccounts,
  createNewAccount,
  updateAccount,
  deleteAccount,
} from "../../redux/calls/accountsetupApiCalls";

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
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
  { id: "account_name", label: "Account" },
  { id: "accpac_code", label: "ACCPAC Code" },
  { id: "created_at", label: "Date Created", disableSorting: true },
  { id: "created_by", label: "Created By", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const BudgetSetupList = () => {
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
  const [accountData, setAccountData] = useState([]);
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
      getAllAccounts(dispatch);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const account = useSelector((state) => state.accounts.allaccounts);
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);

  // SET USERS DATA
  useEffect(() => {
    if (account) {
      setAccountData(account);
    }
  }, [account]);

  // TABLE DATA
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(accountData, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.account_name.toLowerCase().includes(target.value)
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
  const addOrEdit = (account, resetForm) => {
    if (account.id === 0) {
      createNewAccount(dispatch, {
        ...account,
        created_by: currentUser.id,
        fullname: currentUser.fullname,
      });
      // console.log({ ...account, created_by: currentUser.id });
      resetForm();
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    } else {
      updateAccount(dispatch, account.id, account);
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
  const handleRemove = (account) => {
    if (window.confirm("Are you sure you want to delete? You can't undo.")) {
      const { id } = account;
      deleteAccount(dispatch, id);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    }
  };

  return (
    <div className="budgetsetuplist">
      <Sidebar />
      <div className="budgetsetuplistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<AccountTreeIcon className="headerIcon" />}
            mainTitle="Budget Setup"
            subTitle="Set up your budget"
          />

          <div className="budgetsetuplistpaper">
            <Toolbar>
              <Controls.Input
                className="search-budgetsetup"
                label="Search Budget"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                // onChange=""
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
              <Controls.Button
                text="Upload"
                variant="contained"
                // color="green"
                startIcon={<AttachFileIcon />}
                size="small"
                className="upload-button"
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Toolbar>
            <TblContainer>
              <TblHead headCells={headCells} />
              <TableBody>
                {recordsAfterPagingAndSorting().map((account) => (
                  <StyledTableRow key={account.id}>
                    <StyledTableCell>{account.account_name}</StyledTableCell>
                    <StyledTableCell>{account.accpac_code}</StyledTableCell>
                    <StyledTableCell>
                      {account.created_at.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell>{account.fullname}</StyledTableCell>

                    <StyledTableCell>
                      <Controls.ActionButton
                        style={btnPrimary}
                        onClick={() => {
                          openInPopup(account);
                        }}
                      >
                        <EditOutlined fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        style={btnSecondary}
                        onClick={() => handleRemove(account)}
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
        </div>
      </div>
    </div>
  );
};

export default BudgetSetupList;
