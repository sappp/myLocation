import types from './types';
import * as locationsApi from '../../services/locationsApi';

const fetchLocations = () => ({
  type: types.FETCH_LOCATIONS
})

const fetchLocationsCompleted = (data) => ({
  type: types.FETCH_LOCATIONS_COMPLETED
})

const loadLocations = data => ({
  type: types.LOAD_LOCATIONS,
  payload: { data }
})

const selectLocation = data => ({
  type: types.SELECT_LOCATION,
  payload: { data }
})

const unselectLocation = () => ({
  type: types.UNSELECT_LOCATION
})

const closeModal = () => ({
  type: types.CLOSE_MODAL
})

const newLocation = () => ({
  type: types.OPEN_MODAL_NEW
})

const loadLocationsOpt = () => (dispatch, getState) => {
  dispatch(fetchLocations())
  locationsApi.getLocations().then(res => {
    dispatch(fetchLocationsCompleted())
    dispatch(loadLocations(res))
  })
}

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
  const locNameIsUnique  = state.locations.list.filter(loc => loc.name === data)
  if (locNameIsUnique.length > 0) {
    dispatch(fieldNameError("Name should be unique"))
  } else {
    dispatch(fieldNameError())
  }
}

const fieldCategoryChange = (data) => ({
  type: types.MODAL_FIELD_CATEGORY_CHANGE,
  payload: { data }
})


const fieldCoordiChange = (latValue, lngValue) => ({
  type: types.MODAL_FIELD_COORDIN_CHANGE,
  payload: { latValue, lngValue }
})

const fieldAddressChange = (data) => ({
  type: types.MODAL_FIELD_ADDRESS,
  payload: { data }
})

const addNewLocation = () => ({
  type: types.ADD_LOCATION
})

const addNewLocationOpt = (data) => (dispatch, getState) => {
  const state = getState()
  dispatch(addNewLocation())
  dispatch(closeModal())
  const setCategory = () => {
    let categoryObj = {}
    if (state.locations.modal.categoryField.id === null) {
      categoryObj.id = state.categories.list[0].id
      categoryObj.name = state.categories.list[0].categoryName
    } else {
      const categoryIdToCheck = Number(
        state.locations.modal.categoryField.id
      )
      categoryObj.id = state.locations.modal.categoryField.id
      categoryObj.name = (
        state.categories.list.filter(cat => (
          cat.id === categoryIdToCheck
        ))[0].categoryName
      )
    }
    return categoryObj
  }

  const newLocation = {
    name: state.locations.modal.nameField.name,
    address: state.locations.modal.addressField.value,
    coordinates: {
      lat: state.locations.modal.coordinatesField.latValue,
      lng: state.locations.modal.coordinatesField.lngValue
    },
    category: setCategory()
  }
  locationsApi.addLocation(newLocation).then(res => {
    if (res) {
      dispatch(loadLocationsOpt())
      dispatch(unselectLocation())
    }
  })
}

const removeLocation = () => ({
  type: types.REMOVE_LOCATION
})

const removeLocationOpt = () => (dispatch, getState) => {
  const state = getState()
  const locationId = state.locations.selectedLocationId
  dispatch(removeLocation())
  locationsApi.removeLocation(locationId)
  dispatch(unselectLocation())
  dispatch(loadLocationsOpt())
}

const openModalEditLocation = (locationObj) => ({
  type: types.OPEN_MODAL_EDIT,
  payload: { data: locationObj }
})

const editLocation = () => ({
  type: types.EDIT_LOCATION
})

const editLocationOpt = () => (dispatch, getState) => {
  dispatch(editLocation())
  dispatch(closeModal())
  const state = getState()
  const currentLocation = state.locations.list.filter(loc =>
    Number(loc.id) === Number(state.locations.selectedLocationId)
  )[0]
  const categoryIdToCheck = Number(
    state.locations.modal.categoryField.id
  )

  const newLocation = {
    ...currentLocation,
    name: state.locations.modal.nameField.name,
    address: state.locations.modal.addressField.value,
    coordinates: {
      lat: state.locations.modal.coordinatesField.latValue,
      lng: state.locations.modal.coordinatesField.lngValue
    },
    category: {
      id: state.locations.modal.categoryField.id,
      categoryName: (
        state.categories.list.filter(cat =>
          (cat.id === categoryIdToCheck)
        )[0].categoryName
      )
    }
  }
  locationsApi.editLocation(newLocation).then(res => {
    if (res) {
      dispatch(loadLocationsOpt())
      dispatch(unselectLocation())
    }
  })
}


export {
  loadLocationsOpt,
  selectLocation,
  unselectLocation,
  closeModal,
  newLocation,
  fieldNameChangeOpt,
  fieldCategoryChange,
  fieldCoordiChange,
  fieldAddressChange,
  addNewLocationOpt,
  removeLocationOpt,
  openModalEditLocation,
  editLocationOpt
}
