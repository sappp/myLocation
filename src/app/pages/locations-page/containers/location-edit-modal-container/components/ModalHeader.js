import React from 'react';

const ModalHeader = ({ title, onClick}) => (
  <header>
    <h3>{title}</h3>
    <label forhtml="modal_1" className="close" onClick={onClick}>&times;</label>
  </header>
)

export default ModalHeader;
