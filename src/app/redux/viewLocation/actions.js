import types from './types';

const setLocation = (locObj) => ({
  type: types.SET_VIEW,
  payload: { data: locObj }
})

const setLocationOpt = () => (dispatch, getState) => {
  const state = getState()
  const locationId = state.locations.selectedLocationId
  const locObj = state.locations.list.filter(loc => 
    Number(loc.id) === Number(locationId)
  )[0]

  dispatch(setLocation(locObj))
}

const unsetLocation= () => ({
  type: types.UNSET_VIEW
})

export {
  setLocationOpt,
  unsetLocation
}
