import React, { useState, useEffect } from 'react';

const Calculate = ({ transactions }) => {
  const [data, setData] = useState(
    transactions
  );
//console.log(data)
  const [sum, setSum] = useState(0);
  const [newTrans, setNewTrans] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      let totalSum = 0;

//console.log('run')
      // Calculate the sum of the 'value' field in each object
      data.forEach(item => {
        totalSum += item.id;
      });
      // const total = transactions.reduce((accum, curVal) => accum + parseFloat(curVal.amount), 0)
//console.log(transactions)
      let total = 0.0
      transactions.forEach(item => {
        total += item.id;
      })

      // Update the sum state with the calculated total sum
      setSum(totalSum);
//console.log(sum)
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Include 'data' in the dependency array to re-run the effect when 'data' changes

  return (
    <div>
      <h2>Calculate Sum of Fields in Array Object</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>ID: {item.id}, Value: {item.amount}</li>
        ))}
      </ul>
      <p>Sum of Values: {sum}</p>
    </div>
  );
};

export default Calculate;