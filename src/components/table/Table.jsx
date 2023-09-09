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
import { publicRequest } from "../../utils/requestMethod";
import axios from "axios";
import GetReceipt from "./Receipt";
const List = () => {
  function getDataPromise() {

    

    const header = {
      headers: {
        'Authorization': 'Token bda3016ad3fb7516abb9665f0ab2db1f9f7f65eb',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }


    return axios.post('http://localhost:8000/get_receipts', {
      "transaction_date": "2023-08-24",
      "person": {
        "entity": 1,
        "sub_entity": 1
      }
    }, { header })
      .then(res => res.data)
      .catch(err => console.error(err))
  }


  // getDataPromise().then(res => console.log(res))
  const header = {
    headers: {
      'Authorization': 'Token bda3016ad3fb7516abb9665f0ab2db1f9f7f65eb',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const [receipt, setReceipt] = useState([])
 

  useEffect(() => {
    axios.post('http://localhost:8000/get_receipts', {
      "transaction_date": "2023-08-24",
      "person": {
        "entity": 1,
        "sub_entity": 1
      }
    }, header).then(response => setReceipt(response.data))
  }, []
  )





  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Products</TableCell>
            <TableCell className="tableCell">Serial Number</TableCell>
            <TableCell className="tableCell">Transaction Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receipt.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img className="image" src={row.img} alt="product" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.serial_number}</TableCell>
              <TableCell className="tableCell">{row.transaction_date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
