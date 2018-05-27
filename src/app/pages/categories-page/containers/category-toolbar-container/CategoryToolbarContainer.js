import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import './CategoryToolbarContainer.css';

import { categoriesActions } from '../../../../redux/categories';
import { sortFilterActions } from '../../../../redux/sortFilter';

import ToolbarTitle from './components/ToolbarTitle';
import ToolbarButton from './components/ToolbarButton';

class CategoryToolbarContainer extends Component {

  removeBtnDisableCheck = () => {
    return (
      this.props.selectedItem === null ||
      this.props.selectedItem.total > 0
    )
  }

  removeBtnTooltip = () => {
    if (this.props.selectedItem !== null && this.props.selectedItem.total > 0) {
      return "This is category cannot be deleted. remove locations first."
    }
  }

  openEditCategory = () => {
    this.props.editCategory(this.props.selectedItem.categoryName || null)
  }

  viewCategoriesLocations = () => {
    this.props.filterByCategory(this.props.selectedItem.id)
    this.props.goToLocation()
  }

  render() {
    const {
      selectedItem,
      newCategory,
      removeSelectedCategoryOpt
    } = this.props;

    return (
      <div className="AppTopToolbar">
        <ToolbarTitle title={"CATEGORIES"} />
        <nav className="AppToolbarButtonsContainer">
          <div className="menu">
            <ToolbarButton
              btnName={'Add'}
              specialClassName={'AppToolbarButtonsContainerAddButton'}
              onClick={newCategory}
            />
            <ToolbarButton
              btnName={'View'}
              disabled={selectedItem === null}
              onClick={this.viewCategoriesLocations}
            />
            <ToolbarButton
              btnName={'Edit'}
              disabled={selectedItem === null}
              onClick={this.openEditCategory}
            />
            <ToolbarButton
              btnName={'Remove'}
              specialClassName={'AppToolbarButtonsContainerRemoveButton'}
              disabled={this.removeBtnDisableCheck()}
              dataTooltip={this.removeBtnTooltip()}
              onClick={removeSelectedCategoryOpt}
            />
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  editCategory: (nameField) => categoriesActions.editCategory(nameField),
  newCategory: () => categoriesActions.newCategory(),
  removeSelectedCategoryOpt: () => categoriesActions.removeSelectedCategoryOpt(),
  filterByCategory: (catId) => sortFilterActions.filterByCategory(catId),
  goToLocation: () => push('/')
}, dispatch)

const mapStateToProps = state => {
  const { categories } = state;

  const selectedItem = (
    (categories.selectedCategoryId !== null) ?
      categories.list.filter(cat => cat.id === categories.selectedCategoryId)[0] : null
  )

  return {
    categories,
    selectedItem
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryToolbarContainer);
