import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CategoriesPage.css';
import CategoriesTableContainer from './containers/categories-table-container/CategoriesTableContainer';
import CategoryToolbarContainer from './containers/category-toolbar-container/CategoryToolbarContainer';
import CategoryModalContainer from './containers/category-modal-container/CategoryModalContainer';

class CategoriesPage extends Component {

  render() {

    return (
      <div className="CategoriesPage">
        <CategoryToolbarContainer />
        <CategoriesTableContainer />
        {
          this.props.openModal && <CategoryModalContainer />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categories } = state;

  return {
    openModal: categories.modal.open
  };
};
export default connect(mapStateToProps)(CategoriesPage);
