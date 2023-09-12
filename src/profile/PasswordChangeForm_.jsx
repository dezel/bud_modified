import { useEffect, useState } from "react";
import "./transactionform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls/Controls";
import {
  initialFValues,
  gender,
  userType,
  entity,
  sub_entity
} from "../components/component-utils/initValues";
import { publicRequest, userRequest } from "../utils/requestMethod";
import { tryParse } from "../utils/tryParse";


const TransactionForma = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState()
  const [clientName, setClientName] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = tryParse( localStorage.getItem('userData'))
    // console.log(userInfo)

    const postData = {
      amount:parseFloat(amount),
      client_name: clientName,
      entity:userInfo.user.person.entity,
      sub_entity:userInfo.user.person.sub_entity,
      receipt_number:receiptNumber,
      person:userInfo.user.id
    }


    userRequest.post('/add_receipt', postData).then(res => console.log(res.data))

  };



  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <Grid item xs={6}>
          <Controls.Input
            name="invoiceNumber"
            label="Invoice Number"
            onChange={(e) =>setReceiptNumber(e.target.value)}
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
            onChange={(e)=>setClientName(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <div className="button-group">
            <Controls.Button
              className="button"
              type="submit"
              text="Submit"
              size="small"
              onClick={handleSubmit}
            />
            <Controls.Button
              className="button"
              text="reset"
              color="secondary"
              size="small"
            />
          </div>
        </Grid>
      </div>
    </Form>
  );
};

export default TransactionForma;
