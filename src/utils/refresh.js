
const [transactions, setTransactions] = useState()
const userData = tryParse(localStorage.getItem('userData'))





const getTransactions = async () => {
let queryData = {
    start_date: dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
    end_date: dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
    person: {
      entity: userData.user.person.entity,
      sub_entity: userData.user.person.sub_entity
    }
  }
    await userRequest.post('/get_receipts', queryData)
      .then(res => {
        setTransactions(res.data)
        refresh()

      })
      
  }

export const refresh = () => {
    if (transactions) {


      let sum = 0
      for (var i = 0; i < transactions.length; i++) {
        sum += parseFloat(transactions[i].amount)
      }
      setAmount(sum)
    }
  }