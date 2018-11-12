import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { reducer as bookReducer } from './book'
import { saga as bookSaga } from './book'


function* rootSaga() {
    yield all([
        bookSaga()
    ])
}


const rootReducer = combineReducers({
    books: bookReducer
})

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    responseType: 'json'
})

export default function createStore(reducer, initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createReduxStore(
        rootReducer,
        initialState,
        applyMiddleware(axiosMiddleware(client), sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    return store
}
