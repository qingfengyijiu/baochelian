import React, {Component} from 'react'

export default class extends Component {
	render() {
		return (
			<div className="page-introduction">
				<div className="introduction-head">
					<img className="head-img" src="/images/draw/head.png"/>
					<img className="head-qrcode" src="/images/draw/erweima.png" />
				</div>
				<div className="introduction-prize">
					<img className="prize-title" src="/images/draw/title_prize.png" />
					<div className="prize-list">
						<img className="prize-img prize-01" src="/images/draw/prize_01.png" />
						<img className="prize-img prize-02" src="/images/draw/prize_02.png" />
						<img className="prize-img prize-03" src="/images/draw/prize_03.png"/>
					</div>
					<img className="btn-share" src="/images/draw/text_02.png"/>
					<img className="coupon-img" src="/images/draw/coupon.png" />
					<img className="draw-rule" src="/images/draw/rule.png" />
				</div>
			</div>
		)
	}
}