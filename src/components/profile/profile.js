import React, { Component } from 'react'
import { Segment, Grid, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Profile = () => (
  <Grid
    textAlign='center'
    style={{ height: '100%' }}
    verticalAlign='middle'
  >

    <Grid.Column style={{ maxWidth: 800 }} textAlign='center'>
      <Image src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' size='small' shape='circular' centered/>
      <Segment.Group >
        <Segment textAlign='left'>
          <p><strong>Created Playlists</strong></p>
          <p>Check out the lists you've already made.</p>
        </Segment>
        <Segment textAlign='left'>
          <p><strong>Find a list to play</strong></p>
          <p>Want to prove how cool are you are? Find someone else's list to play.</p>
        </Segment>
        <Segment textAlign='left'>
          <p><strong>Watch Videos</strong></p>
          <p>Sometimes you want to just chill a bit and watch some videos. I'm not sure why you'd do it here
            instead of on YouTube, but if you want, go ahead.</p>
        </Segment>
        <Segment textAlign='left'>
          <p><strong>Edit Profile</strong></p>
          <p>Edit your username, email, or password.</p>
        </Segment>
      </Segment.Group>
      <Button className='button' ><Link to='/newplaylist'>Create a New List</Link></Button>
    </Grid.Column>
  </Grid>
)

export default Profile
