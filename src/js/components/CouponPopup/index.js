import React, {Component, Fragment} from 'react'

export default class extends Component {

	render() {
		return (
			<Fragment>
				<div className="shade-layer"></div>
				<div className="popup-container">
					<div className="popup-body">
						<div className="btn-share"></div>
					</div>
					<div className="popup-close-btn"></div>
				</div>
			</Fragment>
		)
	}
}