import Immutable from "immutable";

export default Immutable.fromJS({
    loading: 0,
    toast: {
        text: "",
        show: false
    },
    selfInfo: {

    },
    truckBrandList: {
        hotBrands: [],
        truckModels: []
    },
    currentPosition: {
        location: null,
        locationLng: null,
        locationLat: null
    },
    userInputLocation: null
})