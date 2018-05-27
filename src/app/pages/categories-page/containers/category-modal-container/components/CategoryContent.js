import React from 'react';

const CategoryContent = ({ title, onNameChange}) => (
  <section className="content">
    <input type="text" placeholder="Name" onChange={evt => onNameChange(evt.target.value)} />
  </section>
)

export default CategoryContent;
