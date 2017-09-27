import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	getOrderItemViews = (list) => {
		return list.map((item, index) => {
			return (
				<div className="order-item" key={index}>
					<div className="order-status">待支付</div>
					<div className="order-content">
						<div className="order-content-item order-title">
							<img className="item-icon"/>
							<div className="item-text">补胎救援</div>
						</div>
						<div className="order-content-item order-address">
							<img className="item-icon"/>
							<div classname="item-text">北京市朝阳区定福庄北里1号院</div>
						</div>
						<div className="order-content-item order-time">
							<img className="item-icon"/>
							<div className="item-text">2017-08-09 12:00</div>
						</div>
					</div>
				</div>
			)
		});
	}

	render() {
		let list = ["", "", 1, 1, 1, 1];
		return (
			<div className="self-order">
				<div className="status-zone">
					<div className="status-item active">全部</div>
					<div className="status-item">待支付</div>
					<div className="status-item">待评价</div>
					<div className="status-item">已完成</div>
				</div>
				<div className="order-list">
					{this.getOrderItemViews(list)}
				</div>
			</div>
		)
	}

}