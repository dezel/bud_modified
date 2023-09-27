import { Grid } from "@mui/material"
import { useForm, Form } from "../components/useForm"
// import { Component, useRef } from "react"
import '../transactions/receiptPrintPopup.scss'
import Controls from "../components/controls/Controls"
import { Image } from "@mui/icons-material"
import Example from "./Example"
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { tryParse } from "../utils/tryParse"
import dayjs from "dayjs"
// import RBLLogo from '/src/RBLg.ico'
// import JustPrint from './JustPrint'
const PrintReceiptForm = ({ transaction }) => {

  const user = tryParse(localStorage.getItem('userData'))
  const componentRef = useRef();
  return (
    <div

    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 300,
        fontSize:13

      }} ref={componentRef}>
        <div id="printable-content">
          <div >
            <div className="centre">
              {/* <img src='/RBLg.ico'></img><h3  >Republic Bank</h3> */}
              <img style={{width:300, height:80}} src='/RBLogo.png'></img>
              <h4 className="centre"><strong>Transaction Details</strong></h4>
            </div>

            <table>
              <tbody>
                <tr>
                  <td><span>Transaction No.</span></td>
                  <td style={{color:"white"}}><span>-----</span></td>
                  <td><span>{transaction.receipt_number}                    </span></td>
                  {/* <td><span>{dayjs(transaction.transaction_date).format('DD-MMM-YYYY hh:mm a')}</span></td> */}
                </tr>
                <tr>
                  <td><span>Transaction Date</span>:</td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{dayjs(transaction.transaction_date).format('DD-MMM-YYYY hh:mm a')}</span></td>
                </tr>
                <tr>
                  <td>Amount(GHS)</td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{transaction.amount}</span></td>
                </tr>
                <tr>
                  <td><span>Amount in Words</span></td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{transaction.amount_in_words}</span></td>
                </tr>
                <tr>
                  <td><span>Served by</span></td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{user.user.first_name}</span></td>
                </tr>
                <tr>
                  <td><span>Payment Method</span></td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  
                  <td><span>{transaction.payment_method}</span></td>
                </tr>
                <tr>
                  <td><span>Received from</span></td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{transaction.client_name}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactToPrint
        trigger={() => <button>Print Receipt</button>}
        content={() => componentRef.current}
      />
    </div>
  );

}

export default PrintReceiptForm