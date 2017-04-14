//import dependencies
import React, {Component} from 'react';

//create class component
class CreateLink extends Component {
	constructor (props){
		super(props);

		this.state = {error: ''};
	}

	handleSubmit(event){
		event.preventDefault();
		//Meteor Method call
		Meteor.call('links.insert', this.refs.input.value, (error) => {
			error ? this.setState({error: 'Enter a valid URL please!'}) : this.setState({error: ''}), this.refs.input.value='';
		});
	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className='form-group'>
						<label htmlFor="">Enter the link you want to shorten</label>
						<input ref='input' className='form-control' />
					</div>
					<div className="text-danger">{this.state.error}</div>
					<button className="btn btn-primary">Shorten</button>
				</form>
			</div>
		);
	}
};

//export
export default CreateLink;