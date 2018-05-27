import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { MoonLoader } from 'react-spinners';

import { categoriesActions } from '../../../../redux/categories';

import './CategoriesTableContainer.css';

import TableHead from './components/TableHead';
import EmptyCategoryItem from './components/EmptyCategoryItem';
// import CategoryItem from './components/CategoryItem';


class CategoriesTableContainer extends Component {

  componentWillMount() {
    this.props.loadCategoriesOpt()
  }

  componentWillUnmount() {
    this.props.unselectCategory()
  }

  render() {
    const {
      list,
      loading,
      selectedCategoryId,
      selectCategory
    } = this.props;

    return (
      <div className="CategoriesTableContainer">
        <table className="primary">
          <TableHead />
          
          <tbody>
            <tr><td><MoonLoader loading={loading} /></td></tr>
            {
              !loading && list.length === 0 && <EmptyCategoryItem />
            }
            {
              !loading && list.map(category => (
                <tr
                  key={category.id + category.categoryName}
                  className={`CategoriesTableContainerItem ${selectedCategoryId === category.id ? 'CategoriesTableContainerItemSelected' : ''}`}
                  onClick={() => selectCategory(category.id)}
                >
                  <td>{category.categoryName}</td>
                  <td>{category.total}</td>
                </tr>
                
              ))
            }
            
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCategoriesOpt: () => categoriesActions.loadCategoriesOpt(),
  selectCategory: (data) => categoriesActions.selectCategory(data),
  unselectCategory: () => categoriesActions.unselectCategory(),
}, dispatch)

const mapStateToProps = (state) => {
  const { categories } = state;

  return {
    list: categories.list,
    selectedCategoryId: categories.selectedCategoryId,
    loading: categories.loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTableContainer);
