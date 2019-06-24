import React, { Component } from 'react';
import sessionService from "../../services/sessionservice";

import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        if (!sessionService.isUserLogged()) {
            sessionService.goToUserMainPage(this.props);
        }
    }

    render() {
        return (
            <div className="r-home">
                Welcome to Resonance Company Products
            </div>
        );
    }
}

export default Home;