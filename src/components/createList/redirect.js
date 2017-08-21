import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const RedirectComponent = (props) => {
  let path = `/play/${props.listCount}`
  return(
    <Route render={()=> <Redirect to={path} />} />
  )
}

export default RedirectComponent

{/* <Route path='/signup' render={()=> this.state.auth.isLoggedIn ?
  <Redirect to="/newplaylist"/> :
  <Signup handleSignup={this.handleSignup}/> } /> */}


//   <Route render={({ history}) => (
//   <button
//     type='button'
//     onClick={() => { history.push('/new-location') }}
//   >
//     Click Me!
//   </button>
// )} />
