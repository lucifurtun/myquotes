import { has } from 'lodash'
import { call, takeEvery, put, select } from 'redux-saga/effects'
import { forEach } from 'lodash'
import axios from 'axios'
import * as qs from 'qs'
import { handleUserUnauthenticated } from "./auth";
import { store } from "../index";
import { handleFilterChange } from "./filters";
import { getAuthors } from "./authors";
import { getCategories } from "./categories";
import { getTags } from "./tags";

const initialState = {
    pendingRequests: 0,
    isLoading: false,
    isOnline: true
}

const REQUEST_STARTED = 'REQUEST_STARTED'
const REQUEST_FINISHED = 'REQUEST_FINISHED'
const API_IS_OFFLINE = 'API_IS_OFFLINE'
const RELOAD = 'RELOAD'

export function reducer(state = initialState, action = {}) {
    let currentPendingRequests

    switch (action.type) {
        case REQUEST_STARTED:
            currentPendingRequests = state.pendingRequests + 1
            return {
                ...state,
                pendingRequests: currentPendingRequests,
                isLoading: currentPendingRequests > 0
            }

        case REQUEST_FINISHED:
            currentPendingRequests = state.pendingRequests - 1
            return {
                ...state,
                pendingRequests: currentPendingRequests,
                isLoading: currentPendingRequests > 0,
                isOnline: true
            }
        case API_IS_OFFLINE:
            return {
                ...state,
                isOnline: false
            }

        default:
            return state
    }
}

// Deprecated reducer...
export function oldReducer(state = initialState, action = {}) {
    if (has(action.payload, 'request')) {
        if (has(action.payload, 'status')) {
            return {
                isLoading: false
            }
        }
        else {
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
        return qs.stringify(params, {arrayFormat: 'repeat', skipNulls: true})
    },
})

client.interceptors.request.use((config) => {
    store.dispatch({type: REQUEST_STARTED})
    return config;
}, (error) => {
    return Promise.reject(error);
});

client.interceptors.response.use((response) => {
    store.dispatch({type: REQUEST_FINISHED})
    return response;
}, (error) => {
    store.dispatch({type: REQUEST_FINISHED})
    return Promise.reject(error);
});

export function setHeaders(headers) {
    forEach(headers, (value, name) => {
        axios.defaults.headers.common[name] = value
    })
}

function* handleReload() {
    const routing = yield select((state) => state.routing)

    const params = {
        user__username: has(routing.match.params, 'username') ? routing.match.params.username : null
    }

    yield handleFilterChange()

    yield put(getAuthors(params))
    yield put(getCategories(params))
    yield put(getTags(params))
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
        // headers['Authorization'] = `JWT abc`
    }

    try {
        const response = yield call(client, url, {params, method, data, headers})
        yield put({type: type + SUCCESS_SUFFIX, payload: response})
    }
    catch (errorResponse) {
        if (!errorResponse.response) {
            console.log('It should be a network error.')
            yield put({type: API_IS_OFFLINE})
        }
        else {
            yield put({type: type + ERROR_SUFFIX, payload: errorResponse.response.data})

            if (errorResponse.response.status === 401) {
                yield handleUserUnauthenticated()
            }
        }
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
    'CREATE_AUTHOR',
    'UPDATE_AUTHOR',
    'DELETE_AUTHOR',
    'GET_CATEGORIES',
    'GET_CATEGORY',
    'CREATE_CATEGORY',
    'UPDATE_CATEGORY',
    'DELETE_CATEGORY',
    'GET_TAGS',
    'GET_TAG',
    'CREATE_TAG',
    'UPDATE_TAG',
    'DELETE_TAG',
    'UPDATE_USER',
    'LOGIN',
    'SIGNUP'
]

export function* saga() {
    yield takeEvery(API_ACTIONS, handleRequest)
    yield takeEvery(RELOAD, handleReload)
}


export const reload = () => ({
    type: RELOAD
})
