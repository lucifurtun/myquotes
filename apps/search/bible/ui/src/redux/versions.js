import { omit, split, keys, max, toInteger, isEmpty } from 'lodash'
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


const initialState = {
    vdcc__1: {
        id: 'vdcc__1',
        name: 'vdcc',
        index: 1,
        label_short: versionOptions['vdcc'].short,
        label_long: versionOptions['vdcc'].long
    }
}


export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'ADD_VERSION':
            const newVersion = action.payload
            let version, count

            let indexes = []

            for (let v of keys(state)) {
                [version, count] = split(v, '__')

                if (version === newVersion) {
                    indexes.push(toInteger(count))
                }
            }

            const nextIndex = isEmpty(indexes) ? 1 : max(indexes) + 1

            const newKey = `${newVersion}__${nextIndex}`
            const newVersionItem = {
                [newKey]: {
                    id: newKey,
                    name: newVersion,
                    index: nextIndex,
                    label_short: versionOptions[newVersion].short,
                    label_long: versionOptions[newVersion].long
                }
            }

            return { ...state, ...newVersionItem }

        case 'REMOVE_VERSION':
            delete stores[action.payload]
            return omit(state, action.payload)

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