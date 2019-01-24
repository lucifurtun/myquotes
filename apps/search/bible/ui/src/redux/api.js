import { has, split } from 'lodash'
import { call, takeEvery, put } from 'redux-saga/effects'
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

function* handleRequest(storeName, action) {
    const { type, payload: { request } } = action
    const [version] = split(storeName, '__')

    const url = request.url + `${version}/`

    try {
        const response = yield call(client, url, { params: request.params })
        yield put({ type: type + SUCCESS_SUFFIX, payload: response })
    } catch (errorResponse) {
        yield put({ type: type + ERROR_SUFFIX, payload: { error: errorResponse } })
    }
}

export function* saga(storeName) {
    yield takeEvery(['GET_VERSES', 'GET_BOOKS', 'GET_CHAPTERS'], handleRequest, storeName)
}
