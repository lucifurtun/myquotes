import { takeEvery, call, select, put } from 'redux-saga/effects'
import { push } from './routing'
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

        default:
            return state
    }
}

function* handleLoginSuccess(payload) {
    console.log(payload)
    yield call(setHeaders, { Authorization: payload.payload.data.token })
    yield call(push, 'quotes')
}

function* handleExistingToken() {
    const existingToken = yield select((state) => {console.log(state.user.token); return state.user.token})
    if(existingToken) {
        yield call(setHeaders, { Authorization: existingToken })
        yield put(getQuotes())
    }

}

export function* saga() {
    yield takeEvery('LOGIN_SUCCESS', handleLoginSuccess)
    // yield takeEvery(REHYDRATE, handleExistingToken)
}


export const login = (history) => {
    const url = '/token/new/'

    return (
        {
            type   : 'LOGIN',
            payload: {
                history,
                request: {
                    url   : url,
                    method: 'POST',
                    data  : {
                        'email'   : 'lucianfurtun@gmail.com',
                        'password': 'apollo'
                    }
                }
            }
        }
    )
}
