import React, {Component} from 'react';

class Map extends Component {

	constructor(props) {
		super(props);
	}

	currentPosition = null;

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		let _this = this;
		let map = new AMap.Map('amap', {
			redizeEnable: true,
			zoom: 11,
		});
		this.map = map;
		this.map.plugin('AMap.Geolocation', function () {
			_this.geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: true,        //显示定位按钮，默认：true
				buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			});
			_this.map.addControl(_this.geolocation);
			_this.geolocation.getCurrentPosition();
			AMap.event.addListener(_this.geolocation, 'complete', function(data) {
				console.log(data);
				_this.currentPosition = data.position;
				_this.city = data.addressComponent.city;
				_this.citycode = data.addressComponent.citycode;
				if(_this.placeSearch) {
					_this.placeSearch.setCity(_this.citycode);
				}
			});//返回定位信息
			AMap.event.addListener(_this.geolocation, 'error', function(data) {
				alert("定位失败，请手动输入地址进行查找");
			});      //返回定位出错信息
		});
		AMap.service('AMap.PlaceSearch',function(){//回调函数
			//实例化PlaceSearch
			_this.placeSearch= new AMap.PlaceSearch({
				pageSize: 30,
				pageIndex: 1,
				city: _this.citycode, //城市
				map: _this.map,
				panel: "nearbyList"
			});
			_this.search();
		})
	}

	search = text => {
		let _this = this;
		this.placeSearch.search(text, function(status, result) {
			console.log(result);
			_this.props.onChangeNearbyList && _this.props.onChangeNearbyList(result.poiList.pois);
		});
	}

	render() {
		return (
			<div id="amap">
			</div>
		)
	}
}

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			selectedAddress: null,
			nearbyList: [{
				name: "科技大厦"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "富金佳源误区"
			}, {
				name: "科技大厦"
			}]
		}
	}

	onChangeSearchText = e => {
		let _this = this,
			value = e.target.value;
		this.setState({
			searchText: value
		});
		setTimeout(function() {
			if(value == _this.state.searchText) {
				_this.refs.map.search(value);
			}
		}, 1500);
	}

	changeSelectedAddress = function(address) {
		this.setState({
			selectedAddress: address
		});
	}

	getNearbyViews = (nearbyList, selectedNearby) => {
		return nearbyList.map((nearby, index) => {
			let checkboxUrl = (selectedNearby && selectedNearby.name == nearby.name) ? '/images/duihao_active@2x.png' : '/images/duihao@2x.png';
			return (
				<table className="nearby-item" key={index}>
					<tbody>
						<tr>
							<td className="nearby-address">{nearby.name}</td>
							<td className="nearby-checkbox-container"><img className="nearby-checkbox" src={checkboxUrl} onClick={this.changeSelectedAddress.bind(this, nearby)}/></td>
						</tr>
					</tbody>
				</table>
			)
		})
	}

	onChangeNearbyList = nearbyList => {
		this.setState({
			nearbyList
		});
	}

	render() {
		let {searchText, nearbyList, selectedAddress} = this.state;
		return (
			<div className="position-search-container">
				<div className="search-zone">
					<input type="text" className="search-input" value={searchText} onChange={this.onChangeSearchText}/>
					<div className="search-placeholder" style={{display: searchText.length > 0 ? 'none' : 'block'}}>
						<img className="search-icon" src="/images/search@2x.png"/>
						<div className="search-label">查找地址</div>
					</div>
				</div>
				<Map ref="map" onChangeNearbyList={this.onChangeNearbyList}/>
				<div className="nearby-list-container">
					<div className="nearby-title">
						<img className="nearby-title-icon" src="/images/address@2x.png"/>
						<div className="nearby-title-text">附近地址</div>
					</div>
					<div id="nearbyList" className="nearby-list">
						{this.getNearbyViews(nearbyList, selectedAddress)}
					</div>
				</div>
			</div>
		)
	}

}

