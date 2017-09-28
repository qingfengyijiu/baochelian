import React, {Component} from 'react';
import List, {Item} from '../../components/List';
import history from '../history.jsx';
import MultiPicker from '../../components/MultiPicker/index.jsx';
import moment from 'moment';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pickerOptions: []
		}
		let now = moment(),
			days = ["立即救援", "今天", "明天"],
			hours = [],
			minutes = [];
		now.add(1, "days");
		for(let i = 0; i < 30; i++) {
			now.add(1, "days");
			days.push(now.format("YYYY-MM-DD"));
		}
		for(let i = 0; i < 24; i++) {
			if(i < 10) {
				hours.push("0" + i + "时");
			} else {
				hours.push(i + "时");
			}
		}
		for(let i = 0; i < 60; i = i + 5) {
			if(i < 10) {
				minutes.push("0" + i + "分");
			} else {
				minutes.push(i + "分");
			}
		}
		this.days = days;
		this.hours = hours;
		this.minutes = minutes;
	}

	componentWillMount() {
		document.title = "补胎救援";
	}

	submit = () => {
		history.push('/');
	}

	confirmServiceTime = (value) => {
		console.log(value);
	}

	onTimePickerShow = e => {
		this.refs.picker.show();
	}

	render() {
		return (
			<div className="rescue">
				<List>
					<Item>
						<input type="text" placeholder="用户名" className="full-width"/>
					</Item>
					<Item right={<a className="btn-smscode">发送验证码</a>}>
						<input type="text" placeholder="手机号" className="input-phone"/>
					</Item>
					<Item>
						<input type="text" placeholder="验证码" className="full-width"/>
					</Item>
				</List>
				<List>
					<Item right={<img className="address" src="images/rescue/address@2x.png"/>}>
						<input type="text" placeholder="您的位置"/>
					</Item>
					<Item right={<img className="jiaohao" src="images/jiaohao@2x.png"/>} onClick={this.onTimePickerShow}>
						<div>立即救援</div>
					</Item>
				</List>
				<div className="agreement">
					<label><input type="checkbox" className="checkbox"/><span className="content">同意</span></label><a className="link content">《保车连服务协议》</a>
				</div>
				<div className="btn-container">
					<button className="btn block">提交订单</button>
				</div>
				<MultiPicker ref="picker" num={3} options={[this.days, this.hours, this.minutes]} confirm={this.confirmServiceTime}/>
			</div>
		)
	}
}