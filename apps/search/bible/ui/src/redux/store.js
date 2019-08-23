import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { reducer as bookReducer } from './book'
import { reducer as chapterReducer } from './chapter'
import { reducer as verseReducer } from './verse'
import { reducer as versionsReducer } from './root/versions'
import { reducer as currentVersionReducer } from './version'
import { reducer as apiReducer } from './api'
import { reducer as uiReducer } from './root/ui'
import { reducer as uiVersionReducer } from './ui'
import { reducer as filtersReducer } from './filters'

import { stores } from './index'

import { saga as filtersSaga } from './filters'
import { saga as apiSaga } from './api'
import { saga as uiSaga } from './ui'
import { saga as versionSaga } from './version'


function* rootSaga(name) {
    yield all([
        filtersSaga(name),
        apiSaga(name),
        uiSaga(),
        versionSaga()
    ])
}

const persistConfig = {
    key: 'cache',
    storage,
    whitelist: ['versions']
}


const rootReducer = combineReducers({
    versions: versionsReducer,
    ui: uiReducer,
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const versionReducer = combineReducers({
    books: bookReducer,
    chapters: chapterReducer,
    verses: verseReducer,
    filters: filtersReducer,
    api: apiReducer,
    version: currentVersionReducer,
    ui: uiVersionReducer,
})


export function createRootStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        persistedRootReducer,
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
