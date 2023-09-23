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

  const refresh = () => {
    if (transactions) {


      let sum = 0
      for (var i = 0; i < transactions.length; i++) {
        // console.log(transactions[i].amount)
        sum += parseFloat(transactions[i].amount)
      }
      // console.log(sum)
      setAmount(sum)
    }
  }

  // console.log(queryData)
  const getTransactions = async () => {
    await userRequest.post('/get_receipts', queryData)
      .then(res => {
        setTransactions(res.data)
        refresh()

      })
      .then(
        getCompany()
      )
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
        console.log(res.data)
        localStorage.setItem('companies', JSON.stringify(res.data))
      }
      )
  }


  // const [companyOptions, setCompanyOptions] = useState()

  useEffect(() => {
    getTransactions()
    getSubEntities()
    getEntities()
    // setCompanyOptions(localStorage.getItem('companies'))
  }, [])

  // console.log(companyOptions)

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
        <div className="listContainer">
          <div className="listTitle">{ }</div>
          <List transactions={transactions} />
        </div>
      </div>
    </div>
  );
};


export default Home;
