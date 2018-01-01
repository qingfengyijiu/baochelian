import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.js';
import ws from '../../lib/ws.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TruckBrandAction from '../truckBrand/action.js';
import history from '../history.jsx';
import toast from '../../components/Toast';

class SelfCar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			truckBrand: null,
			truckSeries: null,
			truckModel: null,
			plateNo: null,
			vin: null
		}
	}

	componentDidMount() {
		let _this = this;
		// 获取车辆信息
		ws.get({
			url: "/api/self/truck"
		}).then(response => {
			if(response.code === 0) {
				_this.setState({
					truckBrand: response.data.truckBrand,
					truckModel: response.data.truckModel,
					truckSeries: response.data.truckSeries,
					plateNo: response.data.plateNo,
					vin: response.data.vin
				});
			} else {
				toast.show(response.message);
			}
		});
	}

	onChange = e => {
		let target = e.target,
			field = target.getAttribute("name");
		this.setState({
			[field]: target.value
		});
	}

	gotoBrandPicker = e => {
		history.push("/truckBrand");
	}

	onSubmit = e => {
		let {truckBrand, truckSeries, truckModel, plateNo, vin} = this.state;
		let selectedTruckInfo = this.props.truckBrand;
		truckBrand = selectedTruckInfo.selectedBrand ? selectedTruckInfo.selectedBrand.brand : truckBrand;
		truckSeries = selectedTruckInfo.selectedSeries ? selectedTruckInfo.selectedSeries.series_name : truckSeries;
		truckModel = selectedTruckInfo.selectedModel ? selectedTruckInfo.selectedModel.model : truckModel;
		ws.put({
			url: '/api/self/truck',
			data: {
				plateNo,
				VIN: vin,
				truckBrand,
				truckSeries,
				truckModel
			}
		}).then(response => {
			if(response.code === 0) {
				toast.show("修改成功");
				history.goBack();
			} else {
				toast.show(response.message);
			}
		})
	}

	render() {
		let {truckBrand, truckSeries, truckModel, plateNo, vin} = this.state;
		let selectedTruckInfo = this.props.truckBrand;
		truckBrand = selectedTruckInfo.selectedBrand ? selectedTruckInfo.selectedBrand.brand : truckBrand;
		truckSeries = selectedTruckInfo.selectedSeries ? selectedTruckInfo.selectedSeries.series_name : truckSeries;
		truckModel = selectedTruckInfo.selectedModel ? selectedTruckInfo.selectedModel.model : truckModel;
		return (
			<div className="self-car">
				<List>
					<Item>
						<div className="label-text ft">车辆品牌</div>
						<input type="text" className="fr" name="truckBrand" onChange={this.onChange}
						       value={truckBrand != null ? truckBrand : ''} readOnly="readOnly" onClick={this.gotoBrandPicker}/>
					</Item>
					<Item>
						<div className="label-text ft">车辆系列</div>
						<input type="text" className="fr" name="truckSeries" onChange={this.onChange}
						       value={truckSeries != null ? truckSeries : ''} readOnly="readOnly" onClick={this.gotoBrandPicker}/>
					</Item>
					<Item>
						<div className="label-text ft">车辆型号</div>
						<input type="text" className="fr" name="truckModel" onChange={this.onChange}
						       value={truckModel != null ? truckModel : ''} readOnly="readOnly" onClick={this.gotoBrandPicker}/>
					</Item>
				</List>
				<List>
					<Item>
						<div className="label left">
							<span className="label-text">车辆牌号</span>
						</div>
						<input type="text" className="fr" name="plateNo" onChange={this.onChange} value={plateNo != null ? plateNo : ''}/>
					</Item>
					<Item>
						<div className="label left">
							<span className="label-text">车架号</span>
						</div>
						<input type="text" className="fr" name="vin" onChange={this.onChange} value={vin != null ? vin : ''}/>
					</Item>
				</List>
				<div className="btn-container">
					<button className="btn block" onClick={this.onSubmit}>提交修改</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let truckBrand = state.reducers.truckBrand.toJS();
	return {
		truckBrand
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actinos: {
			truckBrandAction: bindActionCreators(TruckBrandAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelfCar)