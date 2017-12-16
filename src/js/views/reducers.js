import {combineReducers} from "redux";
import enums from "./_enums/reducer.js";
import util from "./_util/reducer.js";
import position from './position/reducer.js';
import rescue from './rescue/reducer.js';
import useButter from './useButter/reducer.js';
import truckBrand from './truckBrand/reducer.js';

export default combineReducers({
    enums,
    util,
    position,
    rescue,
    useButter,
    truckBrand
})