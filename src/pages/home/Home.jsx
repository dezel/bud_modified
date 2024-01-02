import "./home.scss";
import { useEffect, useState } from "react";
import Sidebar from "./../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Chart from "./../../components/chart/Chart";
import List from "../../components/table/Table";
import { userRequest } from "../../utils/requestMethod";
import { Navigate } from "react-router-dom";
import { tryParse } from "../../utils/tryParse";
import dayjs from "dayjs";
import { Summarize } from "@mui/icons-material";
import { UpdateTransactions } from "./UpdateTransaction";
import Calculate from "./Calculate";
// import { dateCalendarClasses } from "@mui/x-date-pickers-pro";
// import { set } from "date-fns";
// import { ConstructionOutlined } from "@mui/icons-material";
const Home = () => {
  // const [authenticated,setAuthenticated] =useState(null)

  const userData = tryParse(localStorage.getItem('userData'))

  const [amount, setAmount] = useState(0)
  // const [user, setUser] = useState([])
  const [company, setCompany] = useState({})
  const [transactions, setTransactions] = useState([])
  const [donations, setDonations] = useState([])
  const [total, setTotal] = useState(0)
  const [totalDonation, setTotalDonation] = useState(0)
  // let currentDateTime = new Date()

  // let currentDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`

  let queryData = {
    start_date: dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
    end_date: dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
    person: {
      entity: userData.user.person.entity,
      sub_entity: userData.user.person.sub_entity
    }
  }

  // const refresh = () => {
  //   if (transactions) {


  //     let sum = 0
  //     for (var i = 0; i < transactions.length; i++) {
  //       // console.log(transactions[i].amount)
  //       sum += parseFloat(transactions[i].amount)
  //     }
  //     // console.log(sum)
  //     setAmount(sum)
  //   }
  // }

  const refresh = () => {
    if (transactions) {
      let sum = 0
      setTotal(0)
      // let sum = 0
      for (var i = 0; i < transactions.length; i++) {
        // console.log(transactions[i].amount)
        sum += parseFloat(transactions[i].amount)
        // setTotal(total+parseFloat(transactions[i].amount))
      }
      // console.log(sum)
      // setAmount(sum)
      // console.log(total)
      setTotal(sum)
      console.log(sum)
    }

    if (donations) {
      let sum = 0
      setTotalDonation(0)
      for (var i = 0; i < donations.length; i++) {
        sum += parseFloat(donations[i].amount)
      }
  
      setTotalDonation(sum)
      console.log(sum)
    }
  }


  // console.log(queryData)
  const getTransactions = async () => {
    await userRequest.post('/get_receipts', queryData)
      .then(res => {
        setTransactions(res.data)
        console.log(res.data)
        refresh()
      })
      .then(
        getCompany()
      )
  }


  const getDonations = async () => {
    await userRequest.post('/get_donations', queryData)
      .then(res => {
        setDonations(res.data)
        console.log(res.data)
        refresh()
      })
  }

  const getCompany = async () => {
    // console.log(userData.user.person.entity)
    await userRequest.get('/get_entity/' + userData.user.person.entity)
      .then(res => setCompany(res.data))
    // .then(res => console.log(res.data))
  }




  const getSubEntities = async () => {
    await (userRequest.get('/entities_subs'))
      .then((res) => {
        localStorage.setItem('branches', res.data)
      })
  }


  const getEntities = async () => {
    await (userRequest.get('/get_entities'))
      .then((res) => {
        localStorage.setItem('companies', JSON.stringify(res.data))
      }
      )
  }

  const [sum, setSum] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(transactions.length)
  //     let initVal = 0
  //     // const total = transactions.reduce((accum, curVal) => accum + parseFloat(curVal.amount), 0)

  //     let total = 0
  //     transactions.forEach(item => {
  //       total += item.amount
  //     })

  //     console.log(total)
  //     setSum(total)
  //     console.log(sum)
  //   }, 3000)
  //   return () => clearInterval(interval)
  // }, [])



  const [counter, setCounter] = useState(1)
  // const [companyOptions, setCompanyOptions] = useState()
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter(previusCount => previusCount + 1)
  //     const total = transactions.reduce((accum, curVal) => accum + parseFloat(curVal.amount), 0)

  //     console.log(counter)
  //     console.log(total)
  //     refresh()
  //   }, 3000);
  //   return () => clearInterval(interval)

  // }, [])

  useEffect(() => {
    getTransactions()
    getSubEntities()
    getEntities()
    getDonations()
    refresh()
    // setCompanyOptions(localStorage.getItem('companies'))
  }, [])

  // console.log(companyOptions)

  if (!userData) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div className="home">
      {/* <Calculate transactions={transactions} /> */}
      <Sidebar />
      <div className="homeContainer">
        <Navbar company={company} user={userData} />
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="order" /> */}
          <Widget type="collections" amount={total} />
          <Widget type="donations" amount={totalDonation} />
          <button onClick={(e) => {
            getTransactions()
            getEntities()
          }}>Refresh</button>
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured/> */}
          {/* <Chart aspect={2 / 1} title="Last 6 Months(Revenue)" /> */}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">{ }</div>
          <List transactions={transactions} />
        </div> */}
      </div>
    </div>
  );
};


export default Home;
