import React from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';
import Navbar from '../components/Navbar/Navbar';
import fbConnection from '../firebaseRequests/connection';
import './App.css';
fbConnection();
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
