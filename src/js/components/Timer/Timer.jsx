import React, { Component } from 'react';

class TimerTask extends Component {
	constructor(props) {
		super(props);
		let { times, startStr, ingStr, endStr, clickhandle, endHandle } = this.props
		this.state = {
			isBack: false,
			times: times || 30,
			_times: times || 30,
			startStr: startStr || '点击开始倒计时',
			ingStr: ingStr || '',
			endStr: endStr || '重现开始倒计时',
			isFirst: true,
			clickhandle: clickhandle,
			stop: false,
			endHandle: endHandle,
			_t: null
		}
	}

	componentDidMount() {

		if (this.props.isAuto) {
			this.clickEvent();
		}
	}

	clickEvent = () => {
		let { times, isBack, _times, clickhandle, endHandle, isRunning, } = this.state;

		if (isBack) {
			return false;
		}

		let _t = setInterval(() => {
			if (times <= 0) {
				clearInterval(_t);
				this.setState({
					isBack: false,
					times: _times
				})
				endHandle && endHandle();
				return false
			}
			this.setState({
				times: times
			})
			times--
		}, 1000)

		clickhandle && clickhandle();
		this.setState({
			_t: _t,
			isBack: true
		})
	}


	componentWillUnmount() {
		clearInterval(this.state._t)
	}

	render() {
		let { isBack, times, startStr, endStr, isFirst, ingStr, stop } = this.state;

		return (
			<span className={'timer ' + (isBack ? 'isBack' : '')} onClick={() => {
				this.clickEvent()
			}}>
                {
	                isBack ? times + ingStr : isFirst ? startStr : endStr
                }
            </span>
		)
	}

}


export default TimerTask;

