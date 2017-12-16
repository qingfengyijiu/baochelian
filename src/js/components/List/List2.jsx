import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let {className, children, ...other} = this.props;
		return (
			<div className={"list" + (className ? ' ' + className : '')} {...other}>
				{children}
			</div>
		)
	}
}