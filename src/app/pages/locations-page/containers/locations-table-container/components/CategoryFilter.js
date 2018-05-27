import React from 'react';

const CategoryFilter = ({ options, initialValue, onChange}) => (
<div className="categoryFilter">
  <span>Sort By Category</span>
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

export default CategoryFilter;
