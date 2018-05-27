import React from 'react';

const CancelButton = ({ onClick}) => (
  <button className="button dangerous" onClick={onClick}>
    Cancel
  </button>
)

export default CancelButton;
