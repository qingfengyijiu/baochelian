import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case "daoLun_CHANGE_MODEL":
            return _p(action.data);
        default:
            return state;
    }
}