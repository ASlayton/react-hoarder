import React from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';
import Navbar from '../components/Navbar/Navbar';
import fbConnection from '../firebaseRequests/connection';
import Home from '../components/Home/Home';
import MyStuff from '../components/MyStuff/MyStuff';
import AddItem from '../components/AddItem/AddItem';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import './App.css';
import AllTheThings from '../components/AllTheThings/AllTheThings';
fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Home', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Home', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  state={
    authed: false,
  };

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  };

  componentWillUnmount () {
    this.removeListener();
  };

  runAway = () => {
    this.setState({authed: false});
  };

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className="main-container">
              <Switch>
                <Route path="/" exact component={Home} />
                <PrivateRoute
                  path="/myStuff"
                  authed={this.state.authed}
                  component={MyStuff}
                />
                <PrivateRoute
                  path="/AddItem"
                  authed={this.state.authed}
                  component={AddItem}
                />
                <PrivateRoute
                  path="/AllTheThings"
                  authed={this.state.authed}
                  component={AllTheThings}
                />
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
