import React from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  render(){
    console.log('localStorage',localStorage)
    return(
      <Menu>
        <Menu.Menu>
          <Menu.Item><Icon name="youtube" size="large"/>YouTubeList</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item><Link to='/signup'>Sign Up</Link></Menu.Item>
          {this.props.state.auth.isLoggedIn ?
            <Menu.Item onClick={this.props.onLogout}>Logout</Menu.Item> :
            <Menu.Item><Link to='/login'>Login</Link></Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar
