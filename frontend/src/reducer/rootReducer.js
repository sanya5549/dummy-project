import randomReducer from "./RandomReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    random: randomReducer
})

export default rootReducer;