import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './LocationToolbarContainer.css';

import { locationsActions } from '../../../../redux/locations';
import { viewLocationActions } from '../../../../redux/viewLocation';

import ToolbarTitle from './components/ToolbarTitle';
import ToolbarButton from './components/ToolbarButton';

class LocationToolbarContainer extends Component {

  openEditLocation = () => {
    const thisLocationObj = this.props.locationsList.filter(loc => (
      Number(loc.id) === Number(this.props.selectedLocationId)
    ))[0]
    this.props.openModalEditLocation(thisLocationObj)
  }

  render() {
    const {
      selectedLocationId,
      newLocation,
      removeLocationOpt,
      setLocationOpt
    } = this.props;

    return (
      <div className="AppTopToolbar">
        <ToolbarTitle title={"LOCATIONS"} />
        <nav className="AppToolbarButtonsContainer">
          <div className="menu">
            <ToolbarButton
              btnName={'Add'}
              specialClassName={'AppToolbarButtonsContainerAddButton'}
              onClick={newLocation}
            />
            <ToolbarButton
              btnName={'View'}
              disabled={selectedLocationId === null}
              onClick={setLocationOpt}
            />
            <ToolbarButton
              btnName={'Edit'}
              disabled={selectedLocationId === null}
              onClick={this.openEditLocation}
            />
            <ToolbarButton
              btnName={'Remove'}
              specialClassName={'AppToolbarButtonsContainerRemoveButton'}
              disabled={selectedLocationId === null}
              onClick={removeLocationOpt}
            />
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  newLocation: () => locationsActions.newLocation(),
  removeLocationOpt: () => locationsActions.removeLocationOpt(),
  openModalEditLocation: (locObj) => locationsActions.openModalEditLocation(locObj),
  setLocationOpt: () => viewLocationActions.setLocationOpt()
}, dispatch)

const mapStateToProps = state => {
  const { locations } = state;

  return {
    locationsList: locations.list,
    selectedLocationId: locations.selectedLocationId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationToolbarContainer);
