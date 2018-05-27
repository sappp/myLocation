import React from 'react';

const NewCategoryItem = ({}) => (
  // <tr
  //   className={`CategoriesPageTableItem ${selected ? 'CategoriesPageTableItemSelected' : ''}`}
  //   onClick={() => onClick(id)}
  // >
  //   <td>{categoryName}</td>
  //   <td>{totalLocations}</td>
  // </tr>
  <tr>
    <td><input type="text" placeholder="Name" /></td>
    <td>#</td>
  </tr>
)

export default NewCategoryItem;
