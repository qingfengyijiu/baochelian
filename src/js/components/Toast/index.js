import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const cn = (str, obj = {}) => {
	let arr = Object.keys(obj);
	arr = arr.filter((v) => {
		return obj[v]
	})
	return str + ' ' + arr.join(' ')
};
class Toast {
	state = {}
	bind(fn) {
		this.fn = fn
	}
	show(text, time = 2000) {
		// debugger
		this.st && clearTimeout(this.st)
		this.state = {
			show: true,
			text: text
		}
		this.fn()
		this.st = setTimeout(() => {
			this.hide()
		}, time)
	}
	hide() {
		this.st && clearTimeout(this.st)
		this.state = {
			show: false,
			text: ''
		}
		this.fn()
	}
}
const toast = new Toast()
class ToastDom extends Component {
	state = {
		text: '',
		show: this.props.show||false
	};

	componentDidMount() {
		toast.bind(() => {
			this.setState(toast.state);
		});
	}

	render() {
		return (
			<div className = {cn("toast", { hide: !this.state.show })}>
				<div className="toast-content-container">{this.state.text||this.loading()}</div>
			</div>
		)
	}

	loading = ()=>(
		<div className="sk-fading-circle">
			<div className="sk-circle1 sk-circle"></div>
			<div className="sk-circle2 sk-circle"></div>
			<div className="sk-circle3 sk-circle"></div>
			<div className="sk-circle4 sk-circle"></div>
			<div className="sk-circle5 sk-circle"></div>
			<div className="sk-circle6 sk-circle"></div>
			<div className="sk-circle7 sk-circle"></div>
			<div className="sk-circle8 sk-circle"></div>
			<div className="sk-circle9 sk-circle"></div>
			<div className="sk-circle10 sk-circle"></div>
			<div className="sk-circle11 sk-circle"></div>
			<div className="sk-circle12 sk-circle"></div>
		</div>
	)
}
let $toast = document.getElementById('toastroot');
if (!$toast) {
	$toast = document.createElement('div');
	$toast.setAttribute('id', 'toastroot');
	document.body.appendChild($toast)
}

ReactDOM.render(
	<ToastDom/>,
	$toast
);
export default toast
export { ToastDom }