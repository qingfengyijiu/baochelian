import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0
		}
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

	render() {
		let {tabIndex} = this.state;
		return (
			<div className="self-coupon">
				<div className="tab-container clearfix">
					<div className={"tab-item ft" + (tabIndex === 0 ? " active" : "")} onClick={this.changeTabIndex.bind(this, 0)}>未使用（3）</div>
					<div className={"tab-item ft" + (tabIndex === 1 ? " active" : "")} onClick={this.changeTabIndex.bind(this, 1)}>已使用（10）</div>
				</div>
				<div className="tab-content-container">
					{this.renderCoupon("满减额度")}
					{this.renderCoupon("满减折扣")}
					{this.renderCoupon("立减")}
				</div>
			</div>
		)
	}

}