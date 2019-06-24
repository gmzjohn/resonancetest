import React, { Component } from 'react';

import './sidebar.css';
import sessionService from '../../services/sessionservice';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    handleLogOut = () => {
        sessionService.destroySession();
    }
    render() {
        return (
            <div>
                <div className="r-sidenav">
                    <a className="r-menu-item" href="/#/landingPage">Home</a>
                    <a className="r-menu-item" href="/#/products">Products</a>
                    <a href="/" onClick={this.handleLogOut}> 
                    Log Out
                    </a>
                </div>
            </div>
        );
    }
}

export default Sidebar;