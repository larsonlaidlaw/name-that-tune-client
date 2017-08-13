
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function (ComponentParameter, inheritedProps) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    componentDidMount () {
      if(!localStorage.getItem('jwt')){
        this.context.router.history.push('/')
      }
    }
    componentWillUpdate () {
      if(!localStorage.getItem('jwt')){
        this.context.router.history.push('/')
      }
    }
    render(){
      return <ComponentParameter  {...this.props} />
    }
  }

  return Authentication
}
