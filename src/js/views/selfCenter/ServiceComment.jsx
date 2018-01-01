import React, {Component} from 'react';
import UserInfo from './UserInfo.jsx';
import ws from '../../lib/ws.js';
import toast from '../../components/Toast';
import history from '../history.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			technicianName: null,
			technicianAvatarURL: null,
			technicianScore: null,
			scoring: 0,
			comment: ''
		}
	}

	componentDidMount() {
		let orderId = this.props.params.id;
		ws.get({
			url: '/api/order/' + orderId
		}).then(response => {
			if(response.code === 0) {
				this.setState({
					technicianName: response.data.technicianName,
					technicianAvatarURL: response.data.technicianAvatarURL,
					technicianScore: response.data.technicianScore
				})
			} else {
				toast.show(response.message);
			}
		})
	}

	getStarView = (index, value) => {
		let currentScore = index + 1,
			active = value != null && (currentScore <= value),
			imgUrl = active ? '/images/star_d@2x.png' : '/images/star_h@2x.png';
		return (
			<img src={imgUrl} className="star-item" onClick={this.onChangeScore.bind(this, currentScore)}/>
		)
	}

	onChangeScore = (scoring, e) => {
		this.setState({
			scoring: scoring
		});
	}

	onChangeComment = e => {
		this.setState({
			comment: e.target.value
		});
	}

	onSumbit = e => {
		let orderId = this.props.params.id,
			{scoring, comment} = this.state;
		ws.post({
			url: '/api/order/' + orderId + '/scoring',
			data: {
				scoring: scoring,
				comment: comment
			}
		}).then(response => {
			if(response.code === 0) {
				toast.show("评价成功");
				history.push('/self/order');
			} else {
				toast.show(response.message);
			}
		})
	}

	render() {
		let {technicianAvatarURL, technicianName, technicianScore, scoring, comment} = this.state;
		return (
			<div className="service-comment">
				<UserInfo avatarUrl={technicianAvatarURL} name={technicianName} score={technicianScore}/>
				<div className="comment-title">请对技师的本次服务进行评价</div>
				<div className="comment-zone">
					<div className="star-operation">
						<div className="operation-title">打星</div>
						<div className="star-list">
							{this.getStarView(0, scoring)}
							{this.getStarView(1, scoring)}
							{this.getStarView(2, scoring)}
							{this.getStarView(3, scoring)}
							{this.getStarView(4, scoring)}
						</div>
					</div>
					<textarea placeholder="服务评价" className="comment-text" value={comment != null ? comment : ''} onChange={this.onChangeComment}/>
				</div>
				<div className="btn-zone">
					<button className="btn block" onClick={this.onSumbit} disabled={!(scoring != null && scoring > 0)}>提交评价</button>
				</div>
			</div>
		)
	}
}
