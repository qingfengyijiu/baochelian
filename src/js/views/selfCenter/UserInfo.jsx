import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props)
	}

	getStarScoreViews = (score) => {
		let arr = [1, 2, 3, 4, 5];
		return arr.map((value, index) => {
			let active = value <= score,
				imgUrl = active ? '/images/star1@2x.png' : '/images/star_h@2x.png';
			return (
				<img src={imgUrl} className="score-star-item" key={index}/>
			)
		})
	}

	formatScore(score) {
		score = score != null ? score : 0;
		return score.toFixed(1);
	}

	render() {
		let {avatarUrl, name, score} = this.props;
		return (
			<div className="user-info">
				<div className="left">
					<img className="user-avatar" src={avatarUrl != null ? avatarUrl : '/images/default_avatar.png'} />
				</div>
				<div className="right">
					<div className="user-name">{name != null ? name : '技师'}</div>
					<div className="user-score">
						<div className="score-title">综合评价：</div>
						{this.getStarScoreViews(score)}
						<div className="score-value">{this.formatScore(score)}</div>
					</div>
				</div>
			</div>
		)
	}

}