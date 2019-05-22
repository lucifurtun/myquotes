import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'



const initialState = {
    token: null
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.data.token
            }

        default:
            return state
    }
}

function* handleLoginSuccess() {
    console.log('Happened')
    yield put(push('quotes'))
    // push('/quotes')
}

export function* saga() {
    yield takeEvery('LOGIN_SUCCESS', handleLoginSuccess)
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
                        'password': 'some-password'
                    }
                }
            }
        }
    )
}
