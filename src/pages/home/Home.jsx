import "./home.scss";
import { useEffect, useState } from "react";
import Sidebar from "./../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "./../../components/chart/Chart";
import List from "../../components/table/Table";
import { publicRequest } from "../../utils/requestMethod";
import { Navigate } from "react-router-dom";
import { tryParse } from "../../utils/tryParse";
const Home = () => {
  // const [authenticated,setAuthenticated] =useState(null)
  const userData = tryParse(localStorage.getItem('userData'))
  const [user,setUser] = useState([])
  
  // if(userData){
  //   setAuthenticated(userData)
  // }
  // const navigate = useNavigate()

  // useEffect(()=>{
  //   const loggedInUser = localStorage.getItem('userData')

  //   if(loggedInUser){
  //     setAuthenticated(loggedInUser)
  //   }
  // },[])
// let auth= false
//   console.log(authenticated)

let queryData = {
  transaction_date: "2023-08-24",
  person: {
    entity: 1,
    sub_entity: 1
  }
}

const getUsersDataForEzekiel = async () => {
  const res = await publicRequest.post('/get_receipts',queryData)
  console.log('Response',res)
  setUser(res.data)

}

useEffect(()=>{
  getUsersDataForEzekiel()

},[])
console.log(user)






if(!userData){
  return <Navigate replace to="/login"/>;
} 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar user={userData}/>
        <div className="widgets">
          {/* <Widget type="user" /> */}
          {/* <Widget type="order" /> */}
          {/* <Widget type="earning" /> */}
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart aspect={2 / 1} title="Last 6 Months(Revenue)" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">{user ? user[0].amount_in_words : ""}</div>
          <List data = {user? user : []}/>
        </div>
      </div>
    </div>
  );
};


export default Home;
