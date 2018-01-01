import React from "react";
import * as UtilAction from './_util/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ws from '../lib/ws';
import toast from '../components/Toast';

class App extends React.Component{

    componentDidMount() {
        let {actions} = this.props;
	    ws.get({
		    url: '/api/self/info'
	    }).then(response => {
		    if(response.code === 0) {
			    if(response.data.phone != null) {
			        actions.utilAction.changeSelfInfo(response.data);
			    }
		    } else {
			    toast.show(response.message);
		    }
	    })
	    // 获取品牌列表
	    ws.get({
		    url: '/api/truck/brands'
	    }).then(response => {
		    if(response.code === 0) {
		    	actions.utilAction.changeTruckBrandList(response.data);
		    } else {
			    toast.show(response.message);
		    }
	    });
    }

    render() {
        return (
            <div className="page">
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let utilState = state.reducers.util.toJS();
    return {
        util: utilState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

