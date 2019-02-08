import { has } from 'lodash'

const initialState = {
    isLoading: false,
    isMobile: window.innerWidth < 768,
    verseOptions: {
        display: false,
        x: 0,
        y: 0
    }
}

export function reducer(state = initialState, action = {}) {
    if (has(action.payload, 'request')) {
        if (has(action.payload, 'status')) {
            return {
                ...state,
                isLoading: false
            }
        } else {
            return {
                ...state,
                isLoading: true
            }
        }
    }

    if (has(action, 'error')) {
        return {
            ...state,
            isLoading: false
        }
    }

    switch(action.type) {
        case 'SHOW_VERSE_OPTIONS':
            return {
                ...state,
                verseOptions: {
                    display: true,
                    ...action.payload
                }
            }
        case 'HIDE_VERSE_OPTIONS':
            return {
                ...state,
                verseOptions: {
                    display: false,
                    ...action.payload
                }
            }
        default:
            return state
    }
}
