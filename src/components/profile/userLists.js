import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
  state={
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
    let titles = null
    if (this.state.videoLists.lists) {
      titles = this.state.videoLists.lists.map((list)=>{
        return <List.Item><Link to={"/play/" + list.id}>{list.title}</Link></List.Item>
      })
    } else {
      titles = <List.Item>Nope</List.Item>
    }

    return(
      <List>{titles}</List>
    )
  }
}

export default UserList
