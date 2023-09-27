import React, { useState } from 'react';
import './confirmationDialog.scss'; // Import your CSS file for styling

function ConfirmationDialog({ message, onConfirm, onCancel, showCancel }) {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Ok</button>
        {showCancel&&
          (<button onClick={onCancel}>Cancel</button>)
        }
      </div>
    </div>
  );
}

export default ConfirmationDialog;