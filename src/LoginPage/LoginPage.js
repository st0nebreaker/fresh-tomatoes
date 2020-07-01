import React, { Component } from "react";
import {Link} from "react-router-dom";

class LoginPage extends Component {
    componentDidMount() {
        fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "charlie@turing.io",
                password: "qwerty"
            }),
        })
            .then(response => response.json())
            .then(json => {
                console.log('Request success: ', json)
            })
            .catch(err => console.log('Request failure: ', err));
    }
    clickHandler() {
        //is email charlie
        //is password qwerty?
        // then make fetch post request
    }
    render() {
        return (
            <form className="login-form"> 
                <h2>Login</h2>
    
                <section class='form-input'>
                    <label for="email"> Email:</label>
                    <input type='email' aria-label="email-input" className='input' placeholder='example@turing.io' name='email' required />
                </section>
    
                <section class='form-input'>
                    <label for="password">Password:</label>
                    <input type='password' aria-label="password-input" class='input' placeholder='password' name='password' required />
                </section>
                <button className="login-btn" aria-label="submit-button" onClick= {this.clickHandler(email, password)}>
                    Submit
                </button>
        
            </form>
        )
    }
}

export default LoginPage;