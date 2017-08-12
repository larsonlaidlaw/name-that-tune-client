import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { Grid, Container, Divider  } from 'semantic-ui-react'

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


  render(){
    this.state.videoObject.snippet && console.log(this.state.videoObject.snippet.title)
    return(
      <div>
        <Container text>
          <YouTube videoId={this.state.videoId}/>
          <Search
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
            addVideoToPlaylist={this.addVideoToPlaylist}
          />
        </Container>
        <Divider />
        <Grid columns={2} >
          <Grid.Row>
            <Grid.Column textAlign="left">
              <SearchResults
                searchResults={this.state.results}
                handleVideoSelection={this.handleVideoSelection}
              />
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Playlist videoList={this.state.videoList} videoObject={this.state.videoObject}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default CreateListContainer
