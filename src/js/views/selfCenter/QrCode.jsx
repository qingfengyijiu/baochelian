import React, {Component} from 'react';
import ws from '../../lib/ws';
import toast from '../../components/Toast';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state ={
			qrcode: null
		}
	}

	componentDidMount() {
		document.title = "我的推广";
		ws.get({
			url: '/api/self/qrcode'
		}).then(response => {
			if(response.code === 0) {
				this.setState({
					qrcode: response.data.qr_url
				});
			} else {
				toast.show(response.message);
			}
		})
	}

	render() {
		let {qrcode} = this.state;
		return (
			<div className="page-qrcode">
				<div className="popularize-text-container">
					<img className="popularize-text" src="/images/popularize-text@2x.png"/>
				</div>
				<div className="popularize-content-container">
					<img className="popularize-qrcode" src={qrcode != null ? qrcode : ''}/>
					<div className="popularize-content-detail">邀请司机扫码加入，赚取更多收益。</div>
					<img className="popularize-logo" src="/images/popularize-logo@2x.png"/>
				</div>
			</div>
		)
	}
}