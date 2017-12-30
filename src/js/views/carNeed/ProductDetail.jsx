import React, {Component} from 'react';
import List, {Item} from '../../components/List';


export default class extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = "车需";
	}

	render() {
		let item = {
			img: "",
			title: "ATM汽车发动机四季通用型防冻液",
			price: 100
		};
		return (
			<div className="product-detail">
				<div className="carneed-product-container">
					<img src={item.img} className="product-img"/>
					<div className="product-details">
						<div className="detail-title">{item.title}</div>
						<div className="detail-price">{"¥" + item.price}</div>
					</div>
				</div>
				<List>
					<Item><span>选择容量</span></Item>
					<Item><span>购买数量</span></Item>
				</List>
				<List>
					<Item right={<img className="address" src="images/rescue/address@2x.png"/>}>
						<input type="text" placeholder="您的位置"/>
					</Item>
					<Item right={<img className="jiaohao" src="images/jiaohao@2x.png"/>}>
						<input disabled value="立即救援"/>
					</Item>
				</List>
				<List>
					<Item>
						<input type="text" className="full-width" placeholder="用户名"/>
					</Item>
					<Item>
						<input type="text" placeholder="手机号"/>
					</Item>
					<Item>
						<input type="text" placeholder="验证码"/>
					</Item>
				</List>
				<div className="tips">温馨提示：特卖商品，将由当地保哥派送至您手中。</div>
				<div className="confirm-zone">
					<div className="price-zone">
						<span>总计</span>
						<span className="price-number">100</span>
						<span className="price-unit">元</span>
					</div>
					<div className="confirm-btn">立即付款</div>
				</div>
			</div>
		)
	}
}