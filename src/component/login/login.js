import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import sessionService from "../../services/sessionservice";
import "./login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        if (sessionService.isUserLogged()) {
            sessionService.goToUserMainPage(this.props);
        }

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        let that = this;
        event.preventDefault();
        var Airtable = require('airtable');
        var base = new Airtable({ apiKey: 'keyBASfn0tbP5woCx' }).base('appzeUDpZOqRjLPaJ');

        base('Users').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                if((record.get('username') === that.state.username) && (record.get('Password') === btoa(that.state.password))) {
                    sessionService.createSession(
                        JSON.stringify({
                            record
                        })
                    )
                    window.location.reload();
                }
            });
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
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
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <label>Password</label>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                    >
                        Login
                    </Button>
                    <a className="r-menu-item" href="/#/signUp">Sign Up</a>
                </form>
            </div>
        );
    }
}