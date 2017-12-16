import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import App from "./App.jsx";
import PhoneValidate from "./PhoneValidate.jsx";

import rescueRoute from "./rescue/route";
import positionRoute from "./position/route";
import carneedRoute from "./cardNeed/route";
import selfCenterRoute from "./selfCenter/route";
import useButterRoute from "./useButter/route";
import truckBrandRoute from './truckBrand/route';

export default class extends React.Component {

    render() {
        let {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    {rescueRoute}
                    {positionRoute}
                    {carneedRoute}
                    {selfCenterRoute}
                    {useButterRoute}
                    {truckBrandRoute}
                    <Route path="phoneValidate" component={PhoneValidate}/>
                </Route>
            </Router>
        );
    }
}