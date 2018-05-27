import React, { Component } from 'react';
import { connect } from 'react-redux';

import './BottomNavbar.css';
import BottomLink from './components/BottomLink';

class BottomNavbar extends Component {
  render() {
    const {
      currentPage
    } = this.props

    return (
      <div className="BottomNavbar">
        <div className="tabs two">
          <BottomLink
            hrefPath={'/'}
            hrefName={'Locations'}
            isActive={currentPage === '/'}
          />
          <BottomLink
            hrefPath={'/categories'}
            hrefName={'Categories'}
            isActive={currentPage === '/categories'}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { router } = state;
  const currentPage = router.location.pathname
  return {
    currentPage
  };
};

export default connect(mapStateToProps)(BottomNavbar);

