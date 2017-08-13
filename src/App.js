import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import CreateListContainer from './containers/createListContainer'
import PlayGameContainer from './containers/playGameContainer'
import NavBar from './components/nav/navBar'
import Auth from './components/auth/authorize'
import AuthAdapter from './components/auth/authAdapter'
import Login from './components/nav/login'



//Styles
import './App.css';

class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }
  onLogin(loginParams){
    AuthAdapter.login(loginParams)
      .then( res => {
        //check for an error message
        if( res.error ){
          console.log("do nothing")
        }else{
          console.log("auth adapter", res)
          localStorage.setItem('jwt', res.jwt)
          this.setState({
            auth:{
              isLoggedIn: true,
              user: res.username
            }
          })
        }
      })
  }
  handleLogout(){
    localStorage.clear()
    this.setState({auth: {
      isLoggedIn:false,
      user: ''
    }})
  }
  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <Route path='/' render={()=> <NavBar onLogout={this.handleLogout.bind(this)} /> } />
            <Route path='/newplaylist' component={Auth(CreateListContainer)}></Route>
            <Route path='/play/:id' component={PlayGameContainer}></Route>
            <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/newplaylist"/> : <Login onSendLogin={this.onLogin.bind(this)}/> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App
