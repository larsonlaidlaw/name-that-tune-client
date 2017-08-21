import React, {Component} from 'react'
import { List, Button, Modal, Image, Header, Input } from 'semantic-ui-react'
import {Route} from 'react-router-dom'
import MainRender from './mainRender'
import RedirectComponent from './redirect'


class Playlist extends Component {
  state = {
    listTitle: '',
    redirect: false
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
   this.props.increaseListCount()
   this.setRedirect()
 }

 setRedirect = () => {
   this.setState({
     redirect: true
   })
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

  returnValue = () => {
    let videos = this.props.videoList.map((video)=>{
      return <List.Item onClick={()=>this.props.changeVideoId(video.id.videoId)}>{video.snippet.title}</List.Item>
    })

   if (this.state.redirect === false) {
     return(
       <MainRender
         videoList={this.props.videoList}
         videos={videos}
         listTitleHandler={this.listTitleHandler}
         savePlaylist={this.savePlaylist}
       />
     )
   } else {
     return(
       <RedirectComponent
       listCount={this.props.listCount} />
     )
   }
 }

  render(){
    let returnThis = this.returnValue()

    return(
      <div>
        {returnThis}
      </div>
    )
  }
}

export default Playlist
