import React, { Component } from "react";

import "./signup.css";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            validateUserName: false,
            errorMessage: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        if (this.state.validateUserName === true) {
            this.setState({
                errorMessage: "Username already exist"
            })
        } else {
            var props = this.props
            event.preventDefault();
            var Airtable = require('airtable');
            var base = new Airtable({ apiKey: 'keyBASfn0tbP5woCx' }).base('appzeUDpZOqRjLPaJ');

            base('Users').create({
                "Password": btoa(this.state.password),
                "First Name": this.state.username,
                "Last Name": this.state.lastName,
                "email": this.state.email,
                "username": this.state.username
            }, function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(record.getId());
                props.history.push('/login');
            });
        }


    }

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>

                <label for="username"><b>Username</b></label>
                <input
                    id="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <label for="password"><b>Password</b></label>
                <input
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <label for="firstName"><b>First Name</b></label>
                <input
                    id="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                <label for="lastName"><b>Last Name</b></label>
                <input
                    id="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <label for="email"><b>Email</b></label>
                <input
                    id="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Register
                </button>
                <a className="r-menu-item" href="/#/login">Back</a>
            </div>
        );
    }
}