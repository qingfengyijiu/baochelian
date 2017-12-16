import React, {Component} from 'react';
import List, {Item} from '../../components/List';
import history from '../../views/history.jsx';
import OrderTimePicker from '../../components/OrderTimePicker';
import ws from '../../lib/ws.js';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pickerOptions: [],
			driverName: "",
			phone: "",
			orderTime: "",
			smscode: "",
			isPhoneBind: false
		}
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
					alert(response.message);
				}
			})
		}

	}

	submit = () => {
		let {serviceCategoryId, serviceCategoryName} = this.props.serviceCategory,
			{position, model, selfInfo} = this.props,
			{orderTime, driverName, driverPhoneNo} = model,
			data = {
				serviceCategoryId,
				serviceCategoryName,
				location: position.location,
				locationLat: position.locationLat,
				locationLng: position.locationLng,
				locationDetail: position.locationDetail,
				driverName: selfInfo.name ? selfInfo.name : driverName,
				driverPhoneNo: selfInfo.phone ? selfInfo.phone : driverPhoneNo,
				orderTime
			};
		ws.post({
			url: '/api/order',
			data: data
		}).then(response => {
			if(response.code === 0) {
				if(response.data.phone != null) {
					history.push('/');
				}
			} else {
				alert(response.message);
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
		let {phone} = this.state;
		if(phone == null) {
			alert("请输入正确的手机号");
			return;
		}
		ws.get({
			url: '/api/util/captcha?phone=' + phone
		}).then(response => {

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
							<input value={driverPhoneNo ? driverPhoneNo : ''} type="text" placeholder="手机号" className="input-phone ft" onChange={this.onChange("phone").bind(this)}/>
							<a className="btn-smscode fr" onClick={this.onSendSmscode}>发送验证码</a>
						</Item>
					)}
					{selfInfo.phone ? undefined : (
						<Item>
							<input value={smscode} type="text" placeholder="验证码" className="full-width" onChange={this.onChange("smscode").bind(this)}/>
						</Item>
					)}
				</List>
				<List>
					<Item onClick={this.gotoPosition}>
						<div className="text ft">{position.location ? position.location : '您的位置'}</div>
						<img className="address fr tail-icon" src="images/rescue/address@2x.png"/>
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
					<a className="link content">《保车连服务协议》</a>
				</div>
				<div className="btn-container">
					<button className="btn block" onClick={this.submit} disabled={!isAgree}>提交订单</button>
				</div>
				<OrderTimePicker ref="picker" confirm={this.confirmOrderTime}/>
			</div>
		)
	}
}