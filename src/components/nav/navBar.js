import React from 'react'
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {



  render(){
    let loggedIn = localStorage.getItem("jwt")
    return(
      <Menu>
        <Menu.Menu>
          <Link to='/'><Menu.Item><Icon name="youtube" size="large"/>YouTubeList</Menu.Item></Link>

        </Menu.Menu>
        <Menu.Menu position="right">
          {!loggedIn && <Link to='/signup'><Menu.Item>Sign Up</Menu.Item></Link>}
          {!loggedIn && <Link to='/login'><Menu.Item>Login</Menu.Item></Link>}
          {loggedIn && <Link to='/newplaylist'><Menu.Item><Button>Create a new Playlist</Button></Menu.Item></Link>}
          {loggedIn && <Dropdown icon='dropdown' text={localStorage.username} className='link item'>
            <Dropdown.Menu inline>
              <Link to='/profile'><Dropdown.Item>Profile</Dropdown.Item></Link>
              <Link to='/login'><Dropdown.Item onClick={this.props.onLogout}>Logout</Dropdown.Item></Link>
            </Dropdown.Menu>
          </Dropdown>}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar
