import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { Grid, Button, Header, Container  } from 'semantic-ui-react'

//other files
import Search from '../components/createList/search'
import SearchResults from '../components/createList/searchResults'
import Playlist from '../components/createList/playlist'

const googleApiKey = 'AIzaSyAK0A249rjWnFiTZqSCZRwwVc5PvOpE8oE'

const BASE_URL = process.env.REACT_APP_API

class CreateListContainer extends Component {
  state = {
    videoId: '',
    videoTitle: '',
    results: [],
    searchTerm: '',
    videoObject: {},
    videoList: [],
    listCount: null,
    switch: false
  }

  // Search Functions
  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount(){
    fetch(`${BASE_URL}/api/v1/lists/`)
    .then(response=>response.json())
    .then(data=>this.setState({
      listCount: data.length
    }))
  }


  resetComponent = () => {
    this.setState({
      results: [],
      searchTerm: ''
    })
  }

  handleSearchChange = (event) => {
    this.setState({searchTerm: event.target.value })
  }

  handleSearchSubmit = (event)=> {
    event.preventDefault()
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${this.state.searchTerm}&type=video&key=${googleApiKey}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        results: data.items,
        switch: true
      })
    })
  }

  //select function
  handleVideoSelection = (obj) => {
    this.setState({
      videoObject: obj,
      videoId: obj.id.videoId,
      videoTitle: obj.snippet.title
    })
    console.log(obj.id.videoId)
  }

  addVideoToPlaylist = (video) => {
    this.setState({
      videoList: this.state.videoList.concat(video)
    })
  }

  changeVideoId = (video) => {
    this.setState({
      videoId: video.id.videoId,
      videoTitle: video.snippet.title
    })
  }

  resetVideoList = () => {
    this.setState({
      videoList: [],
      searchTerm: '',
      results: []
    })
  }

  increaseListCount = () => {
    console.log('are we hitting increaseListCount')
    this.setState({
      listCount: this.state.listCount + 1
    })
  }

  onReady = (event) => {
    console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`)
    this.setState({ player: event.target })
  }

  onPlayVideo = () => {
    this.state.player.playVideo()
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


  onStateChange = (event) => {

    if (event.data === 5 && this.state.i !== 0) {
      this.state.playing && this.onPlayVideo()
    }
  }


  divToRender = () => {
    if (this.state.switch === false){
      return(
        <Container id="dragons">
          <Search
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
            addVideoToPlaylist={this.addVideoToPlaylist}
            searchTerm={this.state.searchTerm}
          />
        </Container>

      )} else {
        return(
          <div>
            <Grid centered>
              <Grid.Row centered>
                <Grid.Column width={8} style={{ minWidth: 680, maxWidth: 680 }}  >
                  <Header>{this.state.videoTitle}</Header>
                    <YouTube
                      videoId={this.state.videoId}
                      onReady={this.onReady}
                      onStateChange={this.onStateChange}
                    />
                      <div className='buttonSearch'>
                        <Button.Group labeled compact>
                          <Button icon='play' content='Play' compact onClick={this.onPlayVideo}/>
                          <Button icon='pause' content='Pause' compact onClick={this.onPauseVideo}/>
                        </Button.Group>
                        <Search
                          handleSearchChange={this.handleSearchChange}
                          handleSearchSubmit={this.handleSearchSubmit}
                          addVideoToPlaylist={this.addVideoToPlaylist}
                          searchTerm={this.state.searchTerm}
                        />
                      </div>
                </Grid.Column>
                <Grid.Column width={5} >
                    <Playlist
                      videoList={this.state.videoList}
                      videoObject={this.state.videoObject}
                      changeVideoId={this.changeVideoId}
                      resetVideoList={this.resetVideoList}
                      increaseListCount={this.increaseListCount}
                      listCount={this.state.listCount}
                      getListLength={this.props.getListLength}
                    />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row centered >
                <Grid.Column width={8} style={{ minWidth: 680, maxWidth:680 }} >
                  <SearchResults
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



  render(){
    return(
      this.divToRender()
    )
  }
}

export default CreateListContainer
