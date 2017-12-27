import * as types from './action_types'
import getWeb3 from '../utils/getWeb3'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import contract from 'truffle-contract'

const simpleStorage = contract(SimpleStorageContract)
let simpleStorageInstance = null;

function web3Initialized(results) {
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

function loadValueSuccess(value) {
  return {
    type: types.LOAD_VALUE_SUCCESS,
    value
  }
}

function loadValueFailure(error) {
  return {
    type: types.LOAD_VALUE_FAILURE,
    error
  }
}

export function initializeWeb3() {
  return dispatch => {
    return getWeb3()
      .then(web3 => {
        dispatch(web3Initialized())
        simpleStorage.setProvider(web3.currentProvider)
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance
        })
      })
  }
}

export function loadValue() {
  return dispatch => {
    dispatch(loadValueRequest())
    return simpleStorageInstance.get.call()
      .then(result => dispatch(loadValueSuccess(result)))
      .catch(ex => dispatch(loadValueFailure(ex)))
  }
}

export function setValue() {
 // Todo
}
