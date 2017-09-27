import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let {center, right, children, containerClass} = this.props;
		return (
			<div className={"list-item" + (containerClass ? " " + containerClass : "")}>
				{children ? children : ''}
				{center ? <div className="item center">{center}</div> : ''}
				{right ? <div className="item right">{right}</div> : ''}
			</div>
		)
	}

}