import React, { Component } from 'react'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

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
    this.props.onSendLogin(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Username" name='username' placeholder='Username' onChange={this.handleChange} />
        <Form.Input label="Password" type='password' name='password' placeholder='Password' onChange={this.handleChange} />

        
        <Button type='submit'>Log In</Button>
      </Form>
    )
  }
}

export default LoginForm
