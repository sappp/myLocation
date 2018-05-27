import { combineReducers } from 'redux'
import types from './types'

/* State Shape
{
    list: array,
    loading: bool,
    selectedLocationId: number,
    modal: {
      open: bool,
      isNew: bool,
      nameField: {
        name: string,
        defaultValue: string,
        error: string
      }
      adressField: {
        name: string,
        defaultValue: string,
        error: string
      }
      coordinatesField: {
        latValue: number,
        lngValue: number,
        latDefaultValue: number,
        lngDefaultValue: number,
        error: string
      }
      categoryField: {
        name: string,
        categoryId: number
        defaultValue: number
      }
    }

}
*/

const listReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_LOCATIONS:
      return action.payload.data
    default:
      return state
  }
}

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_LOCATIONS:
      return true
    case types.FETCH_LOCATIONS_COMPLETED:
      return false
    default:
      return state
  }
}

const selectedLocationIdReducer = (state = null, action) => {
  switch (action.type) {
    case types.SELECT_LOCATION:
      return action.payload.data
    case types.UNSELECT_LOCATION:
      return null
    default:
      return state
  }
}

const modalInitial = {
  open: false,
  isNew: null,
  nameField: null,
  addressField: null,
  coordinatesField: null,
  categoryField: null
}

const modalReducer = (state = modalInitial, action) => {
  switch (action.type) {
    case types.CLOSE_MODAL:
      return modalInitial
    case types.OPEN_MODAL_NEW:
      return {
        open: true,
        isNew: true,
        nameField: {
          name: null,
          defaultValue: null,
          error: null
        },
        addressField: {
          value: null,
          defaultValue: null
        },
        coordinatesField: {
          latValue: null,
          lngValue: null
        },
        categoryField: {
          categoryName: null,
          id: null,
          defaultValue: null
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
    case types.MODAL_FIELD_CATEGORY_CHANGE:
      return {
        ...state,
        categoryField: {
          ...state.categoryField,
          ...action.payload.data
        }
      }
    case types.MODAL_FIELD_COORDIN_CHANGE:
      return {
        ...state,
        coordinatesField: {
          ...state.coordinatesField,
          latValue: action.payload.latValue ? action.payload.latValue : state.coordinatesField.latValue,
          lngValue: action.payload.lngValue ? action.payload.lngValue : state.coordinatesField.lngValue,
        }
      }
    case types.MODAL_FIELD_ADDRESS:
      return {
        ...state,
        addressField: {
          ...state.addressField,
          value: action.payload.data
        }
      }
    case types.OPEN_MODAL_EDIT:
      return {
        open: true,
        isNew: false,
        nameField: {
          name: action.payload.data.name,
          defaultValue: action.payload.data.name,
          error: null
        },
        addressField: {
          value: action.payload.data.address
        },
        coordinatesField: {
          latValue: action.payload.data.coordinates.lat,
          lngValue: action.payload.data.coordinates.lng
        },
        categoryField: {
          categoryName: action.payload.data.category.name,
          id: action.payload.data.category.id,
          defaultValue: action.payload.data.category.id
        }
      }

    default:
      return state
  }
}

export default combineReducers({
  list: listReducer,
  loading: loadingReducer,
  selectedLocationId: selectedLocationIdReducer,
  modal: modalReducer
})
