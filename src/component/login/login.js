import React, { Component } from "react";
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
                if ((record.get('username') === that.state.username) && (record.get('Password') === btoa(that.state.password))) {
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
            <body>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card card-signin my-5">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <input
                                                id="username"
                                                type="text"
                                                className="form-control"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                required autoFocus
                                            />
                                            <label htmlFor="inputUsername">Username</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                required autoFocus
                                            />
                                            <label htmlFor="inputEmail">Password</label>
                                        </div>
                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                            onClick={this.handleSubmit}
                                        >
                                            Sign in
                                        </button>
                                        <a className="btn btn-lg secondary btn-block text-uppercase" href="/#/signUp">Sign Up</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}