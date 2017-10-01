import React, {Component} from 'react';
import MultiPicker from '../MultiPicker/index.jsx';
import moment from 'moment';

export default class OrderTimePicker extends Component {

	static getDays(startDay, count) {
		let days = [];
		startDay = startDay ? startDay : moment();
		count = count ? count : 30;
		for(let i = 0; i < count; i++) {
			days.push(startDay.format("YYYY-MM-DD"));
			startDay.add(1, "days");
		}
		return days;
	}

	static getDefaultValue() {
		let now = new Date();
		let hour = now.getHours();
		let hourIndex = hour - 1;
		let minute = now.getMinutes();
		minute = (minute + 5 < 60) ? (minute + 5) : minute;
		let minuteIndex = Math.round(minute / 5) - 1;
		return [0, hourIndex, minuteIndex];
	}

	static FULL_HOURS = ["00时", "01时", "02时", "03时", "04时", "05时", "06时", "07时", "08时", "09时", "10时", "11时", "12时",
		"13时", "14时", "15时", "16时", "17时", "18时", "19时", "20时", "21时", "22时", "23时"];

	static FULL_MINUTES = ["00分", "05分", "10分", "15分", "20分", "25分", "30分", "35分", "40分", "45分", "50分", "55分"];

	constructor(props) {
		super(props);
		this.state = {
			days: OrderTimePicker.getDays(),
			hours: OrderTimePicker.FULL_HOURS,
			minutes: OrderTimePicker.FULL_MINUTES,
			defaultValue: OrderTimePicker.getDefaultValue()
		}
	}

	confirmServiceTime = (value) => {
		console.log(value);
	}

	show = () => {
		this.refs.picker.show();
	}

	onChange = (value, index) => {
		let newDefaultValue;
		if(index == 0) {
			if(value === 0) {
				newDefaultValue = OrderTimePicker.getDefaultValue();
			} else {
				newDefaultValue = [value, 0, 0];
			}
		}
		this.setState({
			defaultValue: newDefaultValue
		});
	}

	confirm = (value) => {
		let {days, hours, minutes} = this.state,
			result =  days[value[0]] + " " + hours[value[1]].slice(0, 2) + ":" + minutes[value[2]].slice(0, 2);
		this.props.confirm && this.props.confirm(result);
	}

	render() {
		let {confirm, ...other} = this.props,
			{days, hours, minutes, defaultValue} = this.state;
		return (
			<MultiPicker ref="picker" num={3} onChange={this.onChange} defaultValue={defaultValue} options={[days, hours, minutes]} confirm={this.confirm} {...other}/>
		)
	}

}