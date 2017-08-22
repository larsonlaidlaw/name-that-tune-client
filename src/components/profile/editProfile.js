import React from 'react'
import { Input, Icon, Form, Segment, Button, Header } from 'semantic-ui-react'

const EditProfile = (props) => {

  console.log(props)
  return(
  <div>
    <Header textAlign='center'>
      Edit Profile
    </Header>
    <Form size='medium' onSubmit={this.handleSignup}>
      <Segment>
        <Form.Input
          fluid
          icon='at'
          iconPosition='left'
          placeholder='E-mail address'
          name="email"
          onChange={this.handleInputChange}
          value={props.videoLists.email}
        />
        <Form.Input
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Username'
          name='username'
          onChange={this.handleInputChange}
          value={props.videoLists.username}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          name='password'
          onChange={this.handleInputChange}
        />

        <Button fluid type="submit">Update</Button>
      </Segment>
    </Form>
  </div>
)
}

export default EditProfile
