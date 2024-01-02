import { useState } from "react"
import Controls from "../components/controls/Controls"
import { userRequest } from "../utils/requestMethod"
import ConfirmationDialog from "../modals/ConfirmationDialog";
import { tryParse } from "../utils/tryParse";
import { useForm, Form } from "../components/useForm";
import { Grid } from "@mui/material";
import Select from 'react-select'
// import './addBranchFrom.scss'
import './addBranchForm.scss'

const AddFuneral = () => {

    const [deceased, setDeceased] = useState('')
    const [yearDied, setYearDied] = useState('')
    const [yearBorn, setYearBorn] = useState('')
    const [photo, setPhoto] = useState(null)
    const [message, setMessage] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            deceased: deceased,
            year_born: yearBorn,
            year_died: yearDied,
            photo: photo
        }
        let data = new FormData();
        data.append('deceased', deceased);
        data.append('year_born', yearBorn);
        data.append('year_died', yearDied);
        data.append('photo', photo)
        console.log(photo)
        userRequest.put('/update_funeral', data)
            .then((res) => {

                setMessage('Funeral added successfully')
                setShowConfirmation(true)
                setDeceased('')
                setYearDied('')
                setYearBorn('')
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

        // setEntity(e.value)
        // console.log(entity)
        // branchLookup(e.value)
    }

    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            console.log({ data, isDisabled, isFocused, isSelected });
            return {
                ...styles,
                backgroundColor: isFocused ? "#999999" : null,
                color: "#333333"
            };
        }
    };


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <Grid item xs={6}>


                        <Controls.Input
                            name="deceased"
                            label="Name"
                            onChange={(e) => setDeceased(e.target.value)}
                            size="small"
                            required
                            value={deceased}
                        />
                        <Controls.Input
                            name="location"
                            label="Year Born"
                            onChange={(e) => setYearBorn(e.target.value)}
                            size="small"
                            required
                            value={yearBorn}
                        />
                        <Controls.Input
                            name="location"
                            label="Year Born"
                            onChange={(e) => setYearDied(e.target.value)}
                            size="small"
                            required
                            value={yearDied}
                        />

                        <input onChange={(e) => setPhoto(e.target.files[0])} type="file" />
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

export default AddFuneral