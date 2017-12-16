import React, {Component} from 'react';
import UserInfo from './UserInfo.jsx';
import ws from '../../lib/ws.js';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
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

			} else {
				//alert(response.message);
			}
		})
	}

	getStarView = (index, value) => {
		let currentScore = index + 1,
			active = value && (currentScore <= value),
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
			console.log(response);
		})
	}

	render() {
		let {scoring, comment} = this.state;
		return (
			<div className="service-comment">
				<UserInfo/>
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
					<button className="btn block" onClick={this.onSumbit}>提交评价</button>
				</div>
			</div>
		)
	}
}
