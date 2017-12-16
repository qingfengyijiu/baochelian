import React, {Component} from 'react';
import List, {Item} from "../../components/List";
import ws from '../../lib/ws.js';

export default class extends Component {

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
		let {avatarUrl, nickname} = this.state;
		avatarUrl = avatarUrl ? avatarUrl : "/images/address@2x.png";
		nickname = nickname ? nickname : "未知";
		return (
			<div className="self-info">
				<List>
					<Item className="touxiang">
						<div className="label-text ft">头像</div>
						<img src={avatarUrl} className="touxiang-img user-avatar fr"/>
					</Item>
					<Item>
						<div className="label-text ft">昵称</div>
						<div className="text fr">{nickname != null ? nickname : ''}</div>
					</Item>
				</List>
			</div>
		)
	}

}