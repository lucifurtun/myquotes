import { has } from 'lodash'
import { call, takeEvery, put, select } from 'redux-saga/effects'
import { forEach } from 'lodash'
import axios from 'axios'
import * as qs from 'qs'

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

export const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
    paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    },
})

export function setHeaders(headers) {
    forEach(headers, (value, name) => {
        axios.defaults.headers.common[name] = value
    })
}

function* handleRequest(action) {
    const {type, payload: {request}} = action
    const url = request.url
    const method = request.method ? request.method : 'GET'
    const data = request.data ? request.data : null
    const params = request.params ? request.params : {}
    let headers = {}

    const userToken = yield select((state => state.user.token))
    if (userToken) {
        headers['Authorization'] = `JWT ${userToken}`
    }

    try {
        const response = yield call(client, url, {params, method, data, headers})
        yield put({type: type + SUCCESS_SUFFIX, payload: response})
    } catch (errorResponse) {
        yield put({type: type + ERROR_SUFFIX, payload: {error: errorResponse}})
    }
}

const API_ACTIONS = [
    'GET_QUOTES',
    'GET_QUOTE',
    'CREATE_QUOTE',
    'UPDATE_QUOTE',
    'DELETE_QUOTE',
    'GET_AUTHORS',
    'GET_AUTHOR',
    'GET_CATEGORIES',
    'GET_CATEGORY',
    'GET_TAGS',
    'GET_TAG',
    'LOGIN'
]

export function* saga() {
    yield takeEvery(API_ACTIONS, handleRequest)
}
