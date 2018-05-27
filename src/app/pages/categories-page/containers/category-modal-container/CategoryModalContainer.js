import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './CategoryModalContainer.css';
import { categoriesActions } from '../../../../redux/categories';
import ModalHeader from './components/ModalHeader';
import SubmitButton from './components/SubmitButton';
import CancelButton from './components/CancelButton';

import CategoryNameField from './components/CategoryNameField';

class CategoryModalContainer extends Component {

  submitDisableCheck = () => {
    return (
      this.props.nameField.error !== null ||
        this.props.nameField.name === null ||
          this.props.nameField.name === "" ||
            this.props.nameField.name === this.props.nameField.defaultValue ||
              this.props.loading
    )
  }

  submit = () => {
    console.log(this.props.loading)
    if(this.props.loading) {
      return
    }
    if (this.props.isNew) {
      this.props.addCategoryOpt()
    } else {
      this.props.editSubmitOpt()
    }
  }

  nameFieldShowError = () => {
    return (
      this.props.nameField.error !== null &&
        this.props.nameField.name !== this.props.nameField.defaultValue
    )
  }

  setTitle = () => {
    return (
      this.props.isNew ? "Add New Category" : "Edit Category"
    )
  }

  render() {
    const {
      nameField,
      closeModal,
      fieldNameChangeOpt
    } = this.props;

    return (
      <div className="app-modal-style CategoryModalContainer">
      <div className="modal">
        <label forhtml="modal_1" className="overlay"></label>
        <article>
          <ModalHeader title={this.setTitle()} onClick={closeModal}/>
          <section className="content">
            <CategoryNameField showError={this.nameFieldShowError()} error={nameField.error} initialValue={nameField.defaultValue} onChange={fieldNameChangeOpt} />
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
  closeModal: () => categoriesActions.closeModal(),
  fieldNameChangeOpt: (data) => categoriesActions.fieldNameChangeOpt(data),
  editSubmitOpt: () => categoriesActions.editSubmitOpt(),
  addCategoryOpt: () => categoriesActions.addCategoryOpt()
}, dispatch)

const mapStateToProps = state => {
  const { categories } = state;

  return {
    loading: categories.loading,
    isNew: categories.modal.isNew,
    nameField: categories.modal.nameField,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryModalContainer);
  