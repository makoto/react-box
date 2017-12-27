import { combineReducers } from 'redux'
import * as types from '../actions/action_types'

function web3(state = [], action) {
  // debugger
  console.log('web3 reducer', action)
  switch (action.type) {
    case types.WEB3_INITIALIZED:
      return state
    default:
      return state
  }
}

function simpleStorage(state = [], action) {
  switch (action.type) {
    case types.LOAD_VALUE_REQUEST:
      // return [
      //   ...state,
      //   {
      //     text: action.text,
      //     completed: false
      //   }
      // ]
      return state
    case types.LOAD_VALUE_SUCCESS:
      // return state.map((todo, index) => {
      //   if (index === action.index) {
      //     return Object.assign({}, todo, {
      //       completed: !todo.completed
      //     })
      //   }
      //   return todo
      // })
      return state
    default:
      return state
  }
}

const reducers = combineReducers({
  simpleStorage,
  web3
})

export default reducers
