import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
	}

	getListViews = (list) => {
		return list.map((item, index) => {
			return (
				<div className="carneed-product-container" key={index}>
					<img src={item.img} className="product-img"/>
					<div className="product-details">
						<div className="detail-title">{item.title}</div>
						<div className="detail-price">{"¥" + item.price}</div>
					</div>
				</div>
			)
		})
	}

	render() {
		let list = [{
			img: "",
			title: "ATM汽车发动机四季通用型防冻液",
			price: 100
		}, {
			img: "",
			title: "ATM汽车发动机四季通用型防冻液",
			price: 100
		}, {
			img: "",
			title: "ATM汽车发动机四季通用型防冻液",
			price: 100
		}];
		return (
			<div className="page">
				{this.getListViews(list)}
			</div>
		)
	}

}