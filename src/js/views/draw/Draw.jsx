import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import ws from "../../lib/ws"
import {connect} from 'react-redux'


export default class Draw extends Component {

	constructor(props) {
		super(props)
		this.state = {
			phone: null,
			showShareDialog: false,
			showCouponDialog: false,
			parPrice: null
		}
	}

	componentDidMount() {
		const timestamp = new Date().getTime().toString().slice(0, 10)
		const nonceStr = "testbaochelian"
		const appid = "wx3e98278c327dfef2"
		const debug = false
		const jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage"]
		const _this = this
		ws.get({
			url: "/api/wechat/jsapi_signature",
			data: {
				timestamp: timestamp,
				nonceStr: nonceStr,
				url: window.location.href.replace(/#.*/g, "")
			}
		}).then(response => {
			wx && wx.config({
				debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appid, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: response.data.signature,// 必填，签名
				jsApiList: jsApiList // 必填，需要使用的JS接口列表
			});
		})
		wx && wx.ready(function() {
			wx.onMenuShareTimeline({
				title: '保车连老板疯了，iPhone X免费送',
				link: location.origin + '/draw/introduction',
				imgUrl: location.origin + '/images/draw/head.png',
				success: function() {
					ws.post({
						url: "/api/coupons/custom"
					}).then(response => {
						if(response.code === 0) {
							_this.setState({
								showShareDialog: true,
								parPrice: response.data.parPrice
							})
						} else {
							alert(response.message)
						}
					})
				}
			})
			wx.onMenuShareAppMessage({
				title: '保车连老板疯了，iPhone X免费送',
				link: location.origin + '/draw/introduction',
				imgUrl: location.origin + '/images/draw/head.png',
				success: function() {
					ws.post({
						url: "/api/coupons/custom"
					}).then(response => {
						if(response.code === 0) {
							_this.setState({
								showShareDialog: true,
								parPrice: response.data.parPrice
							})
						} else {
							alert(response.message)
						}
					})
				}
			})
		})

	}

	onChangePhone = e => {
		let value = e.target.value
		this.setState({
			phone: value
		})
	}

	gotoWinningList = () => {
		browserHistory.push("/draw/winninglist")
	}

	onCloseShareDialog = e => {
		this.setState({
			showShareDialog: false
		})
	}

	onCloseCouponDialog = e => {
		this.setState({
			showCouponDialog: false
		})
	}

	onClickDraw = e => {
		const _this = this
		let phone = this.state.phone
		if(!/\d{11}/.test(phone)) {
			alert("请输入正确的手机号")
			return
		}
		ws.post({
			url: "/api/self/draw",
			data: {
				phone: phone
			}
		}).then(response => {
			_this.setState({
				showShareDialog: true
			})
		})
	}

	render() {
		const {phone, showShareDialog, showCouponDialog, parPrice} = this.state
		let couponUrl = ""
		if(parPrice) {
			couponUrl = "/images/draw/popup/coupon_" + parPrice + ".png"
		}
		return (
			<div className="page-draw">
				<div className="introduction-head">
					<img className="head-img" src="/images/draw/head.png"/>
					<img className="head-tip" src="/images/draw/activity/title_prizeDrew.png"/>
					<input className="head-input"
					       type="text" value={phone || ""} onChange={this.onChangePhone}/>
					<img className="head-btn" src="/images/draw/activity/btn.png" onClick={this.onClickDraw}/>
					<div className="head-note">*本次活动手机号作为唯一中奖凭证</div>
					<div className="head-link" onClick={this.gotoWinningList}>{"中奖名单>>"}</div>
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
					<img className="draw-rule" src="/images/draw/activity/rule.png" />
					<img className="draw-bottom" src="/images/draw/activity/bottom.png" />
				</div>
				<div className="shade-layer" style={{display: showShareDialog ? "block" : "none"}}></div>
				<div className="popup" style={{display: showShareDialog ? "block" : "none"}}>
					<div className="popup-body">
						<div className="popup-btn"></div>
					</div>
					<div className="popup-close-btn" onClick={this.onCloseShareDialog}></div>
				</div>
				<div className="shade-layer" style={{display: showCouponDialog ? "block" : "none"}}></div>
				<div className="popup popup-coupon" style={{display: showCouponDialog ? "block" : "none"}}>
					<div className="popup-body">
						<img className="coupon-instance" src={couponUrl}/>
						<div className="popup-btn" onClick={this.onCloseCouponDialog}></div>
					</div>
					<div className="popup-close-btn" onClick={this.onCloseCouponDialog}></div>
				</div>
			</div>
		)
	}
}