import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ThisAction from './action.js';
import * as UtilAction from '../_util/action.js';
import AddOrder from '../../components/AddOrder';

class BaoLun extends Component {

	onChangeField = (field, value) => {
		let {model, actions} = this.props;
		model[field] = value;
		actions.thisAction.changeModel(model);
	}

	serviceCategory = {
		serviceCategoryId: '5a3f873dac4c1e5154e77979',
		serviceCategoryName: '保轮'
	}

	render() {
		return (
			<AddOrder onChangeField={this.onChangeField} serviceCategory={this.serviceCategory} {...this.props}/>
		)
	}
}

function mapStateToProps(state) {
	let position = state.reducers.position.toJS(),
		baoLun = state.reducers.baoLun.toJS(),
		selfInfo = state.reducers.util.toJS().selfInfo;
	return {
		position: position,
		model: baoLun,
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
)(BaoLun)