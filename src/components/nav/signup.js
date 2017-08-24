import React from 'react'
import { Button, Form, Header, Grid, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Signup extends React.Component{

  state = {
    username:'',
    email: '',
    password:'',
    checked: false
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  checkHandler = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    return (


  <div className='login-form'>


    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign='center'>
          Create an account
        </Header>
        <Form size='large' onSubmit={(event)=> this.props.handleSignup(event, this.state)}>
          <Segment>
            <Form.Input
              fluid
              icon='at'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
              onChange={this.handleInputChange}
              type="email"
            />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              name='username'
              onChange={this.handleInputChange}
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
            <Form.Checkbox
              label='I agree to the Terms and Conditions'
              onClick={this.checkHandler}
             />

              {this.state.email.includes('@') &&
              this.state.username !== '' &&
              this.state.checked &&
              this.state.password !== '' ?
              <Button fluid type="submit">Sign up</Button> :
              <Button fluid type="submit" disabled>Sign up</Button>
            }
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)
}
}



export default Signup
