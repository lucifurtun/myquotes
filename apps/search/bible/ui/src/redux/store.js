import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import { reducer as bookReducer } from './book'
import { reducer as chapterReducer } from './chapter'
import { reducer as verseReducer } from './verse'
import { reducer as versionsReducer } from './versions'
import { reducer as apiReducer } from './api'
import { reducer as filtersReducer } from './filters'
import { stores } from './index'

import { saga as filtersSaga } from './filters'


function* rootSaga() {
    yield all([
        filtersSaga()
    ])
}


const rootReducer = combineReducers({
    versions: versionsReducer,
    api: apiReducer,
})

const versionReducer = combineReducers({
    books: bookReducer,
    chapters: chapterReducer,
    verses: verseReducer,
    filters: filtersReducer,
    api: apiReducer,
})

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

export function createStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        rootReducer,
        initialState,
        applyMiddleware(axiosMiddleware(client), sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    const name = 'root'

    stores[name] = store
    store.subscribe(() => {
        console.log(name, store.getState())
    })

    return store
}

export function createVersionStore(name, initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        versionReducer,
        initialState,
        applyMiddleware(axiosMiddleware(client), sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    stores[name] = store
    store.subscribe(() => {
        console.log(name, store.getState())
    })

    return store
}
