import React from 'react';
import {Route, IndexRoute} from 'react-router';
import SelfCenter from "./SelfCenter.jsx";
import SelfInfo from "./SelfInfo.jsx";
import SelfCar from "./SelfCar.jsx";
import SelfAccount from "./SelfAccount.jsx";
import SelfOrder from "./SelfOrder.jsx";
import OrderDetail from "./OrderDetail.jsx";
import ServiceComment from "./ServiceComment.jsx";

export default (
    <Route path="self">
	    <Route path="center" component={SelfCenter}/>
	    <Route path="info" component={SelfInfo}/>
	    <Route path="car" component={SelfCar}/>
	    <Route path="account" component={SelfAccount}/>
	    <Route path="order">
		    <IndexRoute component={SelfOrder}/>
		    <Route path=":id" component={OrderDetail}/>
	    </Route>
	    <Route path="servicecomment" component={ServiceComment}/>
    </Route>
)