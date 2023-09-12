import "./transactionlist.scss";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

import TransactionForm from "./TransactionForm";
import PageHeader from "../components/pageheader/PageHeader";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import Popup from "../modals/Popup";
import Notification from "../components/notifications/Notification";
import PrintReceiptForm from "./PrintReceiptFrom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../redux/calls/usersApiCalls";

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
  { id: "receiptNumber", label: "Receipt Number" },
  { id: "amount", label: "Amount" },
  { id: "transactionDate", label: "Date", disableSorting: true },
  { id: "paymentMode", label: "Payment Mode" },
  { id: "userStatus", label: "Status", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const TransactionList = () => {
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
  const [transactions, setTransactions] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });



  let queryData = {
    transaction_date: "2023-09-11",
    person: {
      entity: 1,
      sub_entity: 1
    }
  }

const getTransactions = async () => {
  const res = await userRequest.post('/get_receipts',queryData)
  .then(
    // console.log((res) => res.data)
  )
  return res.data
}

useEffect(()=>{
  const data = getTransactions()
  setTransactions(getTransactions())

},[])

// POP UP MODAL
const [openPopup, setOpenPopup] = useState(false);
const [openPrintPopup, setOpenPrintPopup] = useState(true)
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


return (
  <div className="userlist">
    <Sidebar />
    <div className="userlistContainer">
      <Navbar />
      <div className="innerContainer">
        <PageHeader
          icon={<PeopleOutlineTwoTone className="headerIcon" />}
          mainTitle="Transactions"
          subTitle="Client Transactions"
        />
        <div className="userlistpaper">
          <Toolbar>
            <Controls.Input
              className="search-users"
              label="Search Transactions"
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
              {transactions.map((transaction) => (
                <StyledTableRow key={transaction.id}>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>
                    <Controls.ActionButton
                      style={btnPrimary}
                      onClick={() => {
                        openInPopup(transaction);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      style={btnSecondary}
                      onClick={console.log('clicked')}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </TblContainer> */}
        </div>
        <Popup
          title="Transaction Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}

        >
          <TransactionForm/>
        </Popup>
        <Popup
        title=""
        openPopup={false}
        setOpenPopup={setOpenPrintPopup}
        >
          {/* <PrintReceiptForm  /> */}
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  </div>
);
};

export default TransactionList;
