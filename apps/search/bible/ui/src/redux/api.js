import { has } from 'lodash'

const initialState = {
    isLoading: false,
    isVisible: false
}

export function reducer(state = initialState, action = {}) {
    if (has(action.payload, 'request')) {
        if (has(action.payload, 'status')) {
            return {
                isLoading: false
            }
        }
        else {
            return {
                isLoading: true
            }
        }
    }

    if (has(action, 'error')) {
        return {
            isLoading: false
        }
    }


    return state
}
