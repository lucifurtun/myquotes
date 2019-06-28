import { keyBy } from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import { getCategory } from './categories'
import { hideModal } from './ui'

const initialState = {
    data: {},
    errors: {},
    count: null,
    page: null,
    hasMore: null,
}

function isFirstPage(response) {
    return response.page === 1
}

export function reducer(state = initialState, action = {}) {
    console.log(action)

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
            let quote = action.payload.data

            return {
                ...state,
                errors: {},
                data: {
                    ...state.data,
                    [quote.id]: quote
                }
            }
        case 'CREATE_QUOTE_FAIL':
        case 'UPDATE_QUOTE_FAIL':
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
    if(payload.payload.data.category){
        yield put(getCategory(payload.payload.data.category))
    }
}

function* handleQuoteSaveSuccess(payload) {
    yield put(hideModal())
}

export function* saga() {
    yield takeEvery(['UPDATE_QUOTE_SUCCESS', 'CREATE_QUOTE_SUCCESS'], handleQuoteSaveSuccess)
}


export const getQuotes = () => {
    const url = '/quotes/'

    return (
        {
            type   : 'GET_QUOTES',
            payload: {
                request: {
                    url   : url,
                    method: 'GET'
                }
            }
        }
    )
}

export const updateQuote = (quote) => {
    const url = `/quotes/${quote.id}/`

    return {
        type   : 'UPDATE_QUOTE',
        payload: {
            request: {
                url   : url,
                method: 'PATCH',
                data: quote
            }
        }
    }
}

export const createQuote = (quote) => {
    const url = `/quotes/`

    return {
        type   : 'CREATE_QUOTE',
        payload: {
            request: {
                url   : url,
                method: 'POST',
                data: quote
            }
        }
    }
}