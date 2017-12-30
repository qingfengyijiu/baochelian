import React, {Component} from 'react';
import ws from '../../lib/ws';
import InfiniteScroller from 'react-infinite-scroller';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			spuList: [],
			hasMore: true
		}
	}

	componentDidMount() {
		document.title = "车需";
	}

	loadMore = (page) => {
		let {spuList} = this.state;
		ws.get({
			url: '/api/spu',
			data: {
				page: page
			}
		}).then(response => {
			spuList = spuList.concat(response.data.spus);
			if(response.code === 0) {
				let hasMore = ((response.pagination.pageNo - 1) * response.pagination.pageSize + response.data.spus.length) < response.pagination.total;
				this.setState({
					spuList: spuList,
					hasMore: hasMore
				});
			} else {
				this.setState({
					hasMore: false
				})
			}
		})
	}

	gotoDetial(spuId) {
		history.push('/carneed/' + spuId);
	}

	getListViews = (list) => {
		return list.map((item, index) => {
			return (
				<div className="carneed-product-container" key={index}>
					<img src={item.thumbnail} className="product-img"/>
					<div className="product-details">
						<div className="detail-title">{item.name}</div>
					</div>
				</div>
			)
		})
	}

	render() {
		let {spuList} = this.state;
		return (
			<div className="page carneed">
				<div className="spu-list">
					<InfiniteScroller className="game-container"
					                  pageStart={0}
					                  loadMore={this.loadMore}
					                  useWindow={true}
					                  hasMore={this.state.hasMore}>
						{this.getListViews(spuList)}
					</InfiniteScroller>
				</div>
			</div>
		)
	}

}