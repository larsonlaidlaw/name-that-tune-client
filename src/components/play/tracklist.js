import React from 'react'
import {List, Button, Icon} from 'semantic-ui-react'


class Tracklist extends React.Component{

  state = {
    editing: false
  }

  editPlaylist = ()=> {
    this.props.fetchData()
    this.setState({
      editing: !this.state.editing
    })
  }

  removeFromList = (id) => {
    fetch(`http://localhost:3000/api/v1/videos/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({'payload': id})
      })
      .then(res=>res.json())
      .then(()=>this.props.fetchData())
  }

  render(){
      let otherVideos = this.props.data && this.props.data.videos.map((video, index)=>{
        return (
          <List.Item onClick={()=> this.props.changeI(index)}>
            <List.Content floated='right' >
              <Icon name="delete" color='red' className="delete-icon" onClick={()=>this.removeFromList(video.id)}/>
            </List.Content>
            <List.Content>
              {video.video_title}
            </List.Content>
          </List.Item>
        )
      })

      let videos = this.props.videoList.map((video, index)=> {
        return(
          <List.Item onClick={()=> this.props.changeI(index)}>
            <List.Content style={{cursor: "pointer"}}>
              {video}
            </List.Content>
          </List.Item>
        )
      })


    return(
      <div>
        {this.props.data && this.props.data.videos.length > 0 ?
          <h3>Video List</h3> : ""
        }
        <List celled ordered>
          {this.state.editing ? otherVideos : videos }
        </List>
        {this.props.videoObjects.length > 0
          ? <Button onClick={this.props.savePlaylist}>Update Playlist</Button>
          : <Button onClick={this.editPlaylist}>{ this.state.editing ? 'Done Editing' : 'Edit Playlist' }</Button>
        }
      </div>
    )
  }
}


export default Tracklist
