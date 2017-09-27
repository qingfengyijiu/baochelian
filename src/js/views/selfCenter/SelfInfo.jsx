import React, {Component} from 'react';
import List, {Item} from "../../components/List/index.jsx";

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="self-info">
				<List>
					<Item containerClass="touxiang" right={<img src="" className="touxiang-img"/>}>
						<div className="label left">
							<div className="label-text">头像</div>
						</div>
					</Item>
					<Item right={<span>范辉</span>}>
						<div className="label left">
							<div className="label-text">昵称</div>
						</div>
					</Item>
				</List>
			</div>
		)
	}

}