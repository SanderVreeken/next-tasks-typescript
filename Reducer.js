export const initialState = {
    modal: false
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'UPDATE_MODAL':
            return { 
                ...state,
                modal: action.item
            }     
        case 'UPDATE_SELECTED':
            return { 
                ...state,
                selected: action.item
            }   
        default:
            return state  
    }
}

export default reducer