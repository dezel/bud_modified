import { useEffect, useState } from "react";
import "./transactionform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls/Controls";
import Popup from "../modals/Popup";
import { publicRequest, userRequest } from "../utils/requestMethod";
import { tryParse } from "../utils/tryParse";
import PrintReceiptForm from "./PrintReceiptFrom";




const TransactionForm = () => {
  const [receiptNumber, setReceiptNumber] = useState('')
  const [amount, setAmount] = useState()
  const [clientName, setClientName] = useState()

  const [transaction, setTransaction] = useState()
  const [openPrintForm, setOpenPrintFrom] = useState(false)
  const [selectedTransactionOption, setSelectedTransactionOption] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = tryParse(localStorage.getItem('userData'))
    // console.log(userInfo)


    const postData = {
      amount: parseFloat(amount),
      client_name: clientName,
      entity: userInfo.user.person.entity,
      sub_entity: userInfo.user.person.sub_entity,
      receipt_number: receiptNumber,
      person: userInfo.user.id,
      payment_method:selectedTransactionOption
    }

    // console.log(JSON.stringify(postData))
    userRequest.post('/add_receipt', postData)
      .then((res) => {
        setTransaction(res.data)
        // console.log(res.data)
        setOpenPrintFrom(true)
      }
      )
  };

  const handleSelectChange = (event) => {
    setSelectedTransactionOption(event.target.value);
  };

  const transactionOptions = [
  {
    id: "Electronic",
    label: "Electronic"
  }]

  return (
    <div>


      <Form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <Grid item xs={6}>
            <Controls.Input
              name="invoiceNumber"
              label="Invoice Number"
              onChange={(e) => setReceiptNumber(e.target.value)}
              size="small"
            />
            <Controls.Input
              name="amount"
              label="Amount"
              onChange={(e) => setAmount(e.target.value)}
              size="small"
            />
            <Controls.Input
              name="clientName"
              label="Client Name"
              onChange={(e) => setClientName(e.target.value)}
              size="small"
            />
            {/* <Controls.Input
              name="paymentMode"
              label="Payment Mode"
              size="small"
            /> */}
            <select key={setSelectedTransactionOption} onChange={handleSelectChange}>
              <option key="Cash" value="Cash">Cash</option>
              {transactionOptions.map((option) => (
                <option key={option.id} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={6}>
            <div className="button-group">
              <Controls.Button
                className="button"
                type="submit"
                text="Submit and Print"
                size="small"
                onClick={handleSubmit}
              />
            </div>
          </Grid>
        </div>
      </Form>
      <Popup
        openPopup={openPrintForm}
        setOpenPopup={setOpenPrintFrom}
      >
        <PrintReceiptForm transaction={transaction} />
      </Popup>
    </div>
  );
};

export default TransactionForm;
