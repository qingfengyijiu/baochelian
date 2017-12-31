import React, {Component} from 'react';
import List, {Item} from "../../components/List";
import ws from '../../lib/ws.js';

class SelfInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			avatarUrl: "",
			nickname: ""
		}
	}

	componentDidMount() {
		let _this = this;
		ws.get({
			url: '/api/self/info'
		}).then(response => {
			_this.setState({
				nickname: response.nickname,
				avatarUrl: response.avatarURL
			});
		})
	}

	render() {
		let {avatarUrl, name} = this.props.selfInfo;
		return (
			<div className="self-info">
				<List>
					<Item className="touxiang">
						<div className="label-text ft">头像</div>
						<img src={avatarUrl != null ? avatarUrl : '/images/default_avatar@2x.png'} className="touxiang-img user-avatar fr"/>
					</Item>
					<Item>
						<div className="label-text ft">昵称</div>
						<div className="text fr">{name != null ? name : '***'}</div>
					</Item>
				</List>
			</div>
		)
	}

}

function mapStateToProps(state) {
	let selfInfo = state.reducers.util.toJS().selfInfo;
	return {
		selfInfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actinos: {
			truckBrandAction: bindActionCreators(TruckBrandAction, dispatch)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelfInfo)
