import { combineReducers } from 'redux'
import types from './types'

/* State Shape
{
    list: array,
    loading: bool,
    selectedCategory: number,
    newCategory: obj
    modal: {
      open: bool,
      isNew: bool,
      nameField: {
        name: string,
        defaultValue: string,
        error: string
      }
    }
}
*/

const listReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_CATEGORIES:
      return action.payload.data
    default:
      return state
  }
}

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return true
    case types.FETCH_CATEGORIES_COMPLETED:
      return false
    default:
      return state
  }
}

const selectedCategoryIdReducer = (state = null, action) => {
  switch (action.type) {
    case types.SELECT_CATEGORY:
      return action.payload.data
    case types.UNSELECT_CATEGORY:
      return null
    default:
      return state
  }
}

const modalReducer = (state = {open: false, isNew: null, nameField: null}, action) => {
  switch (action.type) {
    case types.CLOSE_MODAL:
      return {
        open: false,
        isNew: null,
        nameField: null
      }
    case types.OPEN_MODAL_EDIT:
      return {
        open: true,
        isNew: false,
        nameField: {
          name: action.payload.data,
          defaultValue: action.payload.data,
          error: null
        }
      }
    case types.MODAL_FIELD_NAME_CHANGE:
      return {
        ...state,
        nameField: {
          ...state.nameField,
          name: action.payload.data
        }
      }
    case types.MODAL_FIELD_NAME_ERROR:
      return {
        ...state,
        nameField: {
          ...state.nameField,
          error: action.payload.data
        }
      }
    case types.OPEN_MODAL_NEW:
      return {
        open: true,
        isNew: true,
        nameField: {
          name: null,
          defaultValue: null,
          error: null
        }
      }
    default:
      return state
  }
}




export default combineReducers({
  list: listReducer,
  loading: loadingReducer,
  selectedCategoryId: selectedCategoryIdReducer,
  modal: modalReducer
})
