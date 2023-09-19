import { tryParse } from "../../utils/tryParse";

const InitializeUser=()=>{
    // return tryParse(localStorage.getItem('UserData'))

    return (tryParse(localStorage.getItem('userData')))
}

export default InitializeUser;