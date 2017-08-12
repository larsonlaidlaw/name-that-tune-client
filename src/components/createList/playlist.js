import React, {Component} from 'react'
import { List, Button } from 'semantic-ui-react'

class Playlist extends Component {
  savePlaylist = () => {
   let savedPlaylist = []
   this.props.videoList.map((video)=>{
     savedPlaylist.push({
       video_id: video.id.videoId,
       video_title: video.snippet.title,
       video_channel: video.snippet.channelTitle
     })
   })
   console.log(savedPlaylist)
   this.postPlaylist(savedPlaylist)
 }

   postPlaylist = (array) => {
     fetch("http://localhost:3000/api/v1/videos",
       {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({'videos': array})
       })
   }
  render(){
    let videos = this.props.videoList.map((video)=>{
      return <List.Item>{video.snippet.title}</List.Item>
    })
    return(
      <div>
        {this.props.videoList.length > 0 ? <h1>Song List</h1> : ""}
        <List>
          {videos}
        </List>
        {this.props.videoList.length > 9 ? <Button onClick={this.savePlaylist}>Save Playlist</Button> : ""}
      </div>
    )
  }
}

export default Playlist
