import { takeEvery, call, select, put } from 'redux-saga/effects'
import { setHeaders } from './api'
import { getQuotes } from './quotes'
import { push } from "../App";


const initialState = {
    token: null,
    email: null,
    id: null,
    errors: {}
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload.data,
                errors: {}
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                errors: action.payload
            }
        case 'LOGOUT':
            return initialState

        default:
            return state
    }
}

function* handleLoginSuccess(payload) {
    yield call(setHeaders, {Authorization: payload.payload.data.token})
    yield call(push, 'quotes')
}


export function* handleUserUnauthenticated() {
    yield call(push, 'login')
}

function* handleExistingToken() {
    const existingToken = yield select((state) => {
        console.log(state.user.token)
        return state.user.token
    })
    if (existingToken) {
        yield call(setHeaders, {Authorization: existingToken})
        yield put(getQuotes())
    }
}


function* redirectToLogin() {
    yield call(push, 'login')
}

function* handleLogout() {
    yield redirectToLogin()
}

export function* saga() {
    yield takeEvery('LOGIN_SUCCESS', handleLoginSuccess)
    yield takeEvery('LOGOUT', handleLogout)
    // yield takeEvery(REHYDRATE, handleExistingToken)
}


export const login = (data) => {
    const url = '/token/new/'

    return (
        {
            type: 'LOGIN',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: data
                }
            }
        }
    )
}

export const signup = (data) => {
    const url = '/token/new/'

    return (
        {
            type: 'SIGNUP',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: data
                }
            }
        }
    )
}


export const logout = () => {
    return (
        {
            type: 'LOGOUT'
        }
    )
}
