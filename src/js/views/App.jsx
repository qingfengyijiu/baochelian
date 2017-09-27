import React from "react";
import Footer from './Footer.jsx';

export default class App extends React.Component{

    handleHomeClick() {
        window.location.href = "/home";
    }

    componentDidMount() {
        let actions = this.props.actions;
    }


    render() {
        return (
            <div className="page">
                {this.props.children}
            </div>
        )
    }
}