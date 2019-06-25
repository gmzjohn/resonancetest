import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

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
            validateUserName: false
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleUsername = (event) => {
        let that = this;

        this.setState({
            username: event.target.value
        })

        var Airtable = require('airtable');
        var base = new Airtable({ apiKey: 'keyBASfn0tbP5woCx' }).base('appzeUDpZOqRjLPaJ');

        base('Users').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                if (record.get('username') === that.state.username) {
                    that.setState({
                        validateUserName: false
                    });
                    return;
                } else {
                    that.setState({
                        validateUserName: true
                    });
                }
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    validateUsername() {
        return this.state.username.length >= 6 || !this.state.validateUserUsername;
    }

    handleSubmit = event => {
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

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <label>Username</label>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleUsername}
                        />
                        <span
                            style={{
                                display: this.validateUsername() ? "block" : "none"
                            }}
                        >
                            Username already exist
                        </span>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <label>Password</label>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="firstName" bsSize="large">
                        <label>First Name</label>
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bsSize="large">
                        <label>Last Name</label>
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <label>Email</label>
                        <FormControl
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                    >
                        Create new User
                    </Button>
                    <a className="r-menu-item" href="/#/login">Back</a>
                </form>
            </div>
        );
    }
}