import React from 'react'
import { List, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {


  render(){
    let titles = null
    if (this.props.videoLists.lists) {
      titles = this.props.videoLists.lists.map((list)=>{
        return <List.Item><Link to={"/play/" + list.id}>{list.title}</Link></List.Item>
      })
    } else {
      titles = <List.Item>Nope</List.Item>
    }

    return(
      <div>
        <Header>Created Playlists</Header>
        <List selection verticalAlign='middle' textAlign="middle">{titles}</List>
      </div>

    )
  }
}

export default UserList
