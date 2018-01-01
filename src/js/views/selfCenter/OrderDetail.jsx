import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.js';
import UserInfo from './UserInfo.jsx';
import ws from '../../lib/ws.js';
import history from '../history.jsx';
import {getQueryParams} from '../../lib/utils';
import toast from '../../components/Toast';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		document.title = "订单详情";
		this.refresh();
	}

	refresh = () => {
		let id = getQueryParams(location.search).id;
		ws.get({
			url: '/api/order/' + id
		}).then(response => {
			if(response.code === 0) {
				this.setState({
					...response.data,
					status: response.data.orderStatus.key
				});
			} else {
				toast.show(response.message);
			}
		})
	}

	getOrderStatusView = status => {
		const statusList = ["抢单", "付款", "服务", "评价"];
		return statusList.map((item, index) => {
			let active = false;
			switch (index) {
				case 0:
					active = status && status.key >= 200;
					break;
				case 1:
					active = status && status.key >= 400;
					break;
				case 2:
					active = status && status.key >= 500;
					break;
				case 3:
					active = status && status.key >= 700;
					break;
				default:
					active = false;
			}

			let iconUrl = active ? "/images/duihao_active@2x.png" : "/images/duihao@2x.png";
			return (
				<div key={item} className="status-item">
					<img className="item-icon" src={iconUrl}/>
					<div className="item-text">{item}</div>
				</div>
			)
		})
	}

	onClickConfirm = e => {
		history.goBack();
	}

	onClickPay = e => {
		let _this = this,
			orderId = getQueryParams(location.search).id;
		ws.get({
			url: '/api/order/' + orderId + '/pay'
		}).then(response => {
			if(response.code === 0) {
				_this.pay(response.data);
			} else {
				toast.show(response.message);
			}
		})
	}

	onClickComment = e => {
		let orderId = getQueryParams(location.search).id;
		history.push('/self/order/' + orderId + '/comment')
	}

	pay = (requestData) => {
		let _this = this;
		if(WeixinJSBridge) {
			WeixinJSBridge.invoke('getBrandWCPayRequest', requestData, function(res){
				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					toast.show("支付成功");
					_this.refresh();
				} else {
					toast.show(res.err_msg ? res.err_msg : '支付失败');
				}
			});
		} else {
			toast.show("微信支付不可用，请稍后重试");
		}

	}

	renderSkuList = (skuList) => {
		skuList = skuList ? skuList : [];
		return skuList.map(item => {
			return (
				<tr key={item.skuId}>
					<td className="item-name">{item.skuName != null ? item.skuName : ''}</td>
					<td className="item-operator">x</td>
					<td className="item-count">{item.count != null ? item.count : ''}</td>
				</tr>
			)
		});
	}

	renderMaterialList = (skuList) => {
		skuList = skuList ? skuList : [];
		return skuList.map(item => {
			return (
				<tr key={item.skuId}>
					<td className="item-name">{item.skuName != null ? item.skuName : ''}</td>
					<td className="item-operator">{item.count != null ? item.count : ''}</td>
					<td className="item-count">{item.skuPrice != null ? item.skuPrice : ''}</td>
				</tr>
			)
		});
	}

	getSkuTotalAmount = (skuList) => {
		let result = 0;
		skuList = skuList ? skuList : [];
		skuList.forEach(item => {
			result += item.count * item.skuPrice;
		});
		return result;
	}

	render() {
		let {orderId, createTime, appointmentTime, payTime, serviceCategoryName, serviceName, orderStatus, status, technicianName, technicianScore, technicianAvatarURL, serviceFee, bmpFee, reduce, skuCollection} = this.state;
		orderStatus = orderStatus ? orderStatus : {};
		serviceFee = serviceFee != null ? serviceFee : 0;
		bmpFee = bmpFee != null ? bmpFee : 0;
		let skuTotalAmount = this.getSkuTotalAmount(skuCollection);
		let totalFee = serviceFee + bmpFee + skuTotalAmount;
		return (
			<div className="order-detail">
				<div className="order-status-zone">
					{this.getOrderStatusView(orderStatus)}
				</div>
				<List>
					<Item>
						<div className="label-text ft">订单号</div>
						<div className="text fr">{orderId ? orderId : ''}</div>
					</Item>
					<Item>
						<div className="label-text ft">下单时间</div>
						<div className="text fr">{createTime ? createTime : ''}</div>
					</Item>
					<Item>
						<div className="label-text ft">付款时间</div>
						<div className="text fr">{payTime ? payTime : ''}</div>
					</Item>
				</List>
				<List>
					<Item>
						<div className="label-text ft">服务项目</div>
						<div className="text fr">{serviceCategoryName ? serviceCategoryName : ''}</div>
					</Item>
					<Item>
						<div className="label-text ft">服务详情</div>
						<div className="text fr">{serviceName ? serviceName : ''}</div>
					</Item>
					<Item>
						<div className="label-text ft">服务耗材</div>
						<table className="ft service-material-list">
							<tbody>{this.renderSkuList(skuCollection)}</tbody>
						</table>
					</Item>
				</List>
				<List>
					<UserInfo avatarUrl={technicianAvatarURL} name={technicianName} score={technicianScore}/>
				</List>
				<List style={{display: status >= 300 ? 'block' : 'none'}}>
					<Item>
						<div className="label-text ft">工时费</div>
						<div className="text fr">
							<span>{serviceFee != null ? '¥' + serviceFee : ''}</span>
						</div>
					</Item>
					<Item>
						<table className="material-list">
							<thead>
								<tr>
									<th>耗材</th>
									<th>数量</th>
									<th>费用</th>
								</tr>
							</thead>
							<tbody>{this.renderMaterialList(skuCollection)}</tbody>
						</table>
					</Item>
					<Item>
						<div className="label-text ft">距离费</div>
						<div className="text fr">
							<span>¥</span>
							<span>{bmpFee != null ? bmpFee : '0'}</span>
						</div>
					</Item>
					<Item right={<span>-¥20</span>}>
						<div className="label-text ft">优惠</div>
						<div className="text fr">
							<span>{reduce != null ? '¥ -' + reduce : ''}</span>
						</div>
					</Item>
					<Item>
						<div className="label-text ft">合计</div>
						<div className="text fr">
							<span>{totalFee != null ? '¥' + totalFee : ''}</span>
						</div>
					</Item>
				</List>
				<div className="info-zone">服务不满意，7天内可申请退款。</div>
				<List>
					<div className="btn-zone">
						<button className="block btn" onClick={this.onClickConfirm} style={{display: (orderStatus.key !== 300 && orderStatus.key !== 600) ? 'block' : 'none'}}>确认</button>
						<button className="block btn" onClick={this.onClickPay} style={{display: orderStatus.key === 300 ? 'block' : 'none'}}>去支付</button>
						<button className="block btn" onClick={this.onClickComment} style={{display: orderStatus.key === 600 ? 'block' : 'none'}}>去评价</button>
					</div>
				</List>
			</div>
		)
	}

}