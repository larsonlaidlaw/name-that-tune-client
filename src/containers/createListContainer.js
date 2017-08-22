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
    videoId: 'z9DJn5EMtZQ',
    results: [],
    searchTerm: '',
    videoObject: {},
    videoList: [],
    listCount: null
  }

  //Search Functions
  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/lists/')
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

  addVideoToPlaylist = (video) => {
    this.setState({
      videoList: this.state.videoList.concat(video)
    })
  }

  changeVideoId = (videoId) => {
    this.setState({
      videoId: videoId
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


  render(){
    console.log(this.state.results)
    this.state.videoObject.snippet && console.log(this.state.videoObject.snippet.title)
    return(
      <div>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={8} style={{ minWidth: 680 }}  >
                <YouTube videoId={this.state.videoId}/>
                <Search
                  handleSearchChange={this.handleSearchChange}
                  handleSearchSubmit={this.handleSearchSubmit}
                  addVideoToPlaylist={this.addVideoToPlaylist}
                  searchTerm={this.state.searchTerm}
                />
            </Grid.Column>
            <Grid.Column width={3} >
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

          <Grid.Row centered columns={1}>
            <Grid.Column width={11} >
              <SearchResults
                searchResults={this.state.results}
                handleVideoSelection={this.handleVideoSelection}
                addVideoToPlaylist={this.addVideoToPlaylist}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default CreateListContainer
