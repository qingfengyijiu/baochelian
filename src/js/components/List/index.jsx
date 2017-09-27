import React, {Component} from 'react';
import _Item from './Item.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="list-container">
				{this.props.children}
			</div>
		)
	}

}

export const Item = _Item;