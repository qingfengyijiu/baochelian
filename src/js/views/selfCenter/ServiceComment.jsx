import React, {Component} from 'react';
import UserInfo from './UserInfo.jsx';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	getStarView = (index, value) => {
		let active = index + 1 <= value,
			imgUrl = active ? '/images/star_d@2x.png' : '/images/star_h@2x.png';
		return (
			<img src={imgUrl} className="star-item"/>
		)
	}

	render() {
		let score = 4;
		return (
			<div className="service-comment">
				<UserInfo/>
				<div className="comment-title">请对技师的本次服务进行评价</div>
				<div className="comment-zone">
					<div className="star-operation">
						<div className="operation-title">打星</div>
						<div className="star-list">
							{this.getStarView(0, 4)}
							{this.getStarView(1, 4)}
							{this.getStarView(2, 4)}
							{this.getStarView(3, 4)}
							{this.getStarView(4, 4)}
						</div>
					</div>
					<textarea placeholder="服务评价" className="comment-text"/>
				</div>
				<div className="btn-zone">
					<button className="btn block">提交评价</button>
				</div>
			</div>
		)
	}
}
