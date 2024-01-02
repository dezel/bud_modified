import "./donationList.scss";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { CSVLink } from 'react-csv'
// import DatePicker from "react-datepicker";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import DonationForm from "./DonationForm";
import PageHeader from "../components/pageheader/PageHeader";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import Popup from "../modals/Popup";
import Notification from "../components/notifications/Notification";
import { tryParse } from "../utils/tryParse";
// import PrintReceiptForm from "./PrintReceiptFrom";
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
import { GridSearchIcon } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

import { publicRequest, userRequest } from "../utils/requestMethod";
import { useStateManager } from "react-select";
import Papa from "papaparse";
import PrintReceiptForm from "./PrintReceiptFrom";
import ConfirmationDialog from "../modals/ConfirmationDialog";
import { defaultBranch, defaultCompany } from "../utils/lookups";

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
  { id: "transaction_date", label: "Date" },
  { id: "payment_method", label: "Payment Method" },
  { id: "client_name", label: "Client Name" },
  // { id: "client_name", label: "Status", disableSorting: true },
  // { id: "actions", label: "Actions", disableSorting: true },
];

const DonationList = () => {
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
  const [donations, setDonations] = useState([]);
  const csvLink = useRef()
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

  const userData = tryParse(localStorage.getItem('userData'))


  const getTransactions = async () => {
    const res = await userRequest.post('/get_receipts', queryData)
      .then(
      // console.log((res) => res.data)
    )
    return res.data
  }


  const getFuneral= async () =>{
    await(userRequest.get('/get_funeral'))
    .then((res)=>{
      localStorage.setItem('funeral', JSON.stringify(res.data))
    })
  }
  useEffect(() => {
    // const data = getTransactions()
    // setTransactions(getTransactions())

    getFuneral()
    

  }, [])

  // POP UP MODAL
  const [openPopup, setOpenPopup] = useState(false);
  const [openPrintPopup, setOpenPrintPopup] = useState(false)
  // SET RECORDS FOR EDIT
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))
  const [trans, setTrans] = useState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const [reason, setReason] = useState('')


  // NOTIFICATION
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });



  // TABLE DATA
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(donations, filterFn);
  /*
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
  */
  // SET OPEN IN POPUP I.E RECORDS FOR EDIT
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    // console.log(recordForEdit);
  };

  let searchQuery = {
    start_date: startDate + ' 00:00:00',
    end_date: endDate + ' 23:59:59',
  }


  const handleSearch = () => {
    console.log(searchQuery)
    userRequest.post('/get_donations', searchQuery)
      .then((res) => {setDonations(res.data)
      console.log(res.data)
      })
  }

  const handleExport_ = () => {
    // await userRequest.get('/export_trans')
    //     .then((res) => setTransactions(res.data))

    const url = window.URL.createObjectURL(new Blob([donations]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'bare_file')
    document.body.appendChild(link)
    link.click()
    //csvLink.current.link.click()
  }



  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333"
      };
    }
  };

  const exportData = (data, fileName, type) => {


    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (donations) {
      let dataForExport =
        donations.map((donation) => ({
          receipt_number: donation.receipt_number,
          amount: donation.amount,
          transaction_date: dayjs(donation.transaction_date),
          client_name: donation.client_name,
          payment_method: donation.payment_method,
          electronic_trans_type: donation.electronic_trans_type
        })
        )


      console.log(donations)
      // const dataForExport 
      // data.map(({id, deviceName}) => ({id, deviceName})
      let trans = donations.map((element) => (
        { receipt_number: element.receipt_number, amount: element.amount }
      )
      )




      let csvData = Papa.unparse(dataForExport)
      if (csvData) {
        exportData(csvData, 'donations.csv', 'text/csv;charset=utf-8;')

      }
    }
  }

  const handleRowClick = (transaction) => {
    setTrans(transaction)
    setOpenPrintPopup(true)

  }

  const handleDelete = (transaction) => {
 console.log(userData)

    if (confirmDelete) {

      userRequest.post(`/delete_donation/${transaction.id}`,{username:userData.user.username})
        .then((res) => {
          // console.log(res)
          // console.log('transaction deleted successfully')
          setMessage('donation deleted successfully')
          setShowConfirmation(false)
        })
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }
  const handleConfirm = () => {
    // console.log('confirmed')
    setMessage(`Are you sure you want to delete this transaction?`)
    setShowConfirmation(true)
    setConfirmDelete(true)

  }

  return (
    <div className="userlist">
      <Sidebar />
      <div className="userlistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<PeopleOutlineTwoTone className="headerIcon" />}
            mainTitle="Donations"
            subTitle="Funeral Donations"
          />
          <div className="userlistpaper">
            <Toolbar>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker required onChange={(date) => { setStartDate(dayjs(date).format('YYYY-MM-DD')) }} defaultValue={dayjs(new Date())} />
                <DesktopDatePicker required onChange={(date) => { setEndDate(dayjs(date).format('YYYY-MM-DD')) }} defaultValue={dayjs(new Date())} />
              </LocalizationProvider>
              <Controls.Button
                text="Search..."
                variant="outlined"

                startIcon={<GridSearchIcon />}
                size="small"
                className=""
                onClick={() => {
                  handleSearch()
                }}
              />
              {/* <Controls.Input
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
            /> */}


              <Controls.Button
                text="Export"
                variant="outlined"
                size="small"
                onClick={() => {
                  handleExport();
                }}
              />


              <div >
                <Controls.Button
                  text="Add New"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  className="add-button"
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                />
              </div>

            </Toolbar>
            <TblContainer>
              <TblHead headCells={headCells} />
              <TableBody>
                {donations.map((donation) => (
                  <StyledTableRow
                    // onClick={(e) => {
                    //   handleRowClick(transaction)
                    // }
                    // } 
                    key={donation.id}>
                    <StyledTableCell >{donation.receipt_number}</StyledTableCell>
                    <StyledTableCell>{donation.amount}</StyledTableCell>
                    <StyledTableCell>{dayjs(donation.transaction_date).format('DD-MMM-YYYY hh:mm a')}</StyledTableCell>
                    <StyledTableCell>{donation.payment_method}</StyledTableCell>
                    <StyledTableCell>{donation.client_name}</StyledTableCell>
                    <StyledTableCell>
                      <Controls.ActionButton
                        style={btnPrimary}
                      // onClick={() => { setOpenPrintPopup(true) }}
                      >

                        <EditOutlined onClick={(e) => handleRowClick(donation)} fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        style={btnSecondary}
                      // onClick={(e) => setOpenPrintPopup(false)}
                      >
                        <CloseIcon
                          // onClick={console.log('edit')} 
                          onClick={(e) => {
                            handleConfirm()
                            setTrans(donation)
                          }}
                          fontSize="small"
                        />
                      </Controls.ActionButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TblContainer>
          </div>
          <Popup
            title="Donation Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <DonationForm />
          </Popup>
          <Popup
            title=""
            openPopup={openPrintPopup}
            setOpenPopup={setOpenPrintPopup}
          >
            <PrintReceiptForm transaction={trans} />
          </Popup>
          {showConfirmation &&
            <ConfirmationDialog
              message={message}
              onConfirm={(e) => handleDelete(trans)}
              onCancel={(e) => handleCancel()}
              showCancel={true}
              addMessage={true}
            ></ConfirmationDialog>}
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      </div>
    </div>
  );
};

export default DonationList;
