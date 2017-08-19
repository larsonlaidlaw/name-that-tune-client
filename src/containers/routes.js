import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'


import App from '../App'

//Components
import Signup from '../components/nav/signup'
import Login from '../components/nav/login'
import Profile from '../components/profile/profile'
import Auth from '../components/auth/authorize'
import AuthAdapter from '../components/auth/authAdapter'
import UserList from '../components/profile/userLists'
import BrowseLists from '../components/profile/browseLists'
import LandingPage from '../components/landingPage'

//Containers
import CreateListContainer from './createListContainer'
import Play from './play'


class Routes extends React.Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }

  onLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
    .then( res => {
      //check for an error message
      if ( res.error ) {
        console.log("do nothing")
      } else {
        console.log("auth adapter", res)
        localStorage.setItem('jwt', res.jwt)
        localStorage.setItem('id', res.id)
        localStorage.setItem('username', res.username)
        this.setState({
          auth:{
            isLoggedIn: true,
            user: res.username
          }
        })
      }
    })
  }

  handleSignup = (event, state) => {
    event.preventDefault()
    AuthAdapter.signUp(state)
    .then(json => {
      window.localStorage.setItem('jwt', json.jwt)
      this.setState({auth:{
        isLoggedIn: true,
        user: json.username
      }})
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: ''
      }
    })
  }

  render(){
    return (
      <Router>
        <div>
          <Route path="/" render={()=> <App onLogout={this.handleLogout} state={this.state}/>}></Route>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path='/signup' render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/newplaylist"/> :
            <Signup handleSignup={this.handleSignup}/> } />
          <Route path='/newplaylist' component={Auth(CreateListContainer)}></Route>
          <Route path='/play/:id' component={Play}></Route>
          <Route path='/login' render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/newplaylist"/> :
            <Login onLogin={this.onLogin}/> }
          />
          <Route path='/profile' component={Profile}/>
          <Route path='/lists' component={BrowseLists}/>
        </div>
      </Router>
    )
  }
}


export default Routes
