import React, { Component } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserList from './userLists'
import { Route } from 'react-router-dom'
import EditProfile from './editProfile'

class Profile extends Component {

  state = {
    videoLists:[]
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem('id')}`)
    .then(response=>response.json())
    .then(data=>this.setState({
      videoLists: data
    }))
  }

  render(){
    return(
      <Grid centered columns={2}>
        <Grid.Column style={{ maxWidth: 300 }}>
            <Segment.Group id="profile-menu">
              <Segment textAlign='left'>
                <p><strong><Link to='/profile/lists'>Created Playlists</Link></strong></p>
                <p>Check out the lists you've made.</p>
              </Segment>
              <Segment textAlign='left'>
                <p><strong><Link to='/profile/edit'>Edit Profile</Link></strong></p>
                <p>Edit your username, email, or password.</p>
              </Segment>
            </Segment.Group>
        </Grid.Column>
        <Grid.Column>
          <Segment>
              <Route exact path='/profile/lists' render={()=> <UserList videoLists={this.state.videoLists} />}/>
              <Route exact path='/profile/edit' render={()=> <EditProfile videoLists={this.state.videoLists} />}/>
          </Segment>
        </Grid.Column>

      </Grid>
    )
  }
}

export default Profile
