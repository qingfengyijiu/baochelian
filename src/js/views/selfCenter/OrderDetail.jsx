import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.js';
import UserInfo from './UserInfo.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	getOrderStatusView = status => {
		const statusList = ["抢单", "付款", "服务", "评价"];
		return statusList.map(item => {
			let active = true,
				iconUrl = active ? "/images/duihao_active@2x.png" : "/images/duihao@2x.png";
			return (
				<div key={item} className="status-item">
					<img className="item-icon" src={iconUrl}/>
					<div className="item-text">{item}</div>
				</div>
			)
		})
	}

	render() {
		let status = 1;
		return (
			<div className="order-detail">
				<div className="order-status-zone">
					{this.getOrderStatusView(status)}
				</div>
				<List>
					<Item center={<span>12345678</span>}><span className="left">订单号</span></Item>
					<Item center={<span>2017-08-09 12:00</span>}><span className="left">下单时间</span></Item>
					<Item center={<span>2017-08-09 12:00</span>}><span className="left">付款时间</span></Item>
				</List>
				<List>
					<Item center={<span>12345678</span>}><span className="left">服务项目</span></Item>
					<Item center={<span>2017-08-09 12:00</span>}><span className="left">服务详情</span></Item>
					<Item center={<span>2017-08-09 12:00</span>}><span className="left">服务耗材</span></Item>
				</List>
				<List>
					<UserInfo/>
				</List>
				<List>
					<Item right={<span>¥100</span>}><span className="left">工时费</span></Item>
					<Item right={<span>¥100</span>}><span className="left">距离费</span></Item>
					<Item right={<span>-¥20</span>}><span className="left">优惠</span></Item>
					<Item right={<span>¥100</span>}><span className="left">合计</span></Item>
				</List>
				<div className="info-zone">服务不满意，7天内可申请退款。</div>
				<List>
					<div className="btn-zone">
						<button className="block btn">确认</button>
					</div>
				</List>
			</div>
		)
	}

}