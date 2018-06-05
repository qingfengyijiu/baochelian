import React, {Component} from 'react'
import WinningTable from '../../components/WinningTable'
import ws from "../../lib/ws"

export default class extends Component {

	constructor(props) {
		super(props)
		this.state = {
			firstPrize: [],
			luckyPrize: [],
			superPrize: []
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		ws.get({
			url: "/api/draw/winninglist"
		}).then(response => {
			let firstPrizeItem = response.data.find(item => item.drawType.key === 2)
			let luckyPrizeItem = response.data.find(item => item.drawType.key === 1)
			let superPrizeItem = response.data.find(item => item.drawType.key === 3)
			this.setState({
				firstPrize: firstPrizeItem && firstPrizeItem.luckDogs,
				luckyPrize: luckyPrizeItem && luckyPrizeItem.luckDogs,
				superPrize: superPrizeItem && superPrizeItem.luckDogs
			})
		})
	}

	render() {
		const {firstPrize, luckyPrize} = this.state
		return (
			<div className="page-winninglist">
				<div className="introduction-head">
					<img className="head-img" src="/images/draw/winninglist/rankingList_head.png"/>
					<img className="head-title title-super-prize" src="/images/draw/winninglist/rankingList_title01.png"/>
					<div className="tip-super-prize">2018年6月24揭晓</div>
					<img className="head-title title-first-prize" src="/images/draw/winninglist/rankingList_title02.png"/>
					<WinningTable data={firstPrize || []}/>
					<img className="head-title title-lucky-prize" src="/images/draw/winninglist/rankingList_title03.png"/>
					<WinningTable data={luckyPrize || []}/>
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