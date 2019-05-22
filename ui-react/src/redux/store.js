import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'


import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { reducer as apiReducer } from './api'
import { reducer as userReducer } from './user'
import { reducer as quotesReducer } from './quotes'


import { saga as userSaga } from './user'
import { saga as apiSaga } from './api'
import { saga as uiSaga } from './ui'


function* rootSaga() {
    yield all([
        userSaga(),
        apiSaga(),
        uiSaga()
    ])
}

const persistConfig = {
    key      : 'cache',
    storage,
    whitelist: ['versions']
}

export const history = createBrowserHistory()

const rootReducer = combineReducers({
    api : apiReducer,
    user: userReducer,
    quotes: quotesReducer,
    router: connectRouter(history),
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)


export function createRootStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        persistedRootReducer,
        initialState,
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    const name = 'root'

    store.subscribe(() => {
        console.log(name, store.getState())
    })

    return store
}
