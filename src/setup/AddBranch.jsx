import { useState } from "react"
import Controls from "../components/controls/Controls"
import { userRequest } from "../utils/requestMethod"
import ConfirmationDialog from "../modals/ConfirmationDialog";
import { tryParse } from "../utils/tryParse";
import { useForm, Form } from "../components/useForm";
import { Grid } from "@mui/material";
import Select from 'react-select'

const AddBranch = () => {

    const [branchName, setBranchName] = useState('')
    const [message, setMessage] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [entity, setEntity] = useState(1)
    const [location, setLocation] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            branch_name: branchName,
            entity: entity,
            location: location

        }

        // console.log(postData)
        userRequest.post('/add_subentity', postData)
            .then((res) => {

                setMessage('Company added successfully')
                setShowConfirmation(true)
                setBranchName('')
                setLocation('')
                // console.log(res)
            })
            .catch((err) => {
                // console.log(err)
            })
    }


    const companyLookup = () => {

        let companies = tryParse(localStorage.getItem('companies'))



        return companies.map(
            company => {
                return {
                    value: company.id,
                    label: company.name
                }
            }
        )
    }
    const handleConfirm = () => {
        setShowConfirmation(false);
      };
    const handleCompanyChange = (e) => {

        setEntity(e.value)
        // console.log(entity)
        // branchLookup(e.value)
    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <Grid item xs={6}>
                        <Select
                            defaultValue={{ label: "Select Company", value: 0 }}
                            options={companyLookup()}
                            onChange={
                                (e) => {
                                    setEntity(e.value)
                                }
                            }
                            size="small"

                        />
                        <Controls.Input
                            name="branchName"
                            label="Branch Name"
                            onChange={(e) => setBranchName(e.target.value)}
                            size="small"
                            required
                            value={branchName}
                        />
                        <Controls.Input
                            name="location"
                            label="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            size="small"
                            required
                            value={location}
                        />
                        <div className="button-group">
                            <Controls.Button
                                className="button"
                                type="submit"
                                text="Save"
                                size="small"
                            />
                        </div>

                    </Grid>
                    {
                        showConfirmation &&
                        (
                            <ConfirmationDialog
                                message={message}
                                onConfirm={handleConfirm}
                                // onCancel={setShowConfirmation}
                            />
                        )
                    }
                </div>
            </Form>

        </>
    )
}

export default AddBranch