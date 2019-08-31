import { keyBy, omit } from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import { getCategory } from './categories'
import { hideModal } from './ui'
import { client } from './api'

const initialState = {
    data: {},
    errors: {},
    count: null,
    page: null,
    hasMore: null
}

function isFirstPage(response) {
    return response.page === 1
}

export function reducer(state = initialState, action = {}) {
    console.log(action)
    let quote

    switch (action.type) {
        case 'GET_QUOTES_SUCCESS':
            let response = action.payload.data

            let data = isFirstPage(response) ? response.results : [...state.data, ...response.results]

            return {
                ...state,
                data: keyBy(data, 'id'),
                count: response.count,
                page: response.page,
                hasMore: response.has_more
            }
        case 'GET_QUOTE_SUCCESS':
        case 'CREATE_QUOTE_SUCCESS':
        case 'UPDATE_QUOTE_SUCCESS':
            quote = action.payload.data

            return {
                ...state,
                errors: {},
                data: {
                    ...state.data,
                    [quote.id]: quote
                }
            }
        case 'DELETE_QUOTE_SUCCESS':
            quote = action.payload.data

            return {
                ...state,
                errors: {},
                data: omit(state.data, quote.id)
            }
        case 'CREATE_QUOTE_FAIL':
        case 'UPDATE_QUOTE_FAIL':
        case 'DELETE_QUOTE_FAIL':
            return {
                ...state,
                errors: action.payload.error.response.data
            }
        default:
            return state
    }
}

function* fetchRelatedResources(payload) {
    console.log(payload)
    if (payload.payload.data.category) {
        yield put(getCategory(payload.payload.data.category))
    }
}

function* handleQuoteSaveSuccess(payload) {
    yield put(hideModal())
}

export function* saga() {
    yield takeEvery(['UPDATE_QUOTE_SUCCESS', 'CREATE_QUOTE_SUCCESS'], handleQuoteSaveSuccess)
}


export const getQuotes = (params = {}) => {
    const url = '/quotes/'

    return (
        {
            type: 'GET_QUOTES',
            payload: {
                request: {
                    url: url,
                    method: 'GET',
                    params: params
                }
            }
        }
    )
}

export const updateQuote = (quote) => {
    const url = `/quotes/${quote.id}/`

    return {
        type: 'UPDATE_QUOTE',
        payload: {
            request: {
                url: url,
                method: 'PATCH',
                data: quote
            }
        }
    }
}

export const createQuote = (quote) => {
    const url = `/quotes/`

    return {
        type: 'CREATE_QUOTE',
        payload: {
            request: {
                url: url,
                method: 'POST',
                data: quote
            }
        }
    }
}

export const deleteQuote = (quote) => {
    const url = `/quotes/${quote.id}/`

    return {
        type: 'DELETE_QUOTE',
        payload: {
            request: {
                url: url,
                method: 'DELETE'
            }
        }
    }
}

export const removeQuote = (quote) => {
    return function (dispatch, getState) {
        const state = getState()

        return performRemoveQuoteRequest(quote, state).then(
            (response) => {
                dispatch({type: 'DELETE_QUOTE_SUCCESS', payload: {data: {...quote}}})
                dispatch(hideModal())
            }
        )
    }
}

export const performRemoveQuoteRequest = (quote, state) => {
    const url = `/quotes/${quote.id}/`
    const token = state.user.token
    let headers = {}

    if (token) {
        headers['Authorization'] = `JWT ${token}`
    }

    return client.delete(url, {headers})
}
