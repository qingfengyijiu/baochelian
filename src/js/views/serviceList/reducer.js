import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case "serviceList_CHANGE_DATA_LIST":
            return state.set("dataList", _p(action.data));
        default:
            return state;
    }
}