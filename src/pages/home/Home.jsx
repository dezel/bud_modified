import "./home.scss";
import { useEffect, useState } from "react";
import Sidebar from "./../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "./../../components/chart/Chart";
import List from "../../components/table/Table";
import { publicRequest, userRequest } from "../../utils/requestMethod";
import { Navigate } from "react-router-dom";
import { tryParse } from "../../utils/tryParse";
const Home = () => {
  // const [authenticated,setAuthenticated] =useState(null)

  const userData = tryParse(localStorage.getItem('userData'))

  const [amount, setAmount] = useState(0)
  const [user, setUser] = useState([])
  const [company, setCompany] = useState({})
  const [transactions, setTransactions] = useState([])

  let currentDateTime = new Date()

  let currentDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth()+1}-${currentDateTime.getDate()}`

  let queryData = {
    transaction_date: currentDate,
    person: {
      entity: userData.user.person.entity,
      sub_entity: userData.user.person.sub_entity
    }
  }

  // console.log(queryData)
  const getTransactions = async () => {
    const res = await userRequest.post('/get_receipts', queryData)
      .then(res => {
        setTransactions(res.data)
        // console.log(transactions)

        let sum = 0
        for (var i = 0; i < transactions.length; i++) {
          // console.log(transactions[i].amount)
          sum += parseFloat(transactions[i].amount)
        }
        // console.log(sum)
        setAmount(sum)
      })
      .then(
        getCompany()
      )
  }

  const getCompany = async () => {
    // console.log(userData.user.person.entity)
    const res = await userRequest.get('/get_entity/' + userData.user.person.entity)
      .then(res => setCompany(res.data))
    // .then(res => console.log(res.data))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  if (!userData) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar company={company} user={userData} />
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="order" /> */}
          <Widget type="earning" amount={amount} />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured/> */}
          {/* <Chart aspect={2 / 1} title="Last 6 Months(Revenue)" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">{ }</div>
          <List transactions={transactions} />
        </div>
      </div>
    </div>
  );
};


export default Home;
