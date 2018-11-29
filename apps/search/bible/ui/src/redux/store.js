import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { reducer as formReducer } from 'redux-form'

import { reducer as bookReducer } from './book'
import { reducer as chapterReducer } from './chapter'
import { reducer as verseReducer } from './verse'
import { reducer as apiReducer } from './api'

import { saga as filtersSaga } from './filters'


function* rootSaga() {
    yield all([
        filtersSaga()
    ])
}


const rootReducer = combineReducers({
    books: bookReducer,
    chapters: chapterReducer,
    verses: verseReducer,
    api: apiReducer,
    form: formReducer
})

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
