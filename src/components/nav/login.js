import React, { Component} from 'react'
import { Button, Form, Header, Grid, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onLogin(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <div className='login-form'>

        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            {
              this.props.error ? <Message negative>
                {this.props.error}
              </Message> : ''

            }

            <Header textAlign='center'>
              Sign in to your account
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
              <Segment>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='username'
                  name='username'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                />

                <Button fluid type='submit'>Login</Button>
              </Segment>
            </Form>
            <Message>
              Need to create an account? <Link to="/signup">Sign up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default LoginForm
