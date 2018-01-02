import React, {Component} from 'react';
import toast from '../../components/Toast';
import List, {Item} from '../../components/List';
import Timer from '../../components/Timer';
import ws from '../../lib/ws';
import history from '../history.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			phone: null,
			captcha: null
		}
	}

	componentDidMount() {
		document.title = "绑定手机号";
	}

	validatePhoneNo(phone) {
		if(phone == null) {
			return false;
		} else {
			return /^\d{11}$/.test(phone);
		}
	}

	onSendSmscode = e => {
		let {phone} = this.state;
		if(phone == null) {
			toast.show("请输入正确的手机号");
			return;
		}
		ws.get({
			url: '/api/util/captcha',
			data: {
				phone: phone
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
			value = target.value;
			this.setState({
				[field]: value
			});
		}
	}

	submit = () => {
		let {phone, captcha} = this.state;
		if(!this.validatePhoneNo(phone)) {
			toast.show("请输入正确的手机号");
			return;
		}
		if(!this.validateCatpcha(captcha)) {
			toast.show("请输入正确的验证码");
			return;
		}
		ws.post({
			url: '/api/self/bindPhone',
			data: {
				phone: phone,
				captcha: captcha
			}
		}).then(response => {
			if(response.code === 0) {
				toast.show("绑定手机号成功");
				history.push('/self/qrcode');
			} else {
				toast.show(response.message);
			}
		})
	}

	validateCatpcha(captcha) {
		if(captcha == null) {
			return false;
		} else {
			return /^\d{6}$/.test(captcha);
		}
	}

	render() {
		let {phone, captcha} = this.state;
		return (
			<div className="bind-phone">
				<div className="bind-tip">验证手机号，获取二维码。</div>
				<List>
					<Item>
						<input value={phone != null ? phone : ''} type="text" placeholder="请填写手机号" className="input-phone ft" onChange={this.onChange("phone").bind(this)}/>
						<a className="btn-smscode fr" style={{display: this.validatePhoneNo(phone) ? 'block' : 'none'}}><Timer times={60} startStr="发送验证码" endStr="重新发送" clickhandle={this.onSendSmscode}/></a>
					</Item>
					<Item>
						<input value={captcha != null ? captcha : ''} type="text" placeholder="验证码" className="full-width" onChange={this.onChange("captcha").bind(this)}/>
					</Item>
				</List>
				<div className="btn-container">
					<button className="btn block" onClick={this.submit} disabled={!this.validatePhoneNo(phone) || !this.validateCatpcha(captcha)}>确认</button>
				</div>
			</div>
		)
	}
}