import { takeEvery, put, select, take } from 'redux-saga/effects'
import { getQuotes } from './quotes'
import { toArray } from 'lodash'

const FILTER_CHANGED = 'FILTER_CHANGED'
const SEARCH_CHANGED = 'SEARCH_CHANGED'

const initialState = {
    categories: new Set(),
    authors: new Set(),
    tags: new Set(),
    search: null,
    snapshot: {
        categories: new Set(),
        authors: new Set(),
        tags: new Set(),
        search: null,
    }
}

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case FILTER_CHANGED:
            const id = action.payload.value
            const field = action.payload.field
            const checked = action.payload.checked
            let newState

            if (checked) {
                const newSet = new Set(state[field])
                newSet.add(id)
                newState = newSet
            } else {
                const newSet = new Set(state[field])
                newSet.delete(id)
                newState = newSet
            }

            return {
                ...state,
                [field]: newState
            }
        case SEARCH_CHANGED:
            return {
                ...state,
                search: action.payload.value
            }
        case 'SET_FILTERS':
            return {
                ...state,
                ...action.payload
            }
        case 'SEARCH_FILTERS_SNAPSHOT':
            return {
                ...state,
                snapshot: action.payload
            }

        default:
            return state
    }
}

function* handleFilterChange({ payload }) {
    const filters = yield select((state) => state.filters)

    console.log(filters)

    const params = {
        category: toArray(filters.categories),
        author: toArray(filters.authors),
        tag: toArray(filters.tags),
        search: filters.search,
    }

    yield  put(getQuotes(params))
}

export function* saga() {
    yield takeEvery(FILTER_CHANGED, handleFilterChange)
    yield takeEvery(SEARCH_CHANGED, handleFilterChange)
}

export const changeFilter = (field, value, checked) => ({
    type: FILTER_CHANGED,
    payload: { field, value, checked }
})


export const changeSearch = (value) => ({
    type: SEARCH_CHANGED,
    payload: { value }
})
