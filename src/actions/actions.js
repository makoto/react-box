import * as types from './action_types'
import getWeb3 from '../utils/getWeb3'

function web3Initialized(results) {
  console.log('web3Initialized', web3Initialized)
  return {
    type: types.WEB3_INITIALIZED,
    payload: results
  }
}

function loadValueRequest() {
  return {
    type: types.LOAD_VALUE_REQUEST
  }
}

function loadValueSuccess(body) {
  return {
    type: types.LOAD_VALUE_SUCCESS,
    body
  }
}

function loadValueFailure(body) {
  return {
    type: types.LOAD_VALUE_FAILURE,
    body
  }
}

function dummyCall(){
  return new Promise(
    function(resolve, reject){
      resolve(1)
    }
  )
}

export function initializeWeb3() {
  return dispatch => {
    return getWeb3()
      .then(body => {
        dispatch(web3Initialized(body))
      })
  }
}

export function loadValue() {
  return dispatch => {
    dispatch(loadValueRequest())
    return dummyCall()
      .then(body => dispatch(loadValueSuccess(body)))
      .catch(ex => dispatch(loadValueFailure(ex)))
  }
}

export function setValue() {
 // Todo
}
