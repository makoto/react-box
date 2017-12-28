import * as types from './action_types'
import getWeb3 from '../utils/getWeb3'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import contract from 'truffle-contract'

const simpleStorage = contract(SimpleStorageContract)
let simpleStorageInstance, account;

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

function setValueRequest() {
  return {
    type: types.SET_VALUE_REQUEST
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
  return new Promise(
    dispatch => {
      return getWeb3()
        .then(web3 => {
          simpleStorage.setProvider(web3.currentProvider)
          window.web3 = web3
          web3.eth.getAccounts((error, accounts) => {
            account = accounts[0]
            window.account = account
            simpleStorage.deployed().then((instance) => {
              simpleStorageInstance = instance
              dispatch(web3Initialized())
            })
          })
        })
    }
  )
}

export function loadValue() {
  return dispatch => {
    dispatch(loadValueRequest())
    return simpleStorageInstance.get.call()
      .then(result => dispatch(loadValueSuccess(result)))
      .catch(ex => dispatch(loadValueFailure(ex)))
  }
}

export function setValue(value) {
  return dispatch => {
    return simpleStorageInstance.set.sendTransaction(value, {from:account})
      .then(result => dispatch(setValueRequest(result)))
  }
}
