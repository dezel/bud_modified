import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

// import { ComponentToPrint } from './ComponentToPrint';

const Example = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
      <div id="printable-content">
                    <h3 className="centre" >Republic Bank</h3>
                    <h4 className="centre"><strong>Transaction Details</strong></h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><span>Transaction No.</span></td>
                                <td><span>1234</span></td>
                                <td><span>20-Sep-23 8:50 AM</span></td>
                            </tr>
                            <tr>
                                <td>Amount(GHS)</td>
                                <td><span>3289.3</span></td>
                            </tr>
                            <tr>
                                <td><span>Amount in Words</span></td>
                                <td><span>Thirty-three thousand theee hundred thirty-three Ghana Cedis and thirty-three Pesewas only.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
      </div>
    </div>
  );
};

export default Example
