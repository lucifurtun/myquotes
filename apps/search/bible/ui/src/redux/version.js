export function reducer(state = {}, action = {}) {
    switch(action.type) {
        case 'SET_VERSION':
            return action.payload
        default:
            return state
    }
}
