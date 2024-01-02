import { Grid } from "@mui/material"
import { useForm, Form } from "../components/useForm"
// import { Component, useRef } from "react"
import '../transactions/receiptPrintPopup.scss'
import Controls from "../components/controls/Controls"
import { Image } from "@mui/icons-material"
import Example from "./Example"
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { tryParse } from "../utils/tryParse"
import dayjs from "dayjs"
import { defaultBranch, defaultCompany } from "../utils/lookups"
import axios from "axios"
import { publicRequest } from "../utils/requestMethod"
// import RBLLogo from '/src/RBLg.ico'
// import JustPrint from './JustPrint'
const PrintReceiptForm = ({ transaction }) => {
  console.log(transaction)
  const user = tryParse(localStorage.getItem('userData'))
  const componentRef = useRef();

  const [image, setImage] = useState()
  const [funeral, setFuneral] = useState()

  const funeral_ = tryParse(localStorage.getItem('funeral'))

  useEffect(() => {
    // publicRequest.get('/read_image/1')
    //   .then((res) =>
    //     // console.log(res.data)

    //     // setImage(Buffer.from(res.data, 'binary').toString('base64'))
    //     setImage(res.data.image_data)
    //     // console.log(res)
    //   )

    setFuneral(tryParse(localStorage.getItem('funeral')))
  }, [])

  // console.log(funeral_)
  return (
    <div

    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 300,
        fontSize: 13

      }} ref={componentRef}>
        <div id="printable-content">
          <div >
            <div className="centre">
              {/* <img src='/RBLg.ico'></img><h3  >Republic Bank</h3> */}
              {/* <img style={{ width: 150, height: 150 }} src='http://localhost:8000/media/1683905996614_Wj2RDHY.jpeg'></img> */}
              {/* <img src={`data:image/png;base64,${image}`} alt="Django Bytes" /> */}
              {/* <img style={{ width: 150, height: 150 }} src={`data:image/jpeg;base64,${image}`}></img> */}
              <img style={{ width: 200, height: 200 }} src={`data:image/png;base64,${funeral_.photo}`} />
              <h4 className="centre"><strong>{funeral_.deceased}</strong></h4>
              <h4 className="centre"><strong>{funeral_.year_born} - {funeral_.year_died}</strong></h4>
              <h4 className="centre"><strong>Donation</strong></h4>
            </div>
            <table>
              <tbody>
                <tr>
                  {/* <td><span>Transaction No.</span></td>  */}
                  <td style={{ color: "white" }}><span>-----</span></td>
                  <td><span>{transaction.receipt_number}                    </span></td>
                  {/* <td><span>{dayjs(transaction.transaction_date).format('DD-MMM-YYYY hh:mm a')}</span></td> */}
                </tr>
                <tr>
                  <td><span>Transaction Date</span>:</td>
                  <td style={{ color: "white" }}><span>                :</span></td>
                  <td><span>{dayjs(transaction.transaction_date).format('DD-MMM-YYYY hh:mm a')}</span></td>
                </tr>
                <tr>
                  <td>Amount(GHS)</td>
                  <td style={{ color: "white" }}><span>                :</span></td>
                  <td><span>{transaction.amount}</span></td>
                </tr>
                {/* <tr>
                  <td><span>Amount in Words</span></td>
                  <td style={{color:"white"}}><span>                :</span></td>
                  <td><span>{transaction.amount_in_words}</span></td>
                </tr> */}
                <tr>
                  <td><span>Served by</span></td>
                  <td style={{ color: "white" }}><span>                :</span></td>
                  <td><span>{user.user.first_name}</span></td>
                </tr>
                <tr>
                  <td><span>Payment Method</span></td>
                  <td style={{ color: "white" }}><span>                :</span></td>

                  <td><span>{transaction.payment_method}</span></td>
                </tr>
                <tr>
                  <td><span>Received from</span></td>
                  <td style={{ color: "white" }}><span>                :</span></td>
                  <td><span>{transaction.client_name}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <h4 className="centre">{defaultCompany(transaction.entity).label}, {defaultBranch(transaction.sub_entity).label}</h4> */}
          <div>Thank you for your donation</div>
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