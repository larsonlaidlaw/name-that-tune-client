import React, { Component } from 'react';
import NavBar from './components/nav/navBar'

//Styles
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <NavBar onLogout={this.props.onLogout} state={this.props.state} />
      </div>
    );
  }
}

export default App
