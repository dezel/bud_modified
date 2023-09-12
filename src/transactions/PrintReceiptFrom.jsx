import { Grid } from "@mui/material"
import { useForm, Form } from "../components/useForm"
// import { Component, useRef } from "react"
import '../transactions/receiptPrintPopup.scss'
import Controls from "../components/controls/Controls"
import { Image } from "@mui/icons-material"
import Example from "./Example"
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

// import JustPrint from './JustPrint'

const PrintReceiptForm = ({ transaction }) => {


  const componentRef = useRef();
  return (
    <div>
      <div ref={componentRef}>
        <div id="printable-content">
          <h3 className="centre" >Republic Bank</h3>
          <h4 className="centre"><strong>Transaction Details</strong></h4>
          <table>
            <tbody>
              <tr>
                <td><span>Transaction No.</span></td>
                <td><span>{transaction.receipt.receipt_number}</span></td>
                <td><span>{transaction.receipt.transaction_date}</span></td>
              </tr>
              <tr>
                <td>Amount(GHS)</td>
                <td><span>{transaction.receipt.amount}</span></td>
              </tr>
              <tr>
                <td><span>Amount in Words</span></td>
                <td><span>{transaction.receipt.amount_in_words}</span></td>
              </tr>
            </tbody>
          </table>
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