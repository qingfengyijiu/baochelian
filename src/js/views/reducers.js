import {combineReducers} from "redux";
import enums from "./_enums/reducer.js";


function rescue(state, action) {
    switch (action.type) {
        case 1:
            break;
        default:
            return state;
    }
}

export default combineReducers({
    enums: enums
})