const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'


const initialState = {
    token: null,
    user: {
        id: null,
        email: null
    },
    isAuthenticated: false,
    errors: {}
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.data,
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.data.token,
                user: action.payload.data.user,
                isAuthenticated: true,
                errors: {}
            }
        case 'LOGIN_FAIL':
        case 'SIGNUP_FAIL':
            return {
                ...state,
                isAuthenticated: false,
                errors: action.payload
            }
        case 'LOGOUT':
            return initialState

        default:
            return state
    }
}

export const updateUser = (user) => {
    const url = '/users/me/'

    return {
        type: UPDATE_USER,
        payload: {
            request: {
                url: url,
                method: 'PATCH',
                data: user
            }
        }
    }
}
