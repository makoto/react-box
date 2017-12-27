import * as actions from './actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from './action_types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
  const expectedActions = [
    { type: types.LOAD_VALUE_REQUEST },
    { type: types.LOAD_VALUE_SUCCESS, body:  1 }
  ]
  const store = mockStore({ todos: [] })

  return store.dispatch(actions.loadValue()).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
