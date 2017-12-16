import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.js';
import UserInfo from './UserInfo.jsx';
import ws from '../../lib/ws.js';
import history from '../history.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		let id = this.props.params.id;
		ws.get({
			url: '/api/order/' + id
		}).then(response => {
			this.setState({
				...response
			});
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
			orderId = this.props.params.id;
		ws.get({
			url: '/api/order/' + orderId + '/pay'
		}).then(response => {
			if(response.code === 0) {
				_this.startPay(response.data.prepayId, response.data.appId);
			} else {
				alert(response.message);
			}
		})
	}

	startPay = (prepayId, appId) => {
		function onBridgeReady(){
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', {
					"appId": appId,     //公众号名称，由商户传入
					"timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
					"nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
					"package":"prepay_id=" + prepayId,
					"signType":"MD5",         //微信签名方式：
					"paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
				},
				function(res){
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				}
			);
		}
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		}else{
			onBridgeReady();
		}
	}

	onClickComment = e => {
		let orderId = this.props.params.id;
		history.push('/self/order/' + orderId + '/comment')
	}

	render() {
		let {id, appointmentTime, payTime, serviceCategoryName, serviceName, status, serviceFee, reduce, totalAmount} = this.state;
		status = status ? status : {};
		return (
			<div className="order-detail">
				<div className="order-status-zone">
					{this.getOrderStatusView(status)}
				</div>
				<List>
					<Item>
						<div className="label-text ft">订单号</div>
						<div className="text fr">{id ? id : ''}</div>
					</Item>
					<Item>
						<div className="label-text ft">下单时间</div>
						<div className="text fr">{appointmentTime ? appointmentTime : ''}</div>
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
						<div className="">
						</div>
					</Item>
				</List>
				<List>
					<UserInfo/>
				</List>
				<List>
					<Item>
						<div className="label-text ft">工时费</div>
						<div className="text fr">
							<span>{serviceFee != null ? '¥' + serviceFee : ''}</span>
						</div>
					</Item>
					<Item>
						<div className="label-text ft">距离费</div>
						<div className="text fr">
							<span>¥</span>
							<span>100</span>
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
							<span>{totalAmount != null ? '¥' + totalAmount : ''}</span>
						</div>
					</Item>
				</List>
				<div className="info-zone">服务不满意，7天内可申请退款。</div>
				<List>
					<div className="btn-zone">
						<button className="block btn" onClick={this.onClickConfirm} style={{display: (status.key !== 300 && status.key !== 600) ? 'block' : 'none'}}>确认</button>
						<button className="block btn" onClick={this.onClickPay} style={{display: status.key === 300 ? 'block' : 'none'}}>去支付</button>
						<button className="block btn" onClick={this.onClickComment} style={{display: status.key === 600 ? 'block' : 'none'}}>去评价</button>
					</div>
				</List>
			</div>
		)
	}

}