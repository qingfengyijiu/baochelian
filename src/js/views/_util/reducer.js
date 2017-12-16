import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

function loading(state = initialState.get("loading"), action = {}) {
    switch (action.type) {
        case "LOADING_SHOW":
            return state + 1;
        case "LOADING_HIDE":
            return state - 1;
        default:
            return state;
    }
}

function toast(state = initialState.get("toast"), action = {}) {
    switch (action.type) {
        case "TOAST_SHOW":
            return state.set("show", true).set("text", action.text);
        case "TOAST_HIDE":
            return state.set("show", false).set("text", "");
        default:
            return state;
    }
}

function selfInfo(state = initialState.get("selfInfo"), action = {}) {
    switch (action.type) {
        case "CHANGE_SELF_INFO":
            return _p(action.data);
        default:
            return state;
    }
}

function truckBrandList(state = initialState.get("truckBrandList"), action={}) {
    switch (action.type) {
        case "CHANGE_TRUCK_BRAND_LIST":
            return _p(action.data);
        default:
            return state;
    }
}

export default function (state = initialState, action = {}) {
    return state
        .set("loading", loading(state.get("loading"), action))
        .set("toast", toast(state.get("toast"), action))
        .set("selfInfo", selfInfo(state.get("selfInfo"), action))
        .set("truckBrandList", truckBrandList(state.get("truckBrandList"), action));
}