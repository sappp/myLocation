import React from 'react';

const ModalFooter = ({ onSubmit, onClose}) => (
  <footer>
    <button className="button" onClick={onSubmit}>
       Submit
    </button>
    <button className="button dangerous" onClick={onClose}>
       Cancel
    </button>
  </footer>
)

export default ModalFooter;
