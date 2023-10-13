import { useState } from "react"
import { Grid } from "@mui/material";
import { Form } from "../../components/useForm";
import Controls from "./../../components/controls/Controls";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import { userRequest } from "../../utils/requestMethod";
import { tryParse } from "../../utils/tryParse";

const PasswordReset = ({ userEdit }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')

    // console.log(userEdit)

    const userData = tryParse(localStorage.getItem('userData'))

    // console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username)


        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/

        if (!password.match(passwordRegex)) {
            // setMessage("Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
            setMessage("Password does not meet the minimum password requirement.")
            setShowConfirmation(true)
            return
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            setShowConfirmation(true)
        }

        const postData = {
            username: userEdit.username,
            password: password,
            admin: userData.user.username
        }

        // console.log(postData)

        userRequest.post('/reset_password', postData)
            .then((res) => {
                // console.log(res.data)
                setPassword('')
                setConfirmPassword('')
            })
    }

    const handleConfirm = () => {
        setShowConfirmation(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="form-wrapper">
                <Grid item xs={6}>
                    <Controls.Input
                        name="password"
                        required
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        size="small"
                        value={password}
                        type="password"

                    />
                    <Controls.Input
                        name="confirmPassword"
                        required
                        label="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        size="small"
                        type="password"
                        value={confirmPassword}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div className="button-group">
                        <Controls.Button
                            className="button"
                            type="submit"
                            text="Submit"
                            size="small"
                        />
                        {
                            showConfirmation && (
                                <ConfirmationDialog
                                    message={message}
                                    onConfirm={handleConfirm}
                                />
                            )
                        }
                    </div>
                </Grid>
            </div>
        </Form>
    )
}

export default PasswordReset

