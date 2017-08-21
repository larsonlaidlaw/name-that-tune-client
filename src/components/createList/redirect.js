import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const RedirectComponent = (props) => {
  let path = `/play/${props.listCount}`
  return(
    <Route render={()=> <Redirect to={path} />} />
  )
}

export default RedirectComponent
