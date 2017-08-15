import React from 'react'
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {



  render(){
    let loggedIn = localStorage.getItem("jwt")
    return(
      <Menu>
        <Menu.Menu>
          <Menu.Item><Icon name="youtube" size="large"/><Link to='/'>YouTubeList</Link></Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          {!loggedIn && <Menu.Item><Link to='/signup'>Sign Up</Link></Menu.Item>}
          {!loggedIn && <Menu.Item><Link to='/login'>Login</Link></Menu.Item>}
          {loggedIn && <Dropdown icon='dropdown' text='Account' className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to='/profile'>Profile</Link></Dropdown.Item>
              <Dropdown.Item onClick={this.props.onLogout}><Link to='/login'>Logout</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar
