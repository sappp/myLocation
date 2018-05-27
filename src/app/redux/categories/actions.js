import types from './types'
import * as categoriesApi from '../../services/categoriesApi';


const fetchCategories = () => ({
  type: types.FETCH_CATEGORIES
})

const fetchCategoriesCompleted = (data) => ({
  type: types.FETCH_CATEGORIES_COMPLETED
})

const loadCategories = data => ({
  type: types.LOAD_CATEGORIES,
  payload: { data }
})

const selectCategory = data => ({
  type: types.SELECT_CATEGORY,
  payload: { data }
})

const unselectCategory = () => ({
  type: types.UNSELECT_CATEGORY
})

const removeCategory = () => ({
  type: types.REMOVE_CATEGORY
})

const removeSelectedCategoryOpt = () => (dispatch, getState) => {
  const state = getState()
  dispatch(removeCategory())
  categoriesApi.removeCategory(state.categories.selectedCategoryId)
  categoriesApi.getCategories().then(res => {
    dispatch(unselectCategory())
    dispatch(fetchCategoriesCompleted())
    dispatch(loadCategories(res))
  })
}


const loadCategoriesOpt = () => (dispatch, getState) => {
  dispatch(fetchCategories())
  categoriesApi.getCategories().then(res => {
    dispatch(fetchCategoriesCompleted())
    dispatch(loadCategories(res))
  })
}

const editCategory = (nameFieldValue) => ({
  type: types.OPEN_MODAL_EDIT,
  payload: { data: nameFieldValue }
})

const newCategory = () => ({
  type: types.OPEN_MODAL_NEW
})

const closeModal = () => ({
  type: types.CLOSE_MODAL
})

const fieldNameChange = (data) => ({
  type: types.MODAL_FIELD_NAME_CHANGE,
  payload: { data }
})

const fieldNameError = (data = null) => ({
  type: types.MODAL_FIELD_NAME_ERROR,
  payload: { data }
})

const fieldNameChangeOpt = (data) => (dispatch, getState) => {
  dispatch(fieldNameChange(data))
  
  const state = getState()
  const catNameIsUnique  = state.categories.list.filter(cat => cat.categoryName === data)
  if (catNameIsUnique.length > 0) {
    dispatch(fieldNameError("Name should be unique"))
  } else {
    dispatch(fieldNameError())
  }
}

const editSubmit = () => ({
  type: types.EDIT_SUBMIT
})

const editSubmitOpt = () => (dispatch, getState) => {
  dispatch(editSubmit())
  dispatch(closeModal())
  const state = getState()
  const categoryId = state.categories.selectedCategoryId;
  const newFieldName = state.categories.modal.nameField.name
  categoriesApi.editCategory(categoryId, newFieldName);
  dispatch(loadCategoriesOpt())
  dispatch(unselectCategory())
  
  
}

const addCategory = () => ({
  type: types.ADD_NEW_CATEGORY
})

const addCategoryOpt = (data) => (dispatch, getState) => {
  const state = getState()
  dispatch(addCategory())
  dispatch(closeModal())
  const newCat = {
    total: 0,
    categoryName: state.categories.modal.nameField.name
  }
  categoriesApi.addCategory(newCat).then(res => {
    if (res) {
      dispatch(loadCategoriesOpt())
      dispatch(unselectCategory())
    }
  })
}

export {
  loadCategoriesOpt,
  selectCategory,
  unselectCategory,
  removeSelectedCategoryOpt,
  closeModal,
  editCategory,
  newCategory,
  fieldNameChangeOpt,
  editSubmitOpt,
  addCategoryOpt
}
