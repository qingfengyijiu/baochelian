import React, {Component} from 'react';
import history from '../history.jsx';
import ws from '../../lib/ws.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ThisAction from './action.js';
import * as UtilAction from '../_util/action.js';
import AddOrder from '../../components/AddOrder';

class Rescue extends Component {

	onChangeField = (field, value) => {
		let {model, actions} = this.props;
		model[field] = value;
		actions.thisAction.changeModel(model);
	}

	serviceCategory = {
		serviceCategoryId: '5a3f86f9ac4c1e5154e77975',
		serviceCategoryName: '补胎救援'
	}

	render() {
		return (
			<AddOrder onChangeField={this.onChangeField} serviceCategory={this.serviceCategory} {...this.props}/>
		)
	}
}

function mapStateToProps(state) {
	let position = state.reducers.position.toJS(),
		rescue = state.reducers.rescue.toJS(),
		util = state.reducers.util.toJS(),
		selfInfo = util.selfInfo,
		currentPosition = util.currentPosition,
		userInputLocation = util.userInputLocation;
	return {
		position: {
			location: userInputLocation ? userInputLocation : (position.location != null ? position.location : currentPosition.location),
			locationLng: position.locationLng != null ? position.locationLng : currentPosition.locationLng,
			locationLat: position.locationLat != null ? position.locationLat : currentPosition.locationLat,
			locationDetail: position.locationDetail
		},
		model: rescue,
		selfInfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			thisAction: bindActionCreators(ThisAction, dispatch),
			utilAction: bindActionCreators(UtilAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Rescue)