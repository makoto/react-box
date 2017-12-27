import { combineReducers } from 'redux'
import * as types from '../actions/action_types'

function reducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_VALUE_REQUEST:
      console.log('reducer:LOAD_VALUE_REQUEST', action.value)
      return state
    case types.LOAD_VALUE_SUCCESS:
      return {
        storageValue: action.value,
      }
    default:
      return state
  }
}

export default reducer
