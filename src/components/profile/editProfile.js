import React from 'react'
import { Form, Segment, Button, Header, Popup } from 'semantic-ui-react'

const EditProfile = (props) => {

  console.log(props)
  return(
  <div>
    <Header textAlign='center'>
      Edit Profile
    </Header>

    <Popup trigger={
      <Form size='medium' onSubmit={this.handleSignup}>
        <Segment>
          <Form.Input

            icon='at'
            iconPosition='left'
            placeholder='E-mail address'
            name="email"
            onChange={this.handleInputChange}
            value={props.videoLists.email}
            disabled
          />
          <Form.Input

            icon='user'
            iconPosition='left'
            placeholder='Username'
            name='username'
            onChange={this.handleInputChange}
            value={props.videoLists.username}
            disabled
          />
          <Form.Input

            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
            onChange={this.handleInputChange}
            disabled
          />

          <Button disabled type="submit">Update</Button>
        </Segment>
      </Form>
    }>
      Stop acting like this is Facebook or Google and leave it alone.
    </Popup>

  </div>
)
}

export default EditProfile
