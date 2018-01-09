import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ThisAction from './action.js';
import ws from '../../lib/ws';
import toast from '../../components/Toast';

class ServiceList extends Component {

	componentDidMount() {
		document.title = "服务费用表";
		let {dataList, actions} = this.props;
		if(dataList == null || dataList.length == 0) {
			ws.get({
				url: "/api/serviceCategory"
			}).then(response => {
				if(response.code === 0) {
					actions.thisAction.changeDataList(response.data);
				} else {
					toast.show(response.message);
				}
			});
		}

	}

	renderList = (categoryList) => {
		categoryList = categoryList ? categoryList : [];
		let dataList = [];
		categoryList.forEach(category => {
			let categoryName = category.name;
			category.childServices = category.childServices ? category.childServices : [];
			category.childServices.forEach((service, idx) => {
				let serviceCategoryName = idx === 0 ? categoryName : '';
				dataList.push({
					serviceId: service.id,
					categoryName: serviceCategoryName,
					serviceName: service.name,
					serviceFee: service.hourlyCharge
				});
			});
		});
		return dataList.map(item => {
			return (
				<tr key={item.serviceId}>
					<td>{item.categoryName}</td>
					<td>{item.serviceName}</td>
					<td>{item.serviceFee}</td>
				</tr>
			)
		})
	}

	render() {
		return (
			<div className="service-fee-list">
				<div className="tip">费用仅包含工时费，服务所需耗材不包含在内</div>
				<table>
					<thead>
						<tr>
							<th>服务项目</th>
							<th>子服务</th>
							<th>工时费</th>
						</tr>
					</thead>
					<tbody>{this.renderList(this.props.dataList)}</tbody>
				</table>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let dataList = state.reducers.serviceList.toJS().dataList;
	return {
		dataList
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			thisAction: bindActionCreators(ThisAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ServiceList)