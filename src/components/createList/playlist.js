import React, {Component} from 'react'
import { List } from 'semantic-ui-react'
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
       video_channel: video.snippet.channelTitle,
       thumbnail_url: video.snippet.thumbnails.default.url
     })
     return null
   })
   let list = { title : this.state.listTitle, videos : savedPlaylist, user_id: localStorage.getItem('id')}
   this.postPlaylist(list)
   this.props.resetVideoList()

 }

 setRedirect = () => {
   console.log('are we hitting redirect')
   this.setState({
     redirect: true
   })
   console.log('redirect 2', this.state)
 }

   postPlaylist = (array) => {
     console.log('coming from the post', array)
     fetch(`${BASE_URL}/api/v1/videos`,
       {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({'payload': array})
       })
       .then(() => this.props.increaseListCount())
       .then(() => this.setRedirect())
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
      return(
        <List.Item
          onClick={()=>this.props.changeVideoId(video)}
          style={{cursor: "pointer"}}
        >
          {video.snippet.title}
        </List.Item>)
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
    console.log('redirect',this.state.redirect)
    let returnThis = this.returnValue()

    return(
      <div>
        {returnThis}
      </div>
    )
  }
}

export default Playlist
