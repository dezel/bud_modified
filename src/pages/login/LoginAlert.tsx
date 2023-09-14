import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function LoginAlert (loginError) {
// assume you have a state variable called loginError that holds the error message
// and a function called clearError that clears the error message
return (
<div className="login-alert">
{loginError && ( // display the alert only if loginError is not empty
<Alert // Alert component to display the message
severity="error" // severity prop to specify the type of alert
onClose={clearError} // onClose prop to specify a function that clears the error message
>
<AlertTitle>Error</AlertTitle> // AlertTitle subcomponent to display the title
{loginError} // display the error message
</Alert>
)}
</div>
);
}

export default LoginAlert;
