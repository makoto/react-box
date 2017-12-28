import * as actions from './actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from './action_types'
import connect from 'truffle-contract'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  // This will cause failure if you try to reuse __mockLoadValue across multiple tests
  // beforeEach(() => {
  //   connect.__mockLoadValue = null;
  // })

  it('creates FETCH_TODOS_SUCCESS when calling get function', () => {
    let expectedValue = 10
    connect.__mockLoadValue = expectedValue;
    const expectedActions = [
      { type: types.LOAD_VALUE_REQUEST },
      { type: types.LOAD_VALUE_SUCCESS, value:  expectedValue }
    ]
    const store = mockStore({ todos: [] })
    actions.setup().then(()=>{
      store.dispatch(actions.loadValue()).then(() => {
        console.log('Make sure this line is printed...')
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  it('creates SET_VALUE_REQUEST when sending transaction to set function', () => {
    const expectedValue = 20
    const expectedActions = [
      { type: types.SET_VALUE_REQUEST, value: expectedValue},
    ]
    const store = mockStore({ todos: [] })
    actions.setup().then(()=>{
      store.dispatch(actions.setValue(expectedValue)).then(() => {
        console.log('Make sure this line is printed...')
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})

// Areas of improvement
// - How do I assert the fact that call/sendTransaction are called with correct arguments?
// - How to make sure that certain assertion on callbacks are actually called (rather than being success because the assertion is never called)
// - connect.__mockLoadValue is currently singleton so tests cannot share the same value (if you do so by resetting at beforeEach, the test will fail)
