import { useState } from 'react';

function GetReceipt() {
    // state variables for posts and error
    const [receipt, setReceipt] = useState([]);
    const [error, setError] = useState('');

    
    console.log(receipt)

    return (
        receipt
    );
}

export default GetReceipt;
