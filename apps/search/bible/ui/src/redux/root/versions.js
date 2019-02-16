import { isEmpty, keys, max, omit, split, toInteger, includes, values } from 'lodash'
import { stores } from '..'

const versionOptions = {
    vdcc: {
        short: 'VDCC',
        long: 'Versiunea Dumitru Cornilescu Corectată'
    },
    ntr: {
        short: 'NTR',
        long: 'Noua Traducere Românească'
    },
    esv: {
        short: 'ESV',
        long: 'English Standard Version'
    }
}

function addNewVersion(existingItems, newVersionName) {
    let version, index

    let indexes = []

    for (let v of keys(existingItems)) {
        [version, index] = split(v, '__')

        if (version === newVersionName) {
            indexes.push(toInteger(index))
        }
    }

    const nextIndex = isEmpty(indexes) ? 1 : max(indexes) + 1
    const newKey = `${newVersionName}__${nextIndex}`

    return {
        [newKey]: {
            id: newKey,
            name: newVersionName,
            index: nextIndex,
            labelShort: versionOptions[newVersionName].short,
            labelLong: versionOptions[newVersionName].long
        }
    }
}


const initialState = { ...addNewVersion({}, 'vdcc') }


export function reducer(state = initialState, action = {}) {
    let newVersionName, newVersionItem
    let newState

    switch(action.type) {
        case 'ADD_VERSION':
            newVersionName = action.payload
            newVersionItem = addNewVersion(state, newVersionName)

            newState = { ...state, ...newVersionItem }
            break

        case 'REMOVE_VERSION':
            delete stores[action.payload]
            newState = omit(state, action.payload)
            break

        case 'SET_VERSION':
            for (let store in keys(stores)) {
                delete stores[store]
            }

            newVersionName = action.payload
            newVersionItem = addNewVersion(state, newVersionName)

            newState = { ...newVersionItem }
            break

        default:
            newState = state
            break
    }

    if (includes(['ADD_VERSION', 'REMOVE_VERSION', 'SET_VERSION'], action.type)) {
        let smartIndexMap = {}
        for (let version of values(newState)) {
            smartIndexMap[version.name] = 0
        }

        for (let version of values(newState)) {
            version.smartIndex = ++smartIndexMap[version.name]
        }
    }


    return newState
}

export function addVersion(version) {
    return ({
        type: 'ADD_VERSION',
        payload: version
    })
}

export function removeVersion(version) {
    return ({
        type: 'REMOVE_VERSION',
        payload: version
    })
}

export function setVersion(version) {
    return ({
        type: 'SET_VERSION',
        payload: version
    })
}