import React, {Component} from 'react';
import ws from '../../lib/ws.js';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			totalIncome: null,
			flow: []
		}
	}

	componentDidMount() {
		ws.get({
			url: '/api/self/account'
		}).then(response => {
			if(response.code === 0) {
				this.setState({
					totalIncome: response.data.totalIncome,
					flow: response.data.flow
				})
			} else {
				alert(response.message);
			}
		})
	}

	getItemViews = (list) => {
		list = ['', ''];
		return list.map((item, index) => {
			return (
				<div className="account-record-item" key={index}>
					<div className="left">
						<div className="business-type">收入</div>
						<div className="business-time">2017-08-23 12:00</div>
					</div>
					<div className="right">
						<div className="business-number">{"+120.00"}</div>
					</div>
				</div>
			)
		})
	}

	render() {
		let {totalIncome, flow} = this.state;
		return (
			<div className="self-account">
				<div className="income-zone">
					<div className="income-number">{totalIncome != null ? totalIncome : '***'}</div>
					<div className="income-title">总收入（元）</div>
				</div>
				<div className="account-record-list-title">账户记录</div>
				<div className="account-record-list-container">
					{this.getItemViews(flow)}
				</div>
			</div>
		)
	}
}
