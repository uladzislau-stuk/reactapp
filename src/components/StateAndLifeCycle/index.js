import React, { Component } from 'react';

class StateAndLifecycle extends Component {
	constructor(props) {
		super(props);

		this.state = {date: new Date()};
	}

	componentDidMount() {
		this.timerID = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick = () => this.setState({date: new Date()});

	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It's {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

export default StateAndLifecycle;