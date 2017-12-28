import * as actions from './actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from './action_types'
import connect from 'truffle-contract'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('creates FETCH_TODOS_SUCCESS when calling get function', () => {
    const expectedValue = 10
    connect.__mockResponse = expectedValue;
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
    const expectedActions = [
      { type: types.LOAD_VALUE_REQUEST },
      { type: types.LOAD_VALUE_SUCCESS, value:  1 }
    ]
    const store = mockStore({ todos: [] })
    actions.setup().then(()=>{
      expect(1).toBe(2)
      store.dispatch(actions.setValue(1)).then(() => {
        expect(1).toBe(3)
        expect(store.getActions()).toEqual([])
      })
    })
  })
})
