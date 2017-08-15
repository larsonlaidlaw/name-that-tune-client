import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { Grid, Container, Divider, Image, Segment  } from 'semantic-ui-react'

//other files
import Search from '../components/createList/search'
import SearchResults from '../components/createList/searchResults'
import Playlist from '../components/createList/playlist'

const googleApiKey = 'AIzaSyAK0A249rjWnFiTZqSCZRwwVc5PvOpE8oE'

class CreateListContainer extends Component {
  state = {
    videoId: 'tvTRZJ-4EyI',
    results: [],
    searchTerm: '',
    videoObject: {},
    videoList: []
  }

  //Search Functions
  componentWillMount() {
    this.resetComponent()
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
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        results: jsonObject.items,
      })
    })
  }

  //select function
  handleVideoSelection = (obj) => {
    this.setState({
      videoObject: obj,
      videoId: obj.id.videoId
    })
    console.log(obj.id.videoId)
  }

  addVideoToPlaylist = () => {
    this.setState({
      videoList: this.state.videoList.concat(this.state.videoObject)
    })
  }

  changeVideoId = (videoId) => {
    this.setState({
      videoId: videoId
    })
  }


  render(){
    this.state.videoObject.snippet && console.log(this.state.videoObject.snippet.title)
    return(
      <div>
        <Container >

        </Container>
        <Divider />

        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={8} style={{ minWidth: 680 }}  >
                <YouTube videoId={this.state.videoId}/>
                <Search
                  handleSearchChange={this.handleSearchChange}
                  handleSearchSubmit={this.handleSearchSubmit}
                  addVideoToPlaylist={this.addVideoToPlaylist}
                />
            </Grid.Column>
            <Grid.Column width={3} >
                <Playlist videoList={this.state.videoList} videoObject={this.state.videoObject} changeVideoId={this.changeVideoId}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={1}>
            <Grid.Column width={11} >
              <SearchResults
                searchResults={this.state.results}
                handleVideoSelection={this.handleVideoSelection}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default CreateListContainer
