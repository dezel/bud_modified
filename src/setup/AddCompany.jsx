import { useState } from "react"
import Controls from "../components/controls/Controls"
import { userRequest } from "../utils/requestMethod"
import ConfirmationDialog from "../modals/ConfirmationDialog";

import { useForm, Form } from "../components/useForm";
import { Grid } from "@mui/material";

const AddCompany = () => {

    const [companyName, setCompanyName] = useState('')
    const [message, setMessage] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            name: companyName
        }

        userRequest.post('/add_entity', postData)
            .then((res) => {
                setMessage('Company added successfully')
                setShowConfirmation(true)
                setCompanyName('')
            })
            .catch((err) =>{
//console.log(err)
            })
    }
    const handleConfirm = () => {
        setShowConfirmation(false);
      };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <Grid item xl={3}></Grid>
                    <Controls.Input
                        name="companyName"
                        label="Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        size="small"
                        required
                        value={companyName}
                    />
                </div>
                <div className="button-group">
                    <Controls.Button
                        className="button"
                        type="submit"
                        text="Save"
                        size="small"
                    />
                </div>
                {
                    showConfirmation &&
                    (<ConfirmationDialog
                        message={message}
                        onConfirm={handleConfirm}
                    />
                    )}
            </Form>
        </>
    )
}

export default AddCompany