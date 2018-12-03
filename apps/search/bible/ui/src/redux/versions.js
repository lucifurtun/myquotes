const versionOptons = {
    vdcc: 'vdcc',
    kjv: 'kjv'
}

const initialState = {
    selected: { vdcc: 'vdcc' },

}

const initializeVersion = (label) => ({
    label: label,
    books: { data: {}, count: 0 },
    chapters: { data: {}, count: 0 },
    verses: { data: {}, count: 0 },
    filters: { book: null, chapter: null, search: null }
})

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'ADD_VERSION':
            console.log(state)
            console.log(action.payload)
            return {
                selected: { ...state.selected, ...action.payload },
            }
        default:
            return state
    }
}
