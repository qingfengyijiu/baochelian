import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let {left, center, right, children, className, ...other} = this.props;
		return (
			<table className={"list-item" + (className ? ' ' + className : '')} {...other}>
				<tbody>
				<tr>
					<td className="item-part left">{left ? left : (children ? children : <div/>)}</td>
					<td className="item-part center">{center ? center : ''}</td>
					<td className="item-part right">{right ? right : ''}</td>
				</tr>
				</tbody>
			</table>
		)
	}
}