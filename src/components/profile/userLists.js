import React from 'react'
import { List, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {

  render(){
    let images = null
    let titles = null
    if (this.props.videoLists.lists) {
      titles = this.props.videoLists.lists.map((list)=>{
        images = list.videos.map((video)=>(
          <Image avatar src={video.thumbnail_url} />
        ))
        if (images.length > 3){
          images.splice(4, images.length)
        }
        return (
          <List.Item>
            <Link to={"/play/" + list.id}>
              <List.Content floated='right'>
                {images}
              </List.Content>
              <List.Content>
                {list.title}
              </List.Content>
            </Link>
          </List.Item>)
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
