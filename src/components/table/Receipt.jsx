import axios from 'axios';
import { useState } from 'react';

function GetReceipt() {
    // state variables for posts and error
    const [receipt, setReceipt] = useState([]);
    const [error, setError] = useState('');

    // React method to return data from API using axios
    const getReceipts = () => {
        // make a GET request to the API endpoint
        axios.post('http://localhost:8000/get_receipts', {
            "transaction_date": "2023-08-24",
            "person": {
                "entity": 1,
                "sub_entity": 1
            }
        }).then(response => {
            // handle the response
            // get the data from the response object
            const data = response.data;
            // update the posts state with the data
            setReceipt(data);
            // clear the error state
            setError('');
        })
            .catch(error => {
                // handle the error
                // get the message from the error object
                const message = error.message;
                // update the error state with the message
                setError(message);
                // clear the posts state
                setReceipt([]);
            });
    };

    console.log(receipt)

    return (
        receipt
    );
}

export default GetReceipt;
