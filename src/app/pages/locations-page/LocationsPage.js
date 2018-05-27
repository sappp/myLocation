import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LocationsPage.css';

import LocationsTableContainer from './containers/locations-table-container/LocationsTableContainer';
import LocationToolbarContainer from './containers/locations-toolbar-container/LocationToolbarContainer';
import LocationEditModalContainer from './containers/location-edit-modal-container/LocationEditModalContainer';
import LocationViewModalContainer from './containers/location-view-modal-container/LocationViewModalContainer';


class LocationsPage extends Component {
  render() {
    return (
      <div className="LocationsPage">
        <LocationToolbarContainer />
        <LocationsTableContainer />
        {
          this.props.openEditModal && <LocationEditModalContainer />
        }
        {
          this.props.openViewModal && <LocationViewModalContainer />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { locations, viewLocation } = state;

  return {
    openEditModal: locations.modal.open,
    openViewModal: viewLocation.location ? true : false
  };
};

export default connect(mapStateToProps)(LocationsPage);
