import { tryParse } from "../../utils/tryParse";

const InitializeUser=()=>{
    // return tryParse(localStorage.getItem('UserData'))

    console.log(tryParse(localStorage.getItem('userData')))
}

export default InitializeUser;