import { combineReducers } from 'redux'
import types from './types'

/* State Shape
{
    location: obj,
}
*/

const locationReducer = (state = null, action) => {
  switch (action.type) {
    case types.SET_VIEW:
      return action.payload.data
    case types.UNSET_VIEW:
      return null
    default:
      return state
  }
}

export default combineReducers({
  location: locationReducer
})
