import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import { reducer as bookReducer } from './book'
import { reducer as chapterReducer } from './chapter'
import { reducer as verseReducer } from './verse'
import { reducer as filtersReducer } from './filters'

// import { saga as bookSaga } from './book'
import { saga as filtersSaga } from './filters'


function* rootSaga() {
    yield all([
        // bookSaga(),
        filtersSaga()
    ])
}


const rootReducer = combineReducers({
    books: bookReducer,
    chapters: chapterReducer,
    verses: verseReducer,
    filters: filtersReducer
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
