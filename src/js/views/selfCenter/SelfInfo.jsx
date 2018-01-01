import React, {Component} from 'react';
import List, {Item} from "../../components/List";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UtilAction from '../_util/action';

class SelfInfo extends Component {

	componentDidMount() {
		document.title = "个人信息";
	}

	render() {
		let {avatarURL, name} = this.props.selfInfo;

		return (
			<div className="self-info">
				<List>
					<Item className="touxiang">
						<div className="label-text ft">头像</div>
						<img src={avatarURL != null ? avatarURL.replace("http://", "https://") : '/images/default_avatar.png'} className="touxiang-img user-avatar fr"/>
					</Item>
					<Item>
						<div className="label-text ft">昵称</div>
						<div className="text fr">{name != null ? name : '***'}</div>
					</Item>
				</List>
			</div>
		)
	}

}

function mapStateToProps(state) {
	let selfInfo = state.reducers.util.toJS().selfInfo;
	return {
		selfInfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actinos: {
			utilAction: bindActionCreators(UtilAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelfInfo)
