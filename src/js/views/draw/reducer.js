import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case "POSITION_CHANGE_DATA":
            return _p(action.data);
        default:
            return state;
    }
}