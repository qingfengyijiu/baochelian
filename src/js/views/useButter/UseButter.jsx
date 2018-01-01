import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ThisAction from './action.js';
import * as UtilAction from '../_util/action.js';
import AddOrder from '../../components/AddOrder';

class UseButter extends Component {

	onChangeField = (field, value) => {
		let {model, actions} = this.props;
		model[field] = value;
		actions.thisAction.changeModel(model);
	}

	serviceCategory = {
		serviceCategoryId: '5a3f8722ac4c1e5154e77977',
		serviceCategoryName: '打黄油'
	}

	render() {
		return (
			<AddOrder onChangeField={this.onChangeField} serviceCategory={this.serviceCategory} {...this.props}/>
		)
	}
}

function mapStateToProps(state) {
	let position = state.reducers.position.toJS(),
		useButter = state.reducers.useButter.toJS(),
		util = state.reducers.util.toJS(),
		selfInfo = util.selfInfo,
		currentPosition = util.currentPosition;
	return {
		position: {
			location: position.location != null ? position.location : currentPosition.location,
			locationLng: position.locationLng != null ? position.locationLng : currentPosition.locationLng,
			locationLat: position.locationLat != null ? position.locationLat : currentPosition.locationLat,
			locationDetail: position.locationDetail
		},
		model: useButter,
		selfInfo: selfInfo
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
)(UseButter)