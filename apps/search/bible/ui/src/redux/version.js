import { put, take, takeEvery } from 'redux-saga/effects'
import { getBooks } from './book'
import { getVerses } from './verse'
import { stores } from './index'
import { setVersion } from './root/versions'

export function reducer(state = {}, action = {}) {
    switch(action.type) {
        case 'SET_VERSION':
            return action.payload
        default:
            return state
    }
}

export function setupVersion({version, previousVersion}) {
    return {
        type: 'SETUP_VERSION',
        payload: {version, previousVersion}
    }
}

function* handleSetupVersion({payload}) {
    yield put(setVersion(payload.version))
    yield put(getBooks())

    if(payload.previousVersion) {
        yield take(['GET_BOOKS_SUCCESS'])

        let filters = stores[payload.previousVersion.id].getState().filters
        filters.search = null
        filters.snapshot.search = null

        yield put({ type: 'SET_FILTERS', payload: filters })
    }
    else {
        yield put(getVerses())
    }
}

export function* saga() {
    yield takeEvery('SETUP_VERSION', handleSetupVersion)
}