import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './LocationEditModalContainer.css';
import { locationsActions } from '../../../../redux/locations';
import { categoriesActions } from '../../../../redux/categories';
import ModalHeader from './components/ModalHeader';
import SubmitButton from './components/SubmitButton';
import CancelButton from './components/CancelButton';
import InputField from './components/InputField';
import CoordinatesField from './components/CoordinatesField';
import CategoryField from './components/CategoryField';
import MapContainer from './containers/MapContainer';

class LocationEditModalContainer extends Component {

  submitDisableCheck = () => {
    return (
      this.props.nameField.error !== null ||
        this.props.nameField.name === null ||
          this.props.nameField.name === "" ||
            this.props.coordinatesField.latValue === null ||
              this.props.coordinatesField.lngValue === null
    )
  }

  submit = () => {
    if (this.props.isNew) {
      this.props.addNewLocationOpt()
    } else {
      this.props.editLocationOpt()
    }
  }
  componentWillMount() {
    this.props.loadCategoriesOpt()
  }

  nameFieldShowError = () => {
    return (
      this.props.nameField.error !== null &&
        this.props.nameField.name !== this.props.nameField.defaultValue
    )
  }

  setTitle = () => {
    return (
      this.props.isNew ? "Add New Location" : "Edit Location"
    )
  }

  setMapInitialCenter = () => {
    const lat = this.props.coordinatesField.latValue
    const lng = this.props.coordinatesField.lngValue
    return (
      (lat && lng) ? {lat, lng} : undefined
    )
  }

  onFieldCategoryChange = (categoryId) => {
    const choosenCategory = (
      this.props.categoriesOptions.filter(cat => 
        Number(cat.id) === Number(categoryId))[0]
    )
    this.props.fieldCategoryChange(choosenCategory)
  }

  
  
  render() {
    const {
      nameField,
      categoryField,
      categoriesOptions,
      coordinatesField,
      addressField,
      closeModal,
      fieldNameChangeOpt,
      fieldCoordiChange,
      fieldAddressChange
    } = this.props;

    return (
      <div className="app-modal-style LocationEditModalContainer">
      <div className="modal">
        <label forhtml="modal_1" className="overlay"></label>
        <article>
          <ModalHeader title={this.setTitle()} onClick={closeModal}/>
          <section className=" LocationEditModalContainerSection">
          <div className="LocationEditModalContainerSectionFields">
            <InputField
                label={'Location Name'}
                showError={this.nameFieldShowError()}
                error={nameField.error}
                initialValue={nameField.name}
                onChange={fieldNameChangeOpt}
              />
              <CoordinatesField 
                latValue={coordinatesField.latValue || ""}
                lngValue={coordinatesField.lngValue || ""}
                onChange={fieldCoordiChange}
              />
              <CategoryField 
                initialValue={categoryField.defaultValue || undefined}
                onChange={this.onFieldCategoryChange}
                options={categoriesOptions}
              />
              <InputField
                label={'Address'}
                disabled={true}
                initialValue={addressField.value}
              />
          </div>
          <div className="LocationEditModalContainerSectionMap">
            <MapContainer
              maxHeigth={"300px"}
              center={this.setMapInitialCenter()}
              onClick={fieldCoordiChange}
              onAddressUpdate={fieldAddressChange}
            />
          </div>
            
          </section>
          <footer>
            <SubmitButton disabled={this.submitDisableCheck()} onClick={this.submit}/>
            <CancelButton onClick={closeModal}/>
          </footer>
        </article>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCategoriesOpt: () => categoriesActions.loadCategoriesOpt(),
  closeModal: () => locationsActions.closeModal(),
  fieldNameChangeOpt: (data) => locationsActions.fieldNameChangeOpt(data),
  fieldCategoryChange: (name, categoryId) => locationsActions.fieldCategoryChange(name, categoryId),
  fieldCoordiChange: (latValue, lngValue) => locationsActions.fieldCoordiChange(latValue, lngValue),
  fieldAddressChange: (value) => locationsActions.fieldAddressChange(value),
  addNewLocationOpt: () => locationsActions.addNewLocationOpt(),
  editLocationOpt: () => locationsActions.editLocationOpt()
}, dispatch)

const mapStateToProps = state => {
  const { locations, categories } = state;

  return {
    isNew: locations.modal.isNew,
    nameField: locations.modal.nameField,
    categoryField: locations.modal.categoryField,
    categoriesOptions: categories.list,
    coordinatesField: locations.modal.coordinatesField,
    addressField: locations.modal.addressField
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditModalContainer);
  