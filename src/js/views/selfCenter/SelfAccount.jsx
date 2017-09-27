import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	getItemViews = (list) => {
		return list.map((item, index) => {
			return (
				<div className="account-record-item">
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
		let list = ['', ''];
		return (
			<div className="self-account">
				<div className="income-zone">
					<div className="income-number">240.00</div>
					<div className="income-title">总收入（元）</div>
				</div>
				<div className="account-record-list-title">账户记录</div>
				<div className="account-record-list-container">
					{this.getItemViews(list)}
				</div>
			</div>
		)
	}
}
