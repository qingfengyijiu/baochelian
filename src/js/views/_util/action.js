export function showLoading() {
    return {
        type: "LOADING_SHOW"
    }
}

export function hideLoading() {
    return {
        type: "LOADING_HIDE"
    }
}

export function showToast(text) {
    return {
        type: "TOAST_SHOW",
        text
    }
}

export function hideToast() {
    return {
        type: "TOAST_HIDE"
    }
}

export function changeSelfInfo(data) {
    return {
        type: "CHANGE_SELF_INFO",
        data
    }
}

export function changeTruckBrandList(data) {
    return {
        type: "CHANGE_TRUCK_BRAND_LIST",
        data
    }
}

export function changeCurrentPosition(data) {
    return {
        type: 'CHANGE_CURRENT_POSITION',
        data
    }
}