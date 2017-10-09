import React, {Component} from 'react';
import List, {Item} from '../components/List';
import Timer from '../components/Timer';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			phone: "",
			captcha: ""
		}
	}

	onChange(field) {
		return function(e) {
			let stateObject = {},
				value = e.target.value;
			stateObject[field] = value;
			this.setState({
				[field]: value
			});
		}
	}

	onTimerClick = e => {
		this.refs.timer.start();
	}

	render() {
		let {phone, captcha} = this.state;
		return (
			<div className="phone-validate">
				<div className="tip">请绑定您的手机号</div>
				<List>
					<Item right={<Timer ref="timer" startText="发送验证码" endText="重新发送" onClick={this.onTimerClick}/>}>
						<input value={phone} type="text" placeholder="手机号" className="input-phone" onChange={this.onChange("phone").bind(this)}/>
					</Item>
					<Item>
						<input value={captcha} type="text" placeholder="验证码" className="full-width" onChange={this.onChange("captcha").bind(this)}/>
					</Item>
				</List>
				<div className="btn-container">
					<button className="btn block">绑定</button>
				</div>
			</div>
		)
	}

}