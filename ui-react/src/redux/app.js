import { select, takeEvery } from 'redux-saga/effects'


export const INITIALIZE = 'INITIALIZE'
export const INITIALIZED = 'INITIALIZED'

const initialState = {}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case INITIALIZE:
            return state
        case INITIALIZED:
            return state
        default:
            return state
    }
}

export function* handleAppInitialization() {
    console.log('Do app init stuff...')

    const existingToken = yield select((state) => state.user.token)
    if (existingToken) {
        console.log('Call token refresh...')
    }
}

export function* saga() {
    yield takeEvery(INITIALIZE, handleAppInitialization)
}


export const initialize = () => ({type: INITIALIZE})
