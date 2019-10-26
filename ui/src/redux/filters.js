import { put, select, takeEvery } from 'redux-saga/effects'
import { getQuotes } from './quotes'
import { has, toArray } from 'lodash'
import { createAuthor, removeAuthor, updateAuthor } from "./authors";
import { createCategory, removeCategory, updateCategory } from "./categories";
import { createTag, removeTag, updateTag } from "./tags";

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
    switch (action.type) {
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
        default:
            return state
    }
}

export function* handleFilterChange() {
    const filters = yield select((state) => state.filters)
    const routing = yield select((state) => state.routing)

    const params = {
        category: toArray(filters.categories),
        author: toArray(filters.authors),
        tags: toArray(filters.tags),
        search: filters.search,
        user__username: has(routing.match.params, 'username') ? routing.match.params.username : null
    }

    yield put(getQuotes(params))
}

export function* saga() {
    yield takeEvery(FILTER_CHANGED, handleFilterChange)
    yield takeEvery(SEARCH_CHANGED, handleFilterChange)
}

export const changeFilter = (field, value, checked) => ({
    type: FILTER_CHANGED,
    payload: {field, value, checked}
})


export const changeSearch = (value) => ({
    type: SEARCH_CHANGED,
    payload: {value}
})

export const createFilter = (type, data) => {
    switch (type) {
        case 'authors':
            return createAuthor(data)
        case 'categories':
            return createCategory(data)
        case 'tags':
            return createTag(data)
        default:
            return null
    }
}

export const updateFilter = (type, data) => {
    switch (type) {
        case 'authors':
            return updateAuthor(data)
        case 'categories':
            return updateCategory(data)
        case 'tags':
            return updateTag(data)
        default:
            return null
    }
}

export const removeFilter = (type, data) => {
    switch (type) {
        case 'authors':
            return removeAuthor(data)
        case 'categories':
            return removeCategory(data)
        case 'tags':
            return removeTag(data)
        default:
            return null
    }
}
