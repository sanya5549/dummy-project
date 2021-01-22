const initRandomState = {
    isLoggedIn: false,
    username: "",
    products:null,
    cart:null,
}


const randomReducer = (state = initRandomState, action) => {
    switch(action.type){
        case 'CHANGE_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'CHANGE_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'CHANGE_CART':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state;
    }
}

export default randomReducer;