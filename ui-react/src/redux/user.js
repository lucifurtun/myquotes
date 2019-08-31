import { takeEvery, call, select, put } from 'redux-saga/effects'
import { history, push } from './routing'
import { setHeaders } from './api'
import { getQuotes } from './quotes'


const initialState = {
    token: null,
    email: null,
    id: null
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload.data
            }
        case 'LOGOUT':
            return initialState

        default:
            return state
    }
}

function* handleLoginSuccess(payload) {
    console.log(payload)
    yield call(setHeaders, {Authorization: payload.payload.data.token})
    yield call(history.push, 'quotes')
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


export const login = () => {
    const url = '/token/new/'

    return (
        {
            type: 'LOGIN',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: {
                        'email': 'lucianfurtun@gmail.com',
                        'password': 'apollo'
                    }
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
