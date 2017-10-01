import React, {Component} from 'react';
import List, {Item} from '../../components/List';
import history from '../history.jsx';
import OrderTimePicker from '../../components/OrderTimePicker';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pickerOptions: [],
			driverName: "",
			driverPhoneNo: "",
			orderTime: "",
			smscode: ""
		}

	}

	componentWillMount() {
		document.title = "补胎救援";
	}

	submit = () => {
		history.push('/');
	}

	confirmOrderTime = (value) => {
		this.setState({
			orderTime: value
		});
	}

	onTimePickerShow = e => {
		this.refs.picker.show();
	}

	onChange = function(field) {
		return function(e) {
			let value,
				stateObject = {};
			value = e.target.value;
			stateObject[field] = value;
			this.setState(stateObject);
		}
	}

	render() {
		let {driverName, driverPhoneNo, smscode, orderTime} = this.state;
		return (
			<div className="rescue">
				<List>
					<Item>
						<input value={driverName} type="text" placeholder="用户名" className="full-width" onChange={this.onChange("driverName").bind(this)}/>
					</Item>
					<Item right={<a className="btn-smscode">发送验证码</a>}>
						<input value={driverPhoneNo} type="text" placeholder="手机号" className="input-phone" onChange={this.onChange("driverPhoneNo").bind(this)}/>
					</Item>
					<Item>
						<input value={smscode} type="text" placeholder="验证码" className="full-width" onChange={this.onChange("smscode").bind(this)}/>
					</Item>
				</List>
				<List>
					<Item right={<img className="address" src="images/rescue/address@2x.png"/>}>
						<div>您的位置</div>
					</Item>
					<Item right={<img className="jiaohao" src="images/jiaohao@2x.png"/>} onClick={this.onTimePickerShow}>
						<div>{orderTime && orderTime.length > 0 ? orderTime : '预约时间'}</div>
					</Item>
				</List>
				<div className="agreement">
					<label><input type="checkbox" className="checkbox"/><span className="content">同意</span></label><a className="link content">《保车连服务协议》</a>
				</div>
				<div className="btn-container">
					<button className="btn block">提交订单</button>
				</div>
				<OrderTimePicker ref="picker" confirm={this.confirmOrderTime}/>
			</div>
		)
	}
}