import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { reducer as bookReducer } from './book'
import { reducer as chapterReducer } from './chapter'
import { reducer as verseReducer } from './verse'
import { reducer as versionsReducer } from './versions'
import { reducer as apiReducer } from './api'
import { reducer as uiReducer } from './ui'
import { reducer as filtersReducer } from './filters'
import { stores } from './index'

import { saga as filtersSaga } from './filters'
import { saga as apiSaga } from './api'


function* rootSaga(name) {
    yield all([
        filtersSaga(name),
        apiSaga(name)
    ])
}


const rootReducer = combineReducers({
    versions: versionsReducer,
    ui: uiReducer,
})

const versionReducer = combineReducers({
    books: bookReducer,
    chapters: chapterReducer,
    verses: verseReducer,
    filters: filtersReducer,
    api: apiReducer,
})


export function createStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
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
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga, name)

    stores[name] = store
    store.subscribe(() => {
        console.log(name, store.getState())
    })

    return store
}
