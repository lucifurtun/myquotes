import { connect } from 'react-redux'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { takeEvery, put, call, select } from 'redux-saga/effects'


//
//  ACTIONS

export const ROUTE_CHANGED = '@ routing / ROUTE_CHANGED'

export const updateRoute = (route) => ({type: ROUTE_CHANGED, payload: route})


//
//  REDUCER

export function reducer(state = {}, action = {}) {
    switch (action.type) {
        case ROUTE_CHANGED: {
            console.log(action.payload)
            return action.payload
        }
        default:
            return state
    }
}


//
//  SAGA

export function* saga() {
    yield takeEvery(ROUTE_CHANGED, () => console.log('Route changed!'))
    // yield takeEvery('LOGIN_SUCCESS', redirectToLogin)
}

//
//   HELPERS and UTILITIES
export const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createBrowserHistory()
const {push, replace} = history
export { push, replace }


export const withRouter = (component) => connect((state) => state.routing)(component)
