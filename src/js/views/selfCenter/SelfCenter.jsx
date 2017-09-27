import React, {Component} from 'react';
import List, {Item} from "../../components/List/index.jsx";

export default class extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="self-center">
				<List>
					<Item right={<img className="jiaohao" src="/images/jiaohao@2x.png"/>}>
						<div className="label">
							<img className="label-icon" src="/images/icon_geren@2x.png"/>
							<div className="label-text">个人信息</div>
						</div>

					</Item>
					<Item right={<img className="jiaohao" src="/images/jiaohao@2x.png"/>}>
						<div className="label">
							<img className="label-icon" src="/images/icon_che@2x.png"/>
							<div className="label-text">我的车辆</div>
						</div>
					</Item>
				</List>
				<List>
					<Item right={<img className="jiaohao" src="/images/jiaohao@2x.png"/>}>
						<div className="label">
							<img className="label-icon" src="/images/icon_dingdan@2x.png"/>
							<div className="label-text">我的订单</div>
						</div>
					</Item>
				</List>
				<List>
					<Item right={<img className="jiaohao" src="/images/jiaohao@2x.png"/>}>
						<div className="label">
							<img className="label-icon" src="/images/icon_zhanghu@2x.png"/>
							<div className="label-text">我的账号</div>
						</div>

					</Item>
				</List>
			</div>
		);
	}
}