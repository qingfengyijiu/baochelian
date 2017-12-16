import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ThisAction from './action.js';
import * as UtilAction from '../_util/action.js';
import history from '../history.jsx';
import ws from '../../lib/ws';

class TruckBrand extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showPop: true,
			searchText: null,
			hotBrandList: [],
			wholeBrandList: []
		}
	}

	componentDidMount() {
		let {truckBrandList, actions} = this.props;
		if(truckBrandList.hotBrands == null || truckBrandList.hotBrands.length <= 0) {
			ws.get({
				url: '/api/truck/brands'
			}).then(response => {
				if(response.code === 0) {
					actions.utilAction.changeTruckBrandList(response.data);
					this.setState({
						hotBrandList: response.data.hotBrands,
						wholeBrandList: response.data.truckModels
					})
				} else {
					alert(response.message);
				}
			});
		}
	}

	changeSelectedBrand(brand) {
		let {truckBrand, actions} = this.props;
		truckBrand.selectedBrand = brand;
		actions.thisAction.changeData(truckBrand);
		this.setState({
			showPop: true
		});
	}

	changeSelectedSeries(series) {
		let {truckBrand, actions} = this.props;
		truckBrand.selectedSeries = series;
		actions.thisAction.changeData(truckBrand);
	}

	changeSelectedModel(model) {
		let {truckBrand, actions} = this.props;
		truckBrand.selectedModel = model;
		actions.thisAction.changeData(truckBrand);
		history.goBack();
	}

	renderHotBrand = (data) => {
		let {selectedBrand} = this.props;
		data = data ? data : [];
		return data.map(item => {
			return (
				<div key={item.brand} className={"hot-brand-item" + (selectedBrand && (item.brand == selectedBrand.brand) ? " active" : "")} onClick={this.changeSelectedBrand.bind(this, item)}>{item.brand ? item.brand : ''}</div>
			)
		})
	}

	renderBrandListByAlphabet = (data) => {
		data = data ? data : [];
		return data.map(item => {
			return (
				<div key={item.brand} className="brand-sub-list-item" onClick={this.changeSelectedBrand.bind(this, item)}>{item.brand ? item.brand : ''}</div>
			)
		});
	}

	renderBrandList = (data) => {
		let {selectedBrand} = this.props;
		data = data ? data : [];
		let group = {},
			alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		for(let i = 0; i < data.length; i++) {
			let key = data[i].initial;
			if(group[key] == null) {
				group[key] = [];
			}
			group[key].push(data[i]);
		}
		return alphabet.map(item => {
			if(group[item] && group[item].length > 0) {
				return (
					<div key={item} className="brand-sub-list">
						<a className="brand-sub-list-title" href={"#" + item}>{item}</a>
						<div className="brand-sub-list-container">
							{this.renderBrandListByAlphabet(group[item])}
						</div>
					</div>
				)
			}
		})
		return data.map(item => {
			return (
				<div key={item.brand} className={"hot-brand-item" + (item.brand == selectedBrand.brand ? " active" : "")}>{item.brand ? item.brand : ''}</div>
			)
		})
	}

	renderSeriesList = (brand) => {
		let {selectedSeries} = this.props.truckBrand;
		return brand.series.map(item => {
			let isActive = selectedSeries && selectedSeries.series_name == item.series_name,
				bindData = isActive ? null : item;
			return (
				<div key={item.series_name} className={"brand-series-item" + (isActive ? " active" : "")}>
					<div className="item-container clearfix" onClick={this.changeSelectedSeries.bind(this, bindData)}>
						<div className="item-name">{item.series_name ? item.series_name : ''}</div>
						<div className="item-arrow"></div>
					</div>
					<div className="item-model-list">
						{this.renderModelList(item)}
					</div>
				</div>
			)
		})
	}

	renderModelList = (series) => {
		let {selectedModel} = this.props.truckBrand;
		return series.models.map(item => {
			let isActive = selectedModel && selectedModel.model == item.model,
				bindData = isActive ? null : item;
			return (
				<div key={item.model} className={"model-item clearfix" + (isActive ? " active" : "")}>
					<div className="item-name">{item.model ? item.model : ''}</div>
					<div className="btn-checkbox" onClick={this.changeSelectedModel.bind(this, bindData)}></div>
				</div>
			)
		})
	}

	onOverlayClick = (e) => {
		let {showPop} = this.state;
		e.preventDefault();
		e.stopPropagation();
		if(showPop) {
			this.setState({
				showPop: false
			});
		}
	}

	onPopClick = (e) => {
		let {showPop} = this.state;
		e.preventDefault();
		e.stopPropagation();
		if(!showPop) {
			this.setState({
				showPop: true
			})
		}
	}

	onChangeSearchText = e => {
		let {truckBrandList} = this.props,
			{hotBrandList, wholeBrandList, searchText} = this.state;
		searchText = e.target.value;
		searchText = searchText ? searchText : '';
		if(truckBrandList && truckBrandList.hotBrands) {
			if(searchText.length > 0) {
				hotBrandList = truckBrandList.hotBrands.filter(item => {
					return item.brand.indexOf(searchText) > -1;
				});
			} else {
				hotBrandList = truckBrandList.hotBrands;
			}

		}
		if(truckBrandList && truckBrandList.truckModels) {
			if(searchText.length > 0) {
				wholeBrandList = truckBrandList.truckModels.filter(item => {
					return item.brand.indexOf(searchText) > - 1;
				});
			} else {
				wholeBrandList = truckBrandList.truckModels;
			}

		}
		this.setState({
			searchText,
			hotBrandList,
			wholeBrandList
		});
	}

	render() {
		let {truckBrandList, truckBrand} = this.props,
			{showPop, searchText, hotBrandList, wholeBrandList} = this.state;
		searchText = searchText != null ? searchText : '';
		return (
			<div className="page" id="truckBrandPage">
				<div className="search-zone">
					<input id="truckBrandSearchInput" type="text" className="search-input" value={searchText} onChange={this.onChangeSearchText}/>
					<div className="search-placeholder" style={{display: searchText.length > 0 ? 'none' : 'block'}}>
						<img className="search-icon" src="/images/search@2x.png"/>
						<div className="search-label">请输入车辆品牌</div>
					</div>
				</div>
				<div className="brand-zone clearfix">
					<div className="brand-detail-zone">
						<div className="hot-brand-zone">
							<div className="hot-brand-title">热门品牌</div>
							<div className="hot-brand-container clearfix">
								{this.renderHotBrand(hotBrandList)}
							</div>
						</div>
						<div className="brand-list-zone">
							{this.renderBrandList(wholeBrandList)}
						</div>
					</div>
					<div className="brand-initialing-list">
					</div>
				</div>
				<div className="overlay" onClick={this.onOverlayClick}
				     style={{display: truckBrand.selectedBrand && showPop ? 'block' : 'none'}}></div>
				<div className="popup-brand-series" onClick={this.onPopClick}
				     style={{display: truckBrand.selectedBrand && showPop ? 'block' : 'none'}}>
					<div className="brand">{truckBrand.selectedBrand ? truckBrand.selectedBrand.brand : ''}</div>
					<div className="brand-series">
						{truckBrand.selectedBrand ? this.renderSeriesList(truckBrand.selectedBrand) : ''}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let truckBrandList = state.reducers.util.toJS().truckBrandList,
		truckBrand = state.reducers.truckBrand.toJS();
	return {
		truckBrandList,
		truckBrand
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			thisAction: bindActionCreators(ThisAction, dispatch),
			utilAction: bindActionCreators(UtilAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TruckBrand)

