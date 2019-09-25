const initialState = {
    token: null,
    user: {
        id: null,
        email: null
    },
    errors: {}
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.data.token,
                user: action.payload.data.user,
                errors: {}
            }
        case 'LOGIN_FAIL':
        case 'SIGNUP_FAIL':
            return {
                ...state,
                errors: action.payload
            }
        case 'LOGOUT':
            return initialState

        default:
            return state
    }
}
