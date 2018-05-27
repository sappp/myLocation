import { combineReducers } from 'redux'
import types from './types'

/* State Shape
{
    sortName: {
      isOn: bool,
      az: bool
    },
    category: string
}
*/

const sortNameReducer = (state = {isOn: false, az: true}, action) => {
  switch (action.type) {
    case types.SORT_NAME_ON:
      return {
        ...state,
        isOn: true
      }
    case types.SORT_NAME_OFF:
      return {
        isOn: false,
        az: true
      }
    case types.TOGGLE_SORT_BY_AZ:
      return {
        ...state,
        az: !state.az
      }
    default:
      return state
  }
}

const categoryReducer = (state = null, action) => {
  switch (action.type) {
    case types.FILTER_BY_CATEGORY_ALL:
      return null
    case types.FILTER_BY_CATEGORY:
      return action.payload.data
    default:
      return state
  }
}

export default combineReducers({
  sortName: sortNameReducer,
  category: categoryReducer
})
