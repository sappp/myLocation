import React from 'react';

const ModalHeader = ({ name, category, onClick}) => (
  <header>
    <h3>{name} | {category}</h3>
    <label forhtml="modal_1" className="close" onClick={onClick}>&times;</label>
  </header>
)

export default ModalHeader;
