import * as types from './action_types'
import getWeb3 from '../utils/getWeb3'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import contract from 'truffle-contract'

const simpleStorage = contract(SimpleStorageContract)
let simpleStorageInstance, account, web3;

function getAccount(){
  return new Promise(function(resolve, reject){
    web3.eth.getAccounts((accounts) =>{
      resolve(accounts[0])
    })
  })
}

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

function setValueRequest(value) {
  return {
    type: types.SET_VALUE_REQUEST,
    value
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

export function setup() {
  return getWeb3()
    .then(_web3 => {
      web3 = _web3
      simpleStorage.setProvider(web3.currentProvider)
      window.web3 = web3
      return simpleStorage.deployed()
    })
    .then(_instance => {
      simpleStorageInstance = _instance
      return getAccount()
    })
    .then(_account => {
      account = _account
      window.account = account
    })
}

export function initializeWeb3() {
  dispatch => {
    setup(() => {
      dispatch(web3Initialized())
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

export function setValue(value) {
  return dispatch => {
    return simpleStorageInstance.set.sendTransaction(value, {from:account})
      .then(() => {
        dispatch(setValueRequest(value))
      })
  }
}
