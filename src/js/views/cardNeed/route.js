import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CarNeed from "./CarNeed.jsx";
import ProductDetail from "./ProductDetail.jsx";

export default (
    <Route path="carneed">
	    <IndexRoute component={CarNeed}/>
	    <Route path=":id" component={ProductDetail}/>
    </Route>
)