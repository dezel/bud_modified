import React, { useState } from 'react';
import './confirmationDialog.scss'; // Import your CSS file for styling
import Controls from '../components/controls/Controls';

function ConfirmationDialog({ message, onConfirm, onCancel, showCancel, addMessage }) {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-content">
        <p>{message}</p>
        {addMessage &&
          <Controls.Input
            name="deleteMessage"
            label="Please give reason"
            required
            // onChange={(e) => setUsername(e.target.value)}
            size="small"
            // value={username}
          />
        }
        <div>-</div>
        <button onClick={onConfirm}>Ok</button>
        {showCancel &&
          (<button onClick={onCancel}>Cancel</button>)
        }
      </div>
    </div>
  );
}

export default ConfirmationDialog;