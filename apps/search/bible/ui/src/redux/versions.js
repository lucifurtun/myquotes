// const versionOptons = {
//     vdcc: 'vdcc',
//     kjv: 'kjv'
// }


const initialState = {
    vdcc: {
        label: 'VDCC',
        store: null
    }
}


export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'ADD_VERSION':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export function addVersion(version) {
    return ({
        type: 'ADD_VERSION',
        payload: { [version]: version }
    })
}