import React from 'react';

const SubmitButton = ({ disabled, onClick}) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    Submit
  </button>
)

export default SubmitButton;
