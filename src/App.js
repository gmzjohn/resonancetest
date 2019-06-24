import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './component/home/home';
import Sidebar from './component/sidebar/sidebar';
import Product from './component/product/product';
import Login from './component/login/login';
import sessionService from "./services/sessionservice";

import './App.css';
import SignUp from './component/signup/signup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: sessionService.isUserLogged()
    };

    this.sessionService = sessionService;
  }

  render() {

    var sidebar = (
      <Sidebar
        setShowSideBar={this.setShowSideBar}
        {...this.props}
      />
    );

    if (!this.state.showSideBar) {
      sidebar = undefined;
    }

    return (
      <HashRouter>
        <div className="App">
          {sidebar}
          <div className="r-content">
            <Switch>
              <Route
                exact={true}
                path="/"
                component={props =>
                  <Login
                    {...props}
                  />
                }
              />
              <Route
                exact={true}
                path="/login"
                component={props =>
                  <Login
                    {...props}
                  />
                }
              />
              <Route
                exact={true}
                path="/signUp"
                component={props =>
                  <SignUp
                    {...props}
                  />
                }
              />
              <Route
                exact={true}
                path="/landingPage"
                component={props =>
                  <Home
                    {...props}
                  />}

              />
              <Route
                exact={true}
                path="/products"
                component={props =>
                  <Product
                    {...props}
                  />
                }
              />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
