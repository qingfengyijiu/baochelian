import React, {Component} from 'react'
import ws from "../../lib/ws";

export default class extends Component {

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
						url: "/api/coupon/custom"
					}).then(response => {
						if(response.code === 0) {
							_this.setState({
								showCouponDialog: true,
								parPrice: response.data.parPrice
							})
						} else {
							alert(response.message)
						}
					})
				},
				fail: function() {},
				complete: function() {},
				cancel: function() {},
				trigger: function() {}
			})
			wx.onMenuShareAppMessage({
				title: '保车连老板疯了，iPhone X免费送',
				desc: '保车连老板疯了，iPhone X免费送',
				link: location.origin + '/draw/introduction',
				imgUrl: location.origin + '/images/draw/head.png',
				success: function() {
					ws.post({
						url: "/api/coupon/custom"
					}).then(response => {
						if(response.code === 0) {
							_this.setState({
								showCouponDialog: true,
								parPrice: response.data.parPrice
							})
						} else {
							alert(response.message)
						}
					})
				},
				fail: function() {},
				complete: function() {},
				cancel: function() {},
				trigger: function() {}
			})
		})

	}

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