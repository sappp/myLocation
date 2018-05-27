import React from 'react';

const CategoryField = ({ options, initialValue, onChange}) => (
  <div>
    <div className="fieldLabel">
      <span>- Choose Category  -</span>
    </div>
    <select defaultValue={initialValue} onChange={evt => onChange(evt.target.value)}>
      {
        options.map(opt => (
          <option
            key={opt.id}
            value={opt.id}
            
          >
            {opt.categoryName}
          </option>
        ))
      }
    </select>
  </div>
)

export default CategoryField;
