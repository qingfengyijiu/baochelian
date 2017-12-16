import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let {left, center, right, children, className, ...other} = this.props;
		return (
			<div className={"list-item" + (className ? ' ' + className : '')} {...other}>
				{children}
			</div>
		)
	}
}