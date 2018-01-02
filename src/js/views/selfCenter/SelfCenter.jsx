import React, {Component} from 'react';
import List, {Item} from "../../components/List/index.js";
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UtilAction from "../_util/action";

class SelfCenter extends Component {

	constructor(props) {
		super(props);
	}

	gotoSelfInfo = e => {
		browserHistory.push("/self/info");
	}

	gotoSelfCar = e => {
		browserHistory.push("/self/car");
	}

	gotoSelfOrder = e => {
		browserHistory.push("/self/order");
	}

	gotoSelfCoupon = e => {
		browserHistory.push("/self/coupon");
	}

	gotoSelfAccount = e => {
		browserHistory.push("/self/account");
	}

	gotoPopularize = e => {
		let {selfInfo} = this.props;
		if(selfInfo.phone != null) {
			browserHistory.push("/self/qrcode");
		} else {
			browserHistory.push("/self/bindPhone");
		}
	}

	render() {
		return (
			<div className="self-center">
				<List>
					<Item onClick={this.gotoSelfInfo}>
						<img className="label-icon ft" src="/images/icon_geren@2x.png"/>
						<div className="label-text ft">个人信息</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
					<Item onClick={this.gotoSelfCar}>
						<img className="label-icon ft" src="/images/icon_che@2x.png"/>
						<div className="label-text ft">我的车辆</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
				</List>
				<List>
					<Item onClick={this.gotoSelfOrder}>
						<img className="label-icon ft" src="/images/icon_dingdan@2x.png"/>
						<div className="label-text ft">我的订单</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
					<Item onClick={this.gotoSelfCoupon}>
						<img className="label-icon ft" src="/images/icon_youhuiquan@2x.png"/>
						<div className="label-text ft">我的优惠券</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
				</List>
				<List>
					<Item onClick={this.gotoSelfAccount}>
						<img className="label-icon ft" src="/images/icon_zhanghu@2x.png"/>
						<div className="label-text ft">我的账号</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
					<Item onClick={this.gotoPopularize}>
						<img className="label-icon ft" src="/images/icon_tuiguang@2x.png"/>
						<div className="label-text ft">我的推广</div>
						<img className="jiaohao tail-icon fr" src="/images/jiaohao@2x.png"/>
					</Item>
				</List>
			</div>
		);
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
		actions: {
			utilAction: bindActionCreators(UtilAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelfCenter)