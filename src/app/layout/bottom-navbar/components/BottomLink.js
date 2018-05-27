import React from 'react';
import { Link } from 'react-router-dom';

const BottomLink = ({hrefPath, hrefName, isActive}) => (
  <Link
    className={`pseudo button toggle ${isActive ? 'active' : '' }`}
    to={hrefPath}
  >
   {hrefName}
  </Link>
)

export default BottomLink;
