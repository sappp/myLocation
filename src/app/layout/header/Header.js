import React, { Component } from 'react';

import './Header.css';
import HeaderTitle from './components/HeaderTitle';
import NavbarLinks from './components/NavbarLinks';

class Header extends Component {
  render() {
    return (
      <nav className="Header">
        <HeaderTitle />
        <NavbarLinks />
      </nav>
    );
  }
}

export default Header;
