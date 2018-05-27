import React from 'react';
import { IoAndroidArrowDropright, IoAndroidArrowDropdown, IoAndroidArrowDropup  } from 'react-icons/lib/io';


const LocationTableHead = ({sort, sortAz, onNameClick}) => (
  <thead>
    <tr>
      <th
        className="LocationTableHeadThPointer"
        onClick={onNameClick}
      >
        {
          !sort && <IoAndroidArrowDropright />
        }
        {
          (sort && sortAz) && <IoAndroidArrowDropdown />
        }
        {
          (sort && !sortAz) && <IoAndroidArrowDropup />
        }
        <span>Name</span>
      </th>
      <th>Address</th>
      <th>Category</th>
    </tr>
  </thead>
)

export default LocationTableHead;
