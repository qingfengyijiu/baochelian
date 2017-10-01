import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isRunning: false,
			count: 60,
			showText: props.startText ? props.startText : "60"
		}
		this.interval = null;
	}

	componentDidMount() {
		let {auto} = this.props;
		if(auto) {
			this.run();
		}
	}

	start = () => {
		let {isRunning} = this.props;
		if(isRunning) return;
		this.props.onStart && this.props.onStart();
		this.run();
	}

	stop = () => {
		let {endText} = this.props;
		if(this.interval) {
			clearInterval(this.interval);
		}
		this.setState({
			count: 60,
			showText: endText ? endText : "60"
		})
	}

	run() {
		let {endText} = this.props;
		this.setState({isRunning: true});
		this.interval = setInterval(() => {
			let {count} = this.state;
			if(count > 0) {
				this.setState({
					count: count - 1,
					showText: count - 1
				});
			} else {
				this.stop();
			}

		}, 1000);
	}


	render() {
		let {startText, endText, auto, ...other} = this.props,
			{showText} = this.state;
		return (
			<span {...other}>{showText}</span>
		)
	}

}