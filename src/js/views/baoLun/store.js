import Immutable from "immutable";
import moment from "moment";

export default Immutable.fromJS({
    orderTime: moment().format("YYYY-MM-DD HH:mm"),
    driverName: null,
    driverPhoneNo: null,
    isAgree: true
})