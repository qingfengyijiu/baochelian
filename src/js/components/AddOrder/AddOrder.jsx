import React, {Component} from 'react';
import {Link} from 'react-router';
import List, {Item} from '../../components/List';
import history from '../../views/history.jsx';
import OrderTimePicker from '../../components/OrderTimePicker';
import ws from '../../lib/ws.js';
import Timer from '../Timer';
import toast from '../Toast';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let {serviceCategory} = this.props;
		document.title = serviceCategory.serviceCategoryName ? serviceCategory.serviceCategoryName : '';
	}

	componentDidMount() {
		let {selfInfo, actions} = this.props;
		if(selfInfo.phone == null) {
			ws.get({
				url: '/api/self/info'
			}).then(response => {
				if(response.code === 0) {
					actions.utilAction.changeSelfInfo(response.data);
				} else {
					toast.show(response.message);
				}
			})
		}

	}

	submit = () => {
		let {serviceCategoryId, serviceCategoryName} = this.props.serviceCategory,
			{position, model, selfInfo} = this.props,
			{orderTime, driverName, driverPhoneNo, smscode} = model,
			data = {
				serviceCategoryId,
				serviceCategoryName,
				driverLocation: position.location,
				driverLocationLat: position.locationLat,
				driverLocationLng: position.locationLng,
				locationDetail: position.locationDetail,
				driverName: selfInfo.name ? selfInfo.name : driverName,
				driverPhoneNo: selfInfo.phone ? selfInfo.phone : driverPhoneNo,
				orderTime,
				skuCollection: []
			};
		if(smscode != null) {
			data.captcha = smscode;
		}
		ws.post({
			url: '/api/order',
			data: data
		}).then(response => {
			if(response.code === 0) {
				toast.show("下单成功");
				history.push('/self/order');
			} else {
				toast.show(response.message);
			}
		})
	}

	confirmOrderTime = (value) => {
		let {onChangeField} = this.props;
		onChangeField && onChangeField("orderTime", value);
	}

	onTimePickerShow = e => {
		this.refs.picker.show();
	}

	onSendSmscode = e => {
		let {driverPhoneNo} = this.props.model;
		if(driverPhoneNo == null) {
			toast.show("请输入正确的手机号");
			return;
		}
		ws.get({
			url: '/api/util/captcha',
			data: {
				phone: driverPhoneNo
			}
		}).then(response => {
			if(response.code === 0) {
				toast.show("验证码发送成功");
			} else {
				toast.show(response.message);
			}
		})
	}

	onChange = function(field) {
		return function(e) {
			let target = e.target,
				value;
			if(field === "isAgree") {
				value = target.checked;
			} else {
				value = target.value;
			}
			this.props.onChangeField && this.props.onChangeField(field, value);
		}
	}

	gotoPosition = e => {
		history.push('/position');
	}

	validatePhoneNo(phone) {
		if(phone == null) {
			return false;
		} else {
			return /^\d{11}$/.test(phone);
		}
	}

	onChangePosition = e => {
		let {actions, position} = this.props;
		position.location = e.target.value;
		actions.utilAction.changeCurrentPosition(position);
	}

	render() {
		let {position, selfInfo, model} = this.props,
			{driverName, driverPhoneNo, smscode, orderTime, isAgree} = model;
		return (
			<div className="rescue">
				<List>
					{selfInfo.name ? (
						<Item>
							<label className="label-text ft">用户名</label>
							<div className="text ft">{selfInfo.name ? selfInfo.name : ''}</div>
						</Item>
					) : (
						<Item>
							<input value={driverName ? driverName : ''}
							       type="text"
							       placeholder="用户名"
							       className="full-width"
							       onChange={this.onChange("driverName").bind(this)}/>
						</Item>
					)}
					{selfInfo.phone ? (
						<Item>
							<label className="label-text ft">手机号</label>
							<div className="text ft">{selfInfo.phone ? selfInfo.phone : ''}</div>
						</Item>
					) : (
						<Item>
							<input value={driverPhoneNo ? driverPhoneNo : ''} type="text" placeholder="手机号" className="input-phone ft" onChange={this.onChange("driverPhoneNo").bind(this)}/>
							<a className="btn-smscode fr" style={{display: this.validatePhoneNo(driverPhoneNo) ? 'block' : 'none'}}><Timer times={60} startStr="发送验证码" endStr="重新发送" clickhandle={this.onSendSmscode}/></a>

						</Item>
					)}
					{selfInfo.phone ? undefined : (
						<Item>
							<input value={smscode ? smscode : ''} type="text" placeholder="验证码" className="full-width" onChange={this.onChange("smscode").bind(this)}/>
						</Item>
					)}
				</List>
				<List>
					<Item>
						<input type="text" className="input-position" placeholder="您的位置" value={position.location ? position.location : ''} onChange={this.onChangePosition}/>
						<img className="address fr tail-icon" src="images/rescue/address@2x.png" onClick={this.gotoPosition}/>
					</Item>
					<Item onClick={this.onTimePickerShow}>
						<div className="text ft">{orderTime && orderTime.length > 0 ? orderTime : '预约时间'}</div>
						<img className="jiaohao fr tail-icon" src="images/jiaohao@2x.png"/>
					</Item>
				</List>
				<div className="agreement">
					<label>
						<input type="checkbox" className="checkbox" name="agreementCheckbox" checked={isAgree} onChange={this.onChange("isAgree").bind(this)}/>
						<span className="content">同意</span>
					</label>
					<Link className="link content" href="/html/agreement1.html">《保车连服务协议》</Link>
				</div>
				<div className="btn-container">
					<button className="btn block" onClick={this.submit} disabled={!isAgree}>提交订单</button>
				</div>
				<OrderTimePicker ref="picker" confirm={this.confirmOrderTime}/>
			</div>
		)
	}
}