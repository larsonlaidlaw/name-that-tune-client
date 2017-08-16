import React, {Component} from 'react'
import { List, Button, Modal, Image, Header, Input } from 'semantic-ui-react'

class Playlist extends Component {
  state = {
    listTitle: ''
  }

  savePlaylist = () => {
   let savedPlaylist = []
   this.props.videoList.map((video)=>{
     savedPlaylist.push({
       video_id: video.id.videoId,
       video_title: video.snippet.title,
       video_channel: video.snippet.channelTitle
     })
   })
   let list = { title : this.state.listTitle, videos : savedPlaylist, user_id: localStorage.getItem('id')}
   this.postPlaylist(list)
   this.props.resetVideoList()
 }

   postPlaylist = (array, title) => {
     fetch("http://localhost:3000/api/v1/videos",
       {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({'payload': array})
       })
   }

   doSomething = () => {
     console.log('do something')
   }

   listTitleHandler = (event) => {
     this.setState({
      listTitle: event.target.value
     })
   }

  render(){
    let videos = this.props.videoList.map((video)=>{
      return <List.Item onClick={()=>this.props.changeVideoId(video.id.videoId)}>{video.snippet.title}</List.Item>
    })
    return(
      <div>
        {this.props.videoList.length > 0 ? <h3>Song List</h3> : ""}
        <List celled ordered>
          {videos}
        </List>
        {this.props.videoList.length > 1 ?
          <Modal
            trigger={<Button>Save Playlist</Button>}
            // header='Name your playlist'
            content={<Input label="Name your playlist:" type="text" transparent={true} fluid={true} onChange={this.listTitleHandler}/>}
            actions={[
              { key: 'Cancel', content: 'Cancel', color: 'red', triggerClose: true },
              { key: 'Save', content: 'Save', triggerClose: true, onClick: this.savePlaylist },
            ]}
          /> :
        ""}
      </div>
    )
  }
}

export default Playlist
