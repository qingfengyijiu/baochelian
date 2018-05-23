import React, {Component} from 'react'
import WinningTable from '../../components/WinningTable'

export default class extends Component {

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render() {
		return (
			<div className="page-winninglist">
				<div className="introduction-head">
					<img className="head-img" src="/images/draw/winninglist/rankingList_head.png"/>
					<img className="head-title title-super-prize" src="/images/draw/winninglist/rankingList_title01.png"/>
					<div className="tip-super-prize">2018年6月20揭晓</div>
					<img className="head-title title-first-prize" src="/images/draw/winninglist/rankingList_title02.png"/>
					<WinningTable/>
					<img className="head-title title-lucky-prize" src="/images/draw/winninglist/rankingList_title03.png"/>
					<WinningTable/>
					<div className="head-tip">
						<div>温馨提醒：中奖的用户，客服会在24小时内联系您领取奖品～</div>
						<div>超级大奖奖品是iphone X；一等奖奖品是小米6x手机；幸运用户奖品是10000mAhx新小米移动电源。</div>
					</div>
				</div>
				<div className="introduction-prize">
					<img className="prize-title" src="/images/draw/title_prize.png" />
					<div className="prize-list">
						<img className="prize-img prize-01" src="/images/draw/prize_01.png" />
						<img className="prize-img prize-02" src="/images/draw/prize_02.png" />
						<img className="prize-img prize-03" src="/images/draw/prize_03.png"/>
					</div>
				</div>
			</div>
		)
	}
}