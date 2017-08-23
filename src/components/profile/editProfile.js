import React from 'react'
import { Form, Segment, Button, Header } from 'semantic-ui-react'

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

          icon='at'
          iconPosition='left'
          placeholder='E-mail address'
          name="email"
          onChange={this.handleInputChange}
          value={props.videoLists.email}
        />
        <Form.Input

          icon='user'
          iconPosition='left'
          placeholder='Username'
          name='username'
          onChange={this.handleInputChange}
          value={props.videoLists.username}
        />
        <Form.Input

          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          name='password'
          onChange={this.handleInputChange}
        />

        <Button  type="submit">Update</Button>
      </Segment>
    </Form>
  </div>
)
}

export default EditProfile
