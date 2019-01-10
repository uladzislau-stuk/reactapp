import React, { Component } from 'react';

const formFields = [
	{label: 'First Name', type: 'text', name: 'firstName'},
	{label: 'Last Name', type: 'text', name: 'lastName'},
	{label: 'Password', type: 'password', name: 'password'}
];

class TwoWayBinding extends Component{
	constructor() {
		super();

		this.state = {
			firstName: { value: '' },
			lastName: { value: '' },
			password: { value: '' }
		};
	}

	handleInputChange = (e) => {
		let newState = {...this.state};
		newState[e.target.name].value = e.target.value;
		this.setState(newState);
	};

	render() {
		return (
			<form className='form'>

				{formFields.map((field, key) => {
					return (
						<div className='form__field-group' key={key}>
							<label>{field.label}, value {this.state[field.name].value}</label>
							<input type={field.label} onChange={this.handleInputChange}
								   value={this.state[field.name].value} name={field.name}/>
							</div>
						);
				})}

				<input type='submit' value='Send' />

			</form>
		);
	}
}

export default TwoWayBinding;
