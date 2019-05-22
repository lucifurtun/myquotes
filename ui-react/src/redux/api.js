import { has } from 'lodash'
import { call, takeEvery, put, select } from 'redux-saga/effects'
import axios from 'axios'

const initialState = {
    isLoading: false
}

export function reducer(state = initialState, action = {}) {
    if (has(action.payload, 'request')) {
        if (has(action.payload, 'status')) {
            return {
                isLoading: false
            }
        } else {
            return {
                isLoading: true
            }
        }
    }

    if (has(action, 'error')) {
        return {
            isLoading: false
        }
    }

    return state
}

export const SUCCESS_SUFFIX = '_SUCCESS'
export const ERROR_SUFFIX = '_FAIL'

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

function* handleRequest(action) {
    const { type, payload: { request } } = action
    const url = request.url
    const method = request.method ? request.method : 'GET'
    const data = request.data ? request.data : null
    let headers = {}

    const userToken = yield select((state => state.user.token))
    if (userToken) {
        headers['Authorization'] = `JWT ${userToken}`
    }

    try {
        const response = yield call(client, url, { params: request.params, method, data, headers })
        yield put({ type: type + SUCCESS_SUFFIX, payload: response })
    } catch (errorResponse) {
        yield put({ type: type + ERROR_SUFFIX, payload: { error: errorResponse } })
    }
}

export function* saga() {
    yield takeEvery(['GET_QUOTES', 'GET_AUTHORS', 'GET_CATEGORIES', 'GET_TAGS', 'LOGIN'], handleRequest)
}
