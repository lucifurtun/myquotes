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
    const existingKeys = keys(existingItems)

    for (let v of existingKeys) {
        [version, index] = split(v, '__')

        if (version === newVersionName) {
            indexes.push(toInteger(index))
        }
    }

    const nextIndex = isEmpty(indexes) ? 1 : max(indexes) + 1
    const newKey = `${newVersionName}__${nextIndex}`

    return {
        [newKey]: {
            ordering: existingKeys.length + 1,
            id: newKey,
            name: newVersionName,
            index: nextIndex,
            smartIndex: null,
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

        case 'REORDER_VERSIONS':
            const source = action.payload.source
            const sourceOrdering = state[source].ordering
            const destination = action.payload.destination
            const destinationOrdering = state[destination].ordering

            const toLeft = sourceOrdering > destinationOrdering

            newState = state
            const newOrdering = newState[destination].ordering

            for (let item of values(newState)) {
                if (toLeft) {
                    if (newState[item.id].ordering >= newState[destination].ordering) {
                        newState[item.id].ordering++
                    }
                } else {
                    if (newState[item.id].ordering <= newState[destination].ordering) {
                        newState[item.id].ordering--
                    }
                }
            }

            newState[source].ordering = newOrdering
            break

        default:
            newState = state
            break
    }

    if (includes(['ADD_VERSION', 'REMOVE_VERSION', 'SET_VERSION', 'persist/REHYDRATE'], action.type)) {
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
