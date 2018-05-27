import React from 'react';

const CategoryNameField = ({ initialValue, showError, error, onChange}) => (
  <section className="content">
    <div className="app-modal-style-field-label"><span>-  Category Name  -</span></div>
    <input type="text" placeholder="Name" defaultValue={initialValue} onChange={evt => onChange(evt.target.value)} />
    <span className="app-modal-style-field-error">{showError ? error: ''}</span>
  </section>
)

export default CategoryNameField;
