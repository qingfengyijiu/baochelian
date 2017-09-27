import React, {Component} from 'react';

export default class  extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollStart: 0
		}
	}

	onSelectTouchMove = e => {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		let {picker, onChange} = this.props,
			currentY = e.touches[0].pageY,
			offset = currentY - this.state.scrollStart,
			offsetAbs = Math.abs(offset);
		if(picker.value == 0 && offset > 0) {
			return;
		}
		if(picker.value == picker.options.length - 1 && offset < 0) {
			return;
		}
		this.refs.picker.style.transform = "translateY(" + offset + "px)";
		if(offsetAbs >= 10) {
			if(offset > 0) {
				onChange(picker.value - 1);
			} else {
				onChange(picker.value + 1);
			}
			this.setState({
				scrollStart: currentY
			});
			this.refs.picker.style.transform = "translateY(" + 0 + ")";
		}
	}

	onSelectTouchStart = e => {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			scrollStart: e.touches[0].pageY
		});
	}

	getOptionValue(picker, offset) {
		let position = picker.value + offset;
		return position >= 0 && position < picker.options.length ? picker.options[position] : '';
	}

	render() {
		let {picker} = this.props;
		return (
			<div className="select-container">
				<div ref="picker" className="picker-item">
					<div className="option-item option-selected-offset-4">{this.getOptionValue(picker, -4)}</div>
					<div className="option-item option-selected-offset-3">{this.getOptionValue(picker, -3)}</div>
					<div className="option-item option-selected-offset-2">{this.getOptionValue(picker, -2)}</div>
					<div className="option-item option-selected-offset-1">{this.getOptionValue(picker, -1)}</div>
					<div className="option-item option-selected">{this.getOptionValue(picker, 0)}</div>
					<div className="option-item option-selected-offset-1">{this.getOptionValue(picker, 1)}</div>
					<div className="option-item option-selected-offset-2">{this.getOptionValue(picker, 2)}</div>
					<div className="option-item option-selected-offset-3">{this.getOptionValue(picker, 3)}</div>
					<div className="option-item option-selected-offset-4">{this.getOptionValue(picker, 4)}</div>
				</div>
				<div className="select-touch-layer" onTouchMove={this.onSelectTouchMove} onTouchStart={this.onSelectTouchStart}/>
			</div>
		)
	}
}