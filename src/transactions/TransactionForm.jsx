import { useEffect, useState } from "react";
import "./transactionform.scss";
import { Grid } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls/Controls";
import Popup from "../modals/Popup";
import { publicRequest, userRequest } from "../utils/requestMethod";
import { tryParse } from "../utils/tryParse";
import PrintReceiptForm from "./PrintReceiptFrom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import reactSelect from "react-select";

const TransactionForm = () => {
  const [receiptNumber, setReceiptNumber] = useState('')
  const [amount, setAmount] = useState()
  const [clientName, setClientName] = useState()

  const [transaction, setTransaction] = useState()
  const [openPrintForm, setOpenPrintFrom] = useState(false)
  const [selectedTransactionOption, setSelectedTransactionOption] = useState('')
  const [isElectronic, setIsElectronic] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = tryParse(localStorage.getItem('userData'))
    // console.log(userInfo)


    const postData = {
      amount: parseFloat(amount),
      client_name: clientName,
      entity: userInfo.user.person.entity,
      sub_entity: userInfo.user.person.sub_entity,
      receipt_number: receiptNumber ? receiptNumber : '-',
      person: userInfo.user.id,
      payment_method: isElectronic ? "Electronic" : "Cash",
      electronic_trans_type: isElectronic ? selectedTransactionOption.label : '-'
    }

    console.log(JSON.stringify(postData))
    userRequest.post('/add_receipt', postData)
      .then((res) => {
        let freshTrans = res.data
        console.log(freshTrans)
        setTransaction(res.data.receipt)
        console.log(res.data.receipt)
        setOpenPrintFrom(true)
      }
      )
  };

  const transOptions = [
    { value: 1, label: 'Momo' },
    { value: 2, label: 'Card' }
  ]

  const handleSelectChange = (event) => {
    event.preventDefault()
    setSelectedTransactionOption(event.target.value);
    console.log(selectedTransactionOption)
  };
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        // backgroundColor: isFocused ? '#FFC0CB': null,
        backgroundColor: "#333a33",
        color: '#FFFFFF', //"#333333",
        height: '100%'
      };
    }
  };
  return (
    <div>


      <Form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={isElectronic} onChange={(e) => setIsElectronic(e.target.checked)} />}
              label="Is Electronic"
            />
            <Controls.Input
              name="amount"
              label="Amount"
              onChange={(e) => setAmount(e.target.value)}
              size="small"
              required
              />
            <Controls.Input
              name="clientName"
              label="Client Name"
              onChange={(e) => setClientName(e.target.value)}
              size="small"
              required
              />
            {/* <Controls.Input
              name="paymentMode"
              label="Payment Mode"
              size="small"
            /> */}
            {/* <select key={setSelectedTransactionOption} onChange={handleSelectChange}>
              <option key="Cash" value="Cash">Cash</option>
              {transactionOptions.map((option) => (
                <option key={option.id} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select> */}
              {
                isElectronic ?
                  <>
                    <Controls.Input
                      name="invoiceNumber"
                      label="Invoice Number"
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      required={isElectronic}
                      size="small"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        label="Electronic Type"
                        onChange={handleSelectChange}
                        required={isElectronic}
                      >
                        <MenuItem key={2} value="Momo">Mobile Money</MenuItem>
                        <MenuItem key={3} value="Card">Card</MenuItem>
                      </Select> */}
                      <Select styles={colourStyles} required={isElectronic} options={transOptions} onChange={(e) =>setSelectedTransactionOption(e)}></Select>
                    </FormControl></>
                  :
                  <>
                  </>
              }
          </Grid>
          <Grid item xs={6}>
            <div className="button-group">
              <Controls.Button
                className="button"
                type="submit"
                text="Submit and Print"
                size="small"
              // onClick={handleSubmit}
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
