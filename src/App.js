import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CreateListContainer from './containers/createListContainer'
import PlayGameContainer from './containers/playGameContainer'



//Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/newplaylist' component={CreateListContainer}></Route>
            <Route path='/play/:id' component={PlayGameContainer}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
