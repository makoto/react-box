import * as types from './action_types'


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

//     const contract = require('truffle-contract')
//     const simpleStorage = contract(SimpleStorageContract)
//     simpleStorage.setProvider(this.state.web3.currentProvider)
//
//     // Declaring this for later so we can chain functions on SimpleStorage.
//     var simpleStorageInstance
//
//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       simpleStorage.deployed().then((instance) => {
//         simpleStorageInstance = instance
//
//         // Stores a given value, 5 by default.
//         return simpleStorageInstance.set(5, {from: accounts[0]})
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         return simpleStorageInstance.get.call(accounts[0])
//       }).then((result) => {
//         // Update state with the result.
//         return this.setState({ storageValue: result.c[0] })
//       })
//     })
//   }

function dummyCall(){
  return new Promise(
    function(resolve, reject){
      resolve(1)
    }
  )
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
