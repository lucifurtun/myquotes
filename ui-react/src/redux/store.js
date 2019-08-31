import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
// import { createBrowserHistory } from 'history'


import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { reducer as apiReducer } from './api'
import { reducer as userReducer } from './user'
import { reducer as routingReducer } from './routing'

import { reducer as quotesReducer } from './quotes'
import { reducer as categoriesReducer } from './categories'
import { reducer as authorsReducer } from './authors'
import { reducer as tagsReducer } from './tags'
import { reducer as uiReducer } from './ui'


import { saga as userSaga } from './user'
import { saga as quotesSaga } from './quotes'
import { saga as apiSaga } from './api'
import { saga as uiSaga } from './ui'
import { saga as routingSaga } from './routing'
import thunk from 'redux-thunk'


function* rootSaga() {
    yield all([
        userSaga(),
        quotesSaga(),
        apiSaga(),
        uiSaga(),
        routingSaga()
    ])
}

const persistConfig = {
    key: 'cache',
    storage,
    whitelist: ['user']
}

// export const history = createBrowserHistory()
// export const { push, replace } = history

const rootReducer = combineReducers({
    api: apiReducer,
    ui: uiReducer,
    user: userReducer,
    routing: routingReducer,
    quotes: quotesReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)


export function createRootStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        persistedRootReducer,
        initialState,
        applyMiddleware(
            // routerMiddleware(history),
            thunk,
            sagaMiddleware
        )
    )

    sagaMiddleware.run(rootSaga)

    const name = 'root'

    store.subscribe(() => {
        console.log(name, store.getState())
    })

    return store
}
