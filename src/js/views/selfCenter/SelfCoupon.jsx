import React, {Component} from 'react';
import ws from '../../lib/ws';
import toast from '../../components/Toast';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0,
			unused: [],
			used: []
		}
	}

	componentDidMount() {
		toast.show();
		ws.get({
			url: '/api/self/coupons'
		}).then(response => {
			if(response.code === 0) {
				this.setState({
					unused: response.data.unused,
					used: response.data.used
				});
			} else {
				toast.show(response.message);
			}
		})
	}

	changeTabIndex = (index) => {
		this.setState({
			tabIndex: index
		});
	}

	renderFullcutAmountValue = (value) => {
		return (
			<div className="item-value-container">
				<span className="icon-metric">¥</span>
				<span className="cut-value">5</span>
			</div>
		)
	}

	renderFullcutDiscountValue = (value) => {
		return (
			<div className="item-value-container">
				<span className="cut-value">5</span>
				<span className="icon-metric">折</span>
			</div>
		)
	}

	renderInstantcutValue = (value) => {
		return (
			<div className="item-value-container">
				<span className="icon-metric">¥</span>
				<span className="cut-value integer-part">5</span>
				<span className="cut-value float-part">.00</span>
				<span className="cut-value float-part">-</span>
				<span className="cut-value integer-part">18</span>
				<span className="cut-value float-part">.00</span>
			</div>
		)
	}

	renderCoupon = (type) => {
		let couponValueView,
			typeClass;
		switch (type) {
			case "满减额度":
				couponValueView = this.renderFullcutAmountValue();
				typeClass = "fullcut-amount"
				break;
			case "满减折扣":
				couponValueView = this.renderFullcutDiscountValue();
				typeClass = "fullcut-discount";
				break;
			case "立减":
				couponValueView = this.renderInstantcutValue();
				typeClass = "instantcut";
				break;
			default:
				couponValueView = "";
				typeClass = "";
		}
		return (
			<div className={"coupon-item clearfix " + typeClass}>
				<div className="item-left ft">
					{couponValueView}
					<div className="cut-info">满30元使用</div>
				</div>
				<div className="item-right ft">
					<div className="coupon-name">补胎</div>
					<div className="coupon-expiredate">有效期至：2017-10-14</div>
				</div>
			</div>
		);
	}

	renderCouponList = (couponList) => {
		couponList = couponList ? couponList : [];
		return couponList.map(item => {
			return this.renderCoupon(item.type);
		});
	}

	render() {
		let {tabIndex, unused, used} = this.state;
		let unusedCount = unused ? unused.length : 0,
			usedCount = used ? used.length : 0;
		return (
			<div className="self-coupon">
				<div className="tab-container clearfix">
					<div className={"tab-item ft" + (tabIndex === 0 ? " active" : "")} onClick={this.changeTabIndex.bind(this, 0)}>{"未使用（" + unusedCount + "）"}</div>
					<div className={"tab-item ft" + (tabIndex === 1 ? " active" : "")} onClick={this.changeTabIndex.bind(this, 1)}>{"已使用（" + usedCount + "）"}</div>
				</div>
				<div className="tab-content" style={{display: tabIndex === 0 ? "block" : "none"}}>
					<div className="tab-content-container">{this.renderCouponList(unused)}</div>
				</div>
				<div className="tab-content" style={{display: tabIndex === 1 ? "block" : "none"}}>
					<div className="tab-content-container">{this.renderCouponList(used)}</div>
				</div>
			</div>
		)
	}

}