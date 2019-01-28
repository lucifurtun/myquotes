import { isEmpty, keys, max, omit, split, toInteger } from 'lodash'
import { stores } from '.'

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
            label_short: versionOptions[newVersionName].short,
            label_long: versionOptions[newVersionName].long
        }
    }
}


const initialState = { ...addNewVersion({}, 'vdcc') }


export function reducer(state = initialState, action = {}) {
    let newVersionName, newVersionItem

    switch(action.type) {
        case 'ADD_VERSION':
            newVersionName = action.payload
            newVersionItem = addNewVersion(state, newVersionName)

            return { ...state, ...newVersionItem }

        case 'REMOVE_VERSION':
            delete stores[action.payload]
            return omit(state, action.payload)

        case 'SET_VERSION':
            for (let store in keys(stores)) {
                delete stores[store]
            }

            newVersionName = action.payload
            newVersionItem = addNewVersion(state, newVersionName)

            return { ...newVersionItem }

        default:
            return state
    }
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