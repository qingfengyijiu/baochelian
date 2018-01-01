import React, {Component} from 'react';
import ws from '../../lib/ws.js';
import InfiniteScroller from 'react-infinite-scroller';
import history from '../history.jsx';
import toast from '../../components/Toast';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			status: -1,
			orderList: [],
			hasMore: true
		}
	}

	loadMore = (page) => {
		let {orderList} = this.state;
		ws.get({
			url: '/api/order?page=' + page
		}).then(response => {
			if(response.code === 0) {
				orderList = orderList.concat(response.data.orderList);
				let hasMore = ((response.pagination.pageNo - 1) * response.pagination.pageSize + response.data.orderList.length) < response.pagination.total;
				this.setState({
					orderList: orderList,
					hasMore: hasMore
				});
			} else {
				toast.show(response.message);
				this.setState({
					hasMore: false
				});
			}
		})
	}

	gotoOrderDetail = (orderId) => {
		location.href = "/self/order/detail?id=" + orderId;
	}

	getOrderItemViews = (list) => {
		let {orderList, status} = this.state;
		orderList = orderList ? orderList : [];
		if(status !== -1) {
			orderList = orderList.filter(item => item.status.key === status);
		}
		return orderList.map((item, index) => {
			let statusClassName = "";
			switch(item.status.key) {
				case 100:
					statusClassName = "not-accepted";
					break;
				case 300:
					statusClassName = "not-paid";
					break;
				case 600:
					statusClassName = "not-comment";
					break;
				case 700:
					statusClassName = "complete";
					break;
				default:
					statusClassName = "not-accepted";
			}
			return (
				<div className="order-item" key={item.id ? item.id : index} data-id={item.id} onClick={this.gotoOrderDetail.bind(this, item.id)}>
					<div className={"order-status " + statusClassName}>{item.status ? item.status.value : ''}</div>
					<div className="order-content">
						<div className="order-content-item order-title">
							<img className="item-icon" src="/images/icon_luntai@2x.png"/>
							<div className="item-text">{item.serviceCategoryName ? item.serviceCategoryName : ''}</div>
						</div>
						<div className="order-content-item order-address">
							<img className="item-icon" src="/images/icon_address@2x.png"/>
							<div className="item-text">{item.driverLocation ? item.driverLocation: ''}</div>
						</div>
						<div className="order-content-item order-time">
							<img className="item-icon" src="/images/icon_time@2x.png"/>
							<div className="item-text">{item.appointmentTime ? item.appointmentTime : ''}</div>
						</div>
					</div>
				</div>
			)
		});
	}

	onChangeStatus = e => {
		let target = e.target,
			status = Number(target.dataset.status);
		this.setState({
			status: status
		});
	}

	render() {
		let {status, orderList} = this.state;
		return (
			<div className="self-order">
				<div className="status-zone">
					<div className={"status-item" + (status === - 1 ? " active" : "")} onClick={this.onChangeStatus} data-status="-1">全部</div>
					<div className={"status-item" + (status === 300 ? " active" : "")} onClick={this.onChangeStatus} data-status="300">待支付</div>
					<div className={"status-item" + (status === 600 ? " active" : "")} onClick={this.onChangeStatus} data-status="600">待评价</div>
					<div className={"status-item" + (status === 700 ? " active" : "")} onClick={this.onChangeStatus} data-status="700">已完成</div>
				</div>
				<div className="order-list">
					<InfiniteScroller className="game-container"
					                  pageStart={0}
					                  loadMore={this.loadMore}
					                  useWindow={true}
					                  hasMore={this.state.hasMore}>
						{this.getOrderItemViews(orderList)}
					</InfiniteScroller>
				</div>
			</div>
		)
	}

}