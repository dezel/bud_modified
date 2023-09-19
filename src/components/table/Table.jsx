import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rows } from "./data";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../utils/requestMethod";
import axios from "axios";
import GetReceipt from "./Receipt";
import dayjs from "dayjs";


const List = ({transactions}) => {
  // console.log(transactions)
  // const [transactions, setTransactions] = useState([])

  // function getDataPromise() {
  //   const currentDate = new Date("2023-09-11")
  //   console.log(currentDate)
  //   const postData = {
  //     transaction_date: currentDate,
  //     person: {
  //       entity: 1,
  //       sub_entity: 1
  //     }
  //   }


  //   return userRequest.post('/get_receipts', postData)
  //     .then(res => setTransactions(res.data))
  //     .then(res => console.log(res.data))
  //     .catch(err => console.error(err))
  // }



  // const [receipt, setReceipt] = useState([])

  // useEffect(() => {
  //   getDataPromise()
  // }, [])





  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Receipt Number</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Transaction Date</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            {/* <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="tableCell">{transaction.receipt_number}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img className="image" src={transaction.img} alt="product" />
                  {transaction.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{transaction.amount}</TableCell>
             <TableCell className="tableCell">{dayjs(transaction.transaction_date).format('DD-MMM-YYYY hh:mm a')}</TableCell>
              <TableCell className="tableCell">{transaction.payment_method}</TableCell>
              {/*  <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell"> */}
              {/* <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
