import React, {Component} from 'react';
import Picker from "./Picker.jsx";

/**
 * description: 支持单列或多列选择器
 * @property num 选择器列数，默认为1
 * @property options 选择器的option数据数组，如果为多列选择器，则为数据数组的数组[[option1, option2], [option1, optino2, option3]]；
 *      如果为单列，则为数据数组即可,例如[option1, option2]
 * @property defaultValue 默认选中值，该值为数组的选中index；如果多列选择器，则为选中index的数组[selectedIndex1, selectedIndex2]
 * @property title picker标题
 * @property confirm 确认按钮的回調函数, Function(value)，接收value数据，value为最终选中的index；如果为多列，则value为选中index的数组
 * @property cancel 取消按钮的回調函数, Function()
 */
export default class extends Component {

	constructor(props) {
		super(props);
		let value = [];
		props.num = props.num != null ? props.num : 1;
		if(props.defaultValue) {
			value = props.defaultValue;
			if(!(value instanceof Array)) {
				value = [value];
			}
		} else {
			for(let i = 0; i < props.num; i++) {
				value.push(0);
			}
		}
		this.state = {
			show: false,
			scrollStart: 0,
			value: value
		}
	}

	onChange = function(index, value) {
		let stateValue = this.state.value;
		stateValue[index] = value;
		this.setState({
			value: stateValue
		});
	}

	show = () => {
		this.setState({
			show: true
		});
	}

	hide = () => {
		this.setState({
			show: false
		})
	}

	confirm = () => {
		let {value} = this.state;
		if(value.length === 1) {
			value = value[0];
		}
		this.hide();
		this.props.confirm && this.props.confirm(value);
	}

	cancel = () => {
		this.hide();
		this.props.cancel && this.props.cancel();
	}

	render() {
		let {options, title, num} = this.props,
			{value, show} = this.state,
			pickers = [];
		//如果是单列picker，统一转换成多列picker数组格式
		if(num == 1) {
			options = [options];
		}
		for(let i = 0; i < options.length; i++) {
			pickers.push({
				options: options[i],
				value: value[i]
			})
		}
		return (
			<div className="picker-modal-layer" style={{display: show ? 'block' : 'none'}}>
				<div className="picker-container">
					<div className="picker-button-zone">
						<a className="picker-btn btn-cancel" onClick={this.hide}>取消</a>
						<span>{title}</span>
						<a className="picker-btn btn-confirm" onClick={this.confirm}>完成</a>
					</div>
					<div className={"picker-select-zone multi-select-" + pickers.length}>
						<div className="picker-selected-zone"></div>
						{
							pickers.map((picker, index) => {
								return (
									<Picker picker={picker} selected={picker.value} onChange={this.onChange.bind(this, index)}/>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}