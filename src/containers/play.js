import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { Icon, Container, Grid, List, Rail, Header, Image, Button } from 'semantic-ui-react'
import Tracklist from '../components/play/tracklist'
import Search from '../components/createList/search'
import SearchResultsPlay from '../components/play/searchResultsPlay'

const googleApiKey = 'AIzaSyAK0A249rjWnFiTZqSCZRwwVc5PvOpE8oE'


class Player extends Component {
  state = {
    videoIds: [],
    videoChannels: [],
    videoTitles: [],
    player: null,
    i: 0,
    playing: false,
    results: [],
    searchId: 'igotthis',
    searchVideoTitle: 'test',
    videoObjects: [],
    listTitle: 'Test'
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    if (!isNaN(this.props.match.params.id) ){
    fetch(`http://localhost:3000/api/v1/lists/${this.props.match.params.id}`)
      .then(response=>response.json())
      .then(data => {

        if (data.status === 404 || data.videos.length < 1 ){
          return this.fetchData()
        }

        

        let videoIds = []
        let videoChannels = []
        let videoTitles = []

        data.videos.map(video => {
          videoIds.push(video.video_id)
          videoTitles.push(video.video_title)
          videoChannels.push(video.video_channel)
        })
        this.setState({ videoIds, videoChannels, videoTitles })
      })

    }
  }

  onReady = (event) => {
    console.log(`YouTube Player object for videoId: "${this.state.videoTitles[this.state.i]}" has been saved to state.`)
    this.setState({ player: event.target })
  }

  onPlayVideo = () => {
    this.state.player.playVideo()
    console.log('trying to play', this.state.videoTitles[this.state.i])
    this.setState({
      playing: true
    })
  }

  onPauseVideo = () => {
    this.state.player.pauseVideo()
    this.setState({
      playing: false
    })
  }

  onNextVideo = () => {
    this.setState({
      i: this.state.i + 1
    })
  }


  onStateChange = (event) => {
    console.log('calling from onstate change', event)
    if (event.data === 5 && this.state.i !== 0) {
      this.state.playing && this.onPlayVideo()
    }
  }

  onEnd = () => {
    this.onNextVideo()
  }

  changeVideoId = (videoId) => {
    this.setState({
      videoId: videoId
    })
  }

  changeI = (index) => {
    this.setState({
      i: index
    })
  }

  handleSearchChange = (event) => {
    this.setState({searchTerm: event.target.value })
  }

  handleSearchSubmit = (event)=> {
    event.preventDefault()
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${this.state.searchTerm}&type=video&key=${googleApiKey}`)
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        results: jsonObject.items,
      })
    })
  }

  handleVideoSelection = (obj) => {
    this.setState({
      i: null,
      searchId: obj.id.videoId,
      searchVideoTitle: obj.snippet.title
    })
    console.log(obj.id.videoId)
  }

  addVideoToPlaylist = (obj) => {
    this.setState({
      videoIds: this.state.videoIds.concat(obj.id.videoId),
      videoChannels: this.state.videoChannels.concat(obj.snippet.channelTitle),
      videoTitles: this.state.videoTitles.concat(obj.snippet.title),
      videoObjects: this.state.videoObjects.concat(obj)
    })
  }

  savePlaylist = () => {
   let savedPlaylist = []
   this.state.videoObjects.map((video)=>{
     savedPlaylist.push({
       video_id: video.id.videoId,
       video_title: video.snippet.title,
       video_channel: video.snippet.channelTitle,
     })
   })
   let list = { title: this.state.listTitle, list_id: this.props.match.params.id, videos : savedPlaylist, user_id: localStorage.getItem('id')}
   this.postPlaylist(list)
   this.setState({
     videoObjects: []
   })
 }

   postPlaylist = (array) => {
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

  render(){

    return(
      <div>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={8} style={{ minWidth: 680, maxWidth:680 }}>
               <Header>{this.state.videoTitles[this.state.i] || this.state.searchVideoTitle}</Header>
                <YouTube
                  videoId={this.state.videoIds[this.state.i] || this.state.searchId}
                  onReady={this.onReady}
                  onStateChange={this.onStateChange}
                  onEnd={this.onEnd}
                />
                <Button.Group labeled compact>
                  <Button icon='play' content='Play' compact onClick={this.onPlayVideo}/>
                  <Button icon='pause' content='Pause' compact onClick={this.onPauseVideo}/>
                  <Button icon='step forward' content='Next' compact onClick={this.onNextVideo}/>
                </Button.Group>
                <Search
                  handleSearchChange={this.handleSearchChange}
                  handleSearchSubmit={this.handleSearchSubmit}
                  addVideoToPlaylist={this.addVideoToPlaylist}
                  searchTerm={this.state.searchTerm}
                />
            </Grid.Column>
            <Grid.Column width={5} >
                <Tracklist
                  videoList={this.state.videoTitles}
                  changeI={this.changeI}
                  videoObjects={this.state.videoObjects}
                  savePlaylist={this.savePlaylist}
                />

            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={8} style={{ minWidth: 680, maxWidth:680 }}>
              <SearchResultsPlay
                searchResults={this.state.results}
                handleVideoSelection={this.handleVideoSelection}
                addVideoToPlaylist={this.addVideoToPlaylist}

               />
            </Grid.Column>
            <Grid.Column width={5} >

            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    )
  }
}

export default Player
