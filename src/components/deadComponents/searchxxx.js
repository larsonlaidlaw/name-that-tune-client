import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

let googleApiKey = 'AIzaSyAK0A249rjWnFiTZqSCZRwwVc5PvOpE8oE'

class YTSearch extends Component {

  state = {
    isLoading: false,
    results: [],
    searchTerm: ''
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], searchTerm: '' })

  handleResultSelect = (e, {result} ) => {
    this.props.handleVideoClick(result)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, searchTerm: value })
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=${googleApiKey}`)
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        results: jsonObject.items,
        isLoading: false
      })
    })
  }

  resultRenderer = (result) => {
    // debugger
    return (
      <div>
        <div className='image'>
          <img src={result.snippet.thumbnails.default.url} />
        </div>
        <div className='content'>
          <div className='title'>
            {result.snippet.title}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const isLoading = this.state.isLoading
    const searchTerm = this.state.searchTerm
    const results = this.state.results

    return (
      <Search
        input={{fluid: true}}
        fluid='true'
        resultRenderer={this.resultRenderer}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={searchTerm}
        {...this.props}
      />
    )
  }
}


export default YTSearch
