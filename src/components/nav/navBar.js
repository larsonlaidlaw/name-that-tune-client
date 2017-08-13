import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render(){
    return(
      <Menu>
        <Menu.Menu>
          <Menu.Item>YouTubeList</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>Sign Up</Menu.Item>
          <Menu.Item><Link to='/login'>Login</Link></Menu.Item>
          <Menu.Item onClick={this.props.onLogout}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar
