import React from 'react'
import {List, Modal, Button, Input} from 'semantic-ui-react'


class Tracklist extends React.Component{

  render(){
      let videos = this.props.videoList.map((video, index)=>{
        return <List.Item onClick={()=> this.props.changeI(index)}>{video}</List.Item>
      })

    return(
      <div>
        {this.props.videoList.length > 0 ? <h3>Song List</h3> : ""}
        <List celled ordered>
          {videos}
        </List>
        {this.props.videoObjects.length > 0
          ? <Button onClick={this.props.savePlaylist}>Update Playlist</Button>
          : ''
        }

      </div>
    )
  }
}


export default Tracklist
