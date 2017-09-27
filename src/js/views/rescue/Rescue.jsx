import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.jsx';
import history from '../history.jsx';
import MultiPicker from '../../components/MultiPicker/index.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pickerOptions: []
		}
	}

	componentWillMount() {
		document.title = "补胎救援";
	}

	submit = () => {
		history.push('/');
	}

	confirmServiceTime = (value) => {

	}

	render() {
		let pickerOpitons = [["今天", "明天", "test"] ["立即救援", ""]];
		return (
			<div className="rescue">
				<List>
					<Item>
						<input type="text" placeholder="用户名" className="full-width"/>
					</Item>
					<Item right={<a className="btn-smscode">发送验证码</a>}>
						<input type="text" placeholder="手机号"/>
					</Item>
					<Item>
						<input type="text" placeholder="验证码" className="full-width"/>
					</Item>
				</List>
				<List>
					<Item right={<img className="address" src="images/rescue/address@2x.png"/>}>
						<input type="text" placeholder="您的位置"/>
					</Item>
					<Item right={<img className="jiaohao" src="images/jiaohao@2x.png"/>}>
						<input disabled value="立即救援"/>
					</Item>
				</List>
				<div className="agreement">
					<label><input type="checkbox" className="checkbox"/><span className="content">同意</span></label><a className="link content">《保车连服务协议》</a>
				</div>
				<div className="btn-container">
					<button className="btn block">提交订单</button>
				</div>
				<MultiPicker ref="picker" pickerOptions={pickerOptions} defaultValue={[0,0,0]} confirm={this.confirmServiceTime}/>
			</div>
		)
	}
}