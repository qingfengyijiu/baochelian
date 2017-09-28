import React, {Component} from 'react';
import List, {Item} from "../../components/List";

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="self-info">
				<List>
					<Item right={<img src="/images/address@2x.png" className="user-avatar"/>}>
						头像
					</Item>
					<Item right="范辉">昵称</Item>
				</List>
			</div>
		)
	}

}