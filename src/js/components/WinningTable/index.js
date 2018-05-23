import React, {Component} from 'react'

export default class extends Component {

	renderItems = (data) => {
		data = data || []
		return data.map(item => {
			return (
				<tr>
					<td>{item.wxname || ""}</td>
					<td>{item.phone || ""}</td>
				</tr>
			)
		})
	}

	render() {
		const {data} = this.props
		return (
			<table className="winning-table">
				<thead>
					<tr>
						<th>微信名</th>
						<th>手机号</th>
					</tr>
				</thead>
				<tbody>
				{this.renderItems(data)}
				</tbody>
			</table>
		)
	}
}