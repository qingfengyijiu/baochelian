import React, {Component} from 'react';

class Map extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let map = new AMap.Map('amap', {
			redizeEnable: true,
			zoom: 11,
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
	}

	render() {
		return (
			<div className="page">
				<div className="search-zone">
				</div>
				<Map/>
				<div className="map-list">
					<div className="list-title">
					</div>
				</div>
			</div>
		)
	}

}

