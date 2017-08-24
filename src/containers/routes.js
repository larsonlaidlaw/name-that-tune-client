import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'


import App from '../App'

//Components
import Signup from '../components/nav/signup'
import Login from '../components/nav/login'
import Profile from '../components/profile/profile'
import Auth from '../components/auth/authorize'
import AuthAdapter from '../components/auth/authAdapter'
import BrowseLists from '../components/profile/browseLists'

//Containers
import CreateListContainer from './createListContainer'
import Play from './play'


class Routes extends React.Component {
  state = {
    auth: {
      isLoggedIn: localStorage.getItem('id'),
      user: '',
      error: null
    }
  }

  onLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
    .then( res => {
      //check for an error message
      if ( res.error ) {
        console.log(res.error)
        this.setState({
          error: res.error
        })
      } else {
        console.log("auth adapter", res)
        localStorage.setItem('jwt', res.jwt)
        localStorage.setItem('id', res.id)
        localStorage.setItem('username', res.username)
        this.setState({
          auth:{
            isLoggedIn: localStorage.getItem('id'),
            user: res.username,
            error: null
          }
        })
      }
    })
  }

  handleSignup = (event, state) => {
    event.preventDefault()
    AuthAdapter.signUp(state)
    .then(res => {
      localStorage.setItem('jwt', res.jwt)
      localStorage.setItem('id', res.id)
      localStorage.setItem('username', res.username)
      this.setState({auth:{
        isLoggedIn: localStorage.getItem('id'),
        user: res.username
      }})
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: '',
      }
    })
  }

  getListLength = (num)=> {
  return num
  }

  render(){
    return (
      <Router>
        <div>
          <Route path="/" render={()=>
            <App onLogout={this.handleLogout} state={this.state}/>}
          >
          </Route>

          <div id="mainContainer">
            <Route exact path='/' render={()=> this.state.auth.isLoggedIn ?
              <Redirect to="/newplaylist"/> :
              <Signup handleSignup={this.handleSignup}/> } />

            <Route path='/signup' render={()=> this.state.auth.isLoggedIn ?
              <Redirect to="/newplaylist"/> :
              <Signup handleSignup={this.handleSignup}/> } />

            <Route path='/newplaylist' render={()=> Auth(CreateListContainer)}></Route>

            <Route path='/play/:id' render={(props)=> <Play {...props}/>}></Route>

            <Route path='/login' render={()=> this.state.auth.isLoggedIn ?
              <Redirect to="/newplaylist"/> :
              <Login onLogin={this.onLogin} error={this.state.error}/> }
            />

            <Route path='/profile' component={Profile}/>

            <Route path='/lists' component={BrowseLists}/>
          </div>
        </div>
      </Router>
    )
  }
}


export default Routes
