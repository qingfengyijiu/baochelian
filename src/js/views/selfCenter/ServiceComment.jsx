import React, {Component} from 'react';

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

	getStarScoreViews = (score) => {
		let arr = new Array(5);
		return arr.map((value, index) => {
			let active = index + 1 <= value,
				imgUrl = active ? '/images/star1@2x.png' : '/images/star_h@2x.png';
			return (
				<img src={imgUrl} className="score-star-item" key={index}/>
			)
		})
	}

	render() {
		let score = 4;
		return (
			<div className="service-comment">
				<div className="user-info">
					<div className="left">
						<img className="user-avatar"/>
					</div>
					<div className="right">
						<div className="user-name">范辉</div>
						<div className="user-score">
							<div className="score-title">综合评价：</div>
							{this.getStarScoreViews(score)}
							<div className="score-value">{score + ".0"}</div>
						</div>
					</div>
				</div>
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
