import React, {Component} from 'react';
import List, {Item} from '../../components/List/index.js';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="self-car">
				<List>
					<Item right={<span>奥迪</span>}>
						<div className="label left">
							<span className="label-text">车辆品牌</span>
						</div>
					</Item>
					<Item right={<span>A4</span>}>
						<div className="label left">
							<span className="label-text">车辆型号</span>
						</div>
					</Item>
				</List>
				<List>
					<Item right={<span>12345</span>}>
						<div className="label left">
							<span className="label-text">车辆牌号</span>
						</div>
					</Item>
					<Item right={<span>1234567</span>}>
						<div className="label left">
							<span className="label-text">车架号</span>
						</div>
					</Item>
				</List>
			</div>
		)
	}
}