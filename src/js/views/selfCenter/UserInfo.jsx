import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props)
	}

	getStarScoreViews = (score) => {
		let arr = [1,1,1,1,1];
		return arr.map((value, index) => {
			console.log(value);
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
		)
	}

}