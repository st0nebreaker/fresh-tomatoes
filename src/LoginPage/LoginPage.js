import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			id: null,
			userName: null,
			error: null
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	submitLogin = (event) => {
		event.preventDefault();
		fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
			}),
		})
			.then(response => response.json())
			.then((data) => {
				this.setState({id: data.user.id, userName: data.user.name}, () => {
					this.props.changeUserId(this.state);	
				});
				this.props.getUsersRatings(data.user.id);
				this.props.history.push(`/users/${this.state.id}`);
			})
			.catch(error => this.setState({error}));
	}
		
	render() {
		return (
			<form className="login-form"> 
				<h2>Login</h2>

				<section className='form-input'>
						<label htmlFor="email"> Email:</label>
						<input 
							type='email' 
							aria-label="email-input" 
							className='input' 
							placeholder='example@turing.io' 
							name='email' 
							value={this.state.email}
							onChange={event => this.handleChange(event)}
							required
						/>
				</section>

				<section className='form-input'>
						<label htmlFor="password">Password:</label>
						<input 
							type='password' 
							aria-label="password-input" 
							className='input' 
							placeholder='password' 
							name='password' 
							value={this.state.password}
							onChange={event => this.handleChange(event)}
							required 
						/>
				</section>
				<button onClick={(event) => this.submitLogin(event)} className="login-btn" aria-label="submit-button">
						Submit
				</button>
				{this.state.error && <div className="invalid-login">Incorrect username or password, please try again</div>}

			</form>
			)
	}
}

export default withRouter(LoginPage);