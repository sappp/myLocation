import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { MoonLoader } from 'react-spinners';

import { categoriesActions } from '../../../../redux/categories';
import { locationsActions } from '../../../../redux/locations';
import { sortFilterActions } from '../../../../redux/sortFilter';

import './LocationsTableContainer.css';

import LocationTableHead from './components/LocationTableHead';
import EmptyLocationTable from './components/EmptyLocationTable';
import CategoryFilter from './components/CategoryFilter';

class LocationsTableContainer extends Component {

  componentWillMount() {
    this.props.loadCategoriesOpt()
    this.props.loadLocationsOpt()
  }

  componentWillUnmount() {
    this.props.unselectLocation()
    this.props.sortNameOff()
    this.props.filterByCategory(null)
  }

  onSortNameClick = () => {
    if (this.props.sortName.isOn) {
      this.props.toggleSortAz()
    } else {
      this.props.sortNameOn()
    }
  }

  onCategoryFilterClick = (value) => {
    this.props.unselectLocation()
    if (value === 'SHOW ALL') {
      this.props.filterByCategory(null)
    } else {
      this.props.filterByCategory(value)
    }
  }

  render() {
    const {
      list,
      loading,
      sortName,
      categoryFilterId,
      categoriesOptions,
      selectedLocationId,
      selectLocation
    } = this.props;

    return (
      <div className="LocationsTableContainer">
        <CategoryFilter
          options={categoriesOptions}
          initialValue={categoryFilterId}
          onChange={this.onCategoryFilterClick}
        />
        <table className="primary">
          <LocationTableHead onNameClick={this.onSortNameClick} sort={sortName.isOn} sortAz={sortName.az} />
          
          <tbody>
            <tr><td><MoonLoader loading={loading} /></td></tr>
            {
              !loading && list.length === 0 && <EmptyLocationTable />
            }
            {
              !loading && list.map(location => (
                <tr
                  key={location.name}
                  className={`LocationsTableContainerItem ${selectedLocationId === location.id ? 'LocationsTableContainerItemSelected' : ''}`}
                  onClick={() => selectLocation(location.id)}
                >
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>{location.category.name}</td>
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
  loadLocationsOpt: () => locationsActions.loadLocationsOpt(),
  selectLocation: (data) => locationsActions.selectLocation(data),
  unselectLocation: () => locationsActions.unselectLocation(),
  sortNameOn: () => sortFilterActions.sortNameOn(),
  sortNameOff: () => sortFilterActions.sortNameOff(),
  toggleSortAz: () => sortFilterActions.toggleSortAz(),
  filterByCategoryShowAll: () => sortFilterActions.filterByCategoryShowAll(),
  filterByCategory: (catId) => sortFilterActions.filterByCategory(catId)
}, dispatch)

const mapStateToProps = (state) => {
  const { locations, categories, sortFilter } = state;

  const sort = (locs, isOn, az) => {
    if (!isOn) {
      return locs
    }
    if (az) {
      return locs.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      return locs.sort((a, b) => a.name.localeCompare(b.name) * -1)
    }
  }

  const filter = (locs, categoryId) => {
    if (categoryId === null || categoryId === "show all") {
      return locs
    } else {
      return locs.filter(loc => Number(loc.category.id) === Number(categoryId))
    }
  }

  const categoriesOptions = [...categories.list, {id: 'show all', categoryName: 'SHOW ALL'}]
  return {
    list: sort(
      filter(locations.list, sortFilter.category),
      sortFilter.sortName.isOn,
      sortFilter.sortName.az
    ),
    loading: locations.loading,
    selectedLocationId: locations.selectedLocationId,
    sortName: sortFilter.sortName,
    categoryFilterId: sortFilter.category || "show all",
    categoriesOptions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTableContainer);
