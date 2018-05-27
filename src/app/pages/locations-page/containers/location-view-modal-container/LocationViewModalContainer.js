import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './LocationViewModalContainer.css';
import { viewLocationActions } from '../../../../redux/viewLocation';
import ModalHeader from './components/ModalHeader';
import MapSection from './components/MapSection';

class LocationViewModalContainer extends Component {

  render() {
    const {
      name,
      address,
      coordinates,
      categoryName,
      closeModal,
    } = this.props;

    return (
      <div className="app-modal-style LocationViewModalContainer">
      <div className="modal">
        <label forhtml="modal_1" className="overlay"></label>
        <article>
          <ModalHeader name={name} category={categoryName} onClick={closeModal} />
          <section className="LocationViewModalContainerSection">
          <div className="LocationViewModalContainerSectionInfo">
            {address}, ({coordinates.lat.toFixed(2)}, {coordinates.lng.toFixed(2)})
          </div>
          <div className="LocationViewModalContainerSectionMap">
            <MapSection markerName={name} coordinates={coordinates} />
          </div>
          </section>
          <footer></footer>
        </article>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  closeModal: () => viewLocationActions.unsetLocation(),
}, dispatch)

const mapStateToProps = state => {
  const { viewLocation } = state;

  return {
    name: viewLocation.location.name,
    address: viewLocation.location.address,
    coordinates: viewLocation.location.coordinates,
    categoryName: viewLocation.location.category.name
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationViewModalContainer);
  