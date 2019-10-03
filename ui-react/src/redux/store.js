import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'


import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { reducer as apiReducer } from './api'
import { reducer as userReducer } from './user'
import { reducer as authReducer } from './auth'
import { reducer as routingReducer } from './routing'

import { reducer as quotesReducer } from './quotes'
import { reducer as categoriesReducer } from './categories'
import { reducer as authorsReducer } from './authors'
import { reducer as tagsReducer } from './tags'
import { reducer as uiReducer } from './ui'
import { reducer as filtersReducer } from './filters'
import { reducer as appReducer } from './app'

import { saga as authSaga } from './auth'
import { saga as quotesSaga } from './quotes'
import { saga as apiSaga } from './api'
import { saga as filtersSaga } from './filters'
import { saga as appSaga } from './app'
import thunk from 'redux-thunk'


function* rootSaga() {
    yield all([
        authSaga(),
        quotesSaga(),
        apiSaga(),
        filtersSaga(),
        appSaga(),
    ])
}

const persistConfig = {
    key: 'cache',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    api: apiReducer,
    ui: uiReducer,
    user: userReducer,
    auth: authReducer,
    routing: routingReducer,
    quotes: quotesReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    filters: filtersReducer,
    app: appReducer
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)


export function createRootStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        persistedRootReducer,
        initialState,
        applyMiddleware(
            thunk,
            sagaMiddleware
        )
    )

    sagaMiddleware.run(rootSaga)

    store.subscribe(() => {
        console.log(store.getState())
    })

    return store
}
